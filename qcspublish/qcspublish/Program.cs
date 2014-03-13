﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OSGeo.GDAL;
using System.Runtime.InteropServices;
using NetTopologySuite.Features;
using NetTopologySuite.IO;
using System.Collections;
using NetTopologySuite.Geometries;
using System.Diagnostics;

namespace qcspublish
{
	class Program
	{
		/// <summary>
		/// Binding to Windows API PInvoke as a means of configuring environment variables needed during runtime.
		/// </summary>
		/// <param name="lpName"></param>
		/// <param name="lpValue"></param>
		/// <returns></returns>
		[DllImport("kernel32.dll", CharSet=CharSet.Auto, SetLastError=true)]
		public static extern bool SetEnvironmentVariable(string lpName, string lpValue);

		public static string appNamespace = "quito-";
		public static string appColorNamspace = "quito-color";
		static void Main(string[] args)
		{
			//verify gdal dlls are available; see: http://trac.osgeo.org/gdal/wiki/GdalOgrCsharpUsage
			string GDAL_HOME = @";c:\Program Files (x86)\FWTools2.4.7\bin";		
			string path = Environment.GetEnvironmentVariable("PATH");
			path += ";" + GDAL_HOME;
			SetEnvironmentVariable("PATH", path);

			//register gdal extensions
			Gdal.AllRegister();

			// string srcDir = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);			
			string srcDir = @"C:\dev\quito\For_Geoportal_WGS\For_Geoportal_WGS\";
			string rasterout = @"rasterout\";
			string vectorout = @"vectorout\";			
			string tifResultDir = srcDir + rasterout;
			string shpResultDir = srcDir + vectorout;			
			
			if (args.Length == 1)
			{
				srcDir = args[0];
			}			
						
			IColorRepository colorRepo = new ColorRepository();

			//see: http://sharpmap.codeplex.com/discussions/421752			
			GeoAPI.GeometryServiceProvider.Instance = new NetTopologySuite.NtsGeometryServices();

			List<string> processedRasters = new List<string>();
			List<string> processedVectors = new List<string>();
			Stopwatch sw = new Stopwatch();
			sw.Start();
			
			//compute - todo: why does running both raster and vector data sometimes result in memory exception?
			Tuple<List<string>, List<string>> rasterResults = ProcessDatasets(args, srcDir, tifResultDir, colorRepo, ".tif", processedRasters);
			processedRasters = rasterResults.Item1;
			Tuple<List<string>, List<string>> vectorResults = ProcessDatasets(args, srcDir, shpResultDir, colorRepo, ".shp", processedVectors);
			processedVectors = vectorResults.Item1;
			
			//reporting
			sw.Stop();
			Console.WriteLine("*********");
			Console.WriteLine("Unknown raster color maps in colormap.json, these files were not processed:");			
			rasterResults.Item2.ForEach(a => Console.WriteLine("=> " + a));
			Console.WriteLine("Unknown vector color maps in colormap.json, these files were not processed:");
			vectorResults.Item2.ForEach(a => Console.WriteLine("=> " + a));
			Console.WriteLine("Finished processing {0} datasets in {1} seconds.", processedRasters.Count() + processedVectors.Count(), sw.Elapsed.TotalSeconds);
			Console.ReadKey();
		}		

		/// <summary>
		/// Applies required transformations to input GIS datasets for web publishing of study sources.
		/// </summary>
		/// <param name="args"></param>
		/// <param name="srcDir"></param>
		/// <param name="resultDir"></param>
		/// <param name="srcDrv"></param>
		/// <param name="colorRepo"></param>
		private static Tuple<List<string>, List<string>> ProcessDatasets(string[] args, string srcDir, string resultDirectory, IColorRepository colorRepo, string extension, List<string> processedDatasets)
		{			
			if (!extension.Equals(".tif") && !extension.Equals(".shp"))
			{
				throw new NotSupportedException("Only '.tif' and '.shp' files are supported.");
			}
			DirectoryInfo di = new DirectoryInfo(srcDir);
			List<string> skipped = new List<string>();
			int filesToProcess = di.GetFiles("*" + extension).Count();
			Tuple<List<string>, List<string>> results;				
			if (filesToProcess > 0)
			{				
				DirectoryInfo resultDir = new DirectoryInfo(resultDirectory);
				if (!resultDir.Exists)
				{
					resultDir.Create();
				}
				
				if (extension == ".tif")
				{
					results = ProcessRasterFiles(args, colorRepo, extension, di, resultDir, processedDatasets);
					processedDatasets = results.Item1;
					skipped.AddRange(results.Item2);
				}
				else
				{
					results = ProcessVectorFiles(args, colorRepo, extension, di, resultDir, processedDatasets);
					processedDatasets = results.Item1;
					skipped.AddRange(results.Item2);
				}				
			}	
			
			//recurse through subdirectories
			foreach (DirectoryInfo subDi in di.GetDirectories())
			{
				results = ProcessDatasets(args, subDi.FullName, resultDirectory, colorRepo, extension, processedDatasets);
				processedDatasets = results.Item1;
				skipped.AddRange(results.Item2);
			}
			return new Tuple<List<string>,List<string>>(processedDatasets, skipped);
		}

		/// <summary>
		/// Applies color map to input 1-band 32-bit float raster files and persists results as new .tif files with equivalent spatial metadata as respective source files as 3-band 8-bit int raster files suitable for web tiling.
		/// </summary>
		/// <param name="args"></param>
		/// <param name="colorRepo"></param>
		/// <param name="extension"></param>
		/// <param name="di"></param>
		/// <param name="resultDir"></param>
		private static Tuple<List<string>, List<string>> ProcessRasterFiles(string[] args, IColorRepository colorRepo, string extension, DirectoryInfo di, DirectoryInfo resultDir, List<string> processedDatasets)
		{			
			OSGeo.GDAL.Driver srcDrv = Gdal.GetDriverByName("GTiff");
			List<string> skipped = new List<string>();
			foreach (FileInfo fi in FilesInDirectoryWithExtension(extension, di))
			{
				if (colorRepo.HasColorMappingOfFile(fi.Name) && !processedDatasets.Contains(fi.Name))
				{
					foreach (string resultName in colorRepo.ResultFileName(fi.Name))
					{
						Console.WriteLine(string.Format("Processing {0} into {1}...", fi.Name, resultName));

						//read data from source raster
						Dataset src = Gdal.Open(fi.FullName, Access.GA_ReadOnly);
						Band band = src.GetRasterBand(1);
						float[] r = new float[band.XSize * band.YSize];
						byte[] red = new byte[band.XSize * band.YSize];
						byte[] green = new byte[band.XSize * band.YSize];
						byte[] blue = new byte[band.XSize * band.YSize];
						band.ReadRaster(0, 0, band.XSize, band.YSize, r, band.XSize, band.YSize, 0, 0);

						//assign values to rgb rasters to produce new raster with rgb bands matching color pattern
						for (int cell = 0; cell < r.Length; cell++)
						{
							RGBColors colors = colorRepo.ColorsOfValueInFile(fi.Name, resultName, r[cell]);
							red[cell] = (byte)colors.Red;
							green[cell] = (byte)colors.Green;
							blue[cell] = (byte)colors.Blue;
						}

						//write new output 		
						using (Dataset output = srcDrv.Create(resultDir + resultName, band.XSize, band.YSize, 3, DataType.GDT_Byte, null))
						{
							if (output == null)
							{
								Console.WriteLine("Can't create " + args[0]);
								System.Environment.Exit(-1);
							}
							//set metadata
							output.SetProjection(src.GetProjection());
							double[] geotransform = new double[0];
							src.GetGeoTransform(geotransform);
							output.SetGeoTransform(geotransform);

							//prepare data for write
							int[] colorData = new int[red.Length * 3];
							red.CopyTo(colorData, 0);
							green.CopyTo(colorData, red.Length);
							blue.CopyTo(colorData, red.Length + green.Length);

							//write data to disk
							output.WriteRaster(0, 0, band.XSize, band.YSize, colorData, band.XSize, band.YSize, 3, null, 0, 0, 0);
							output.FlushCache();
						}
						processedDatasets.Add(resultName);
					}
				}
				else
				{
					skipped.Add(fi.Name);
				}
			}
			return new Tuple<List<string>, List<string>>(processedDatasets, skipped);
		}

		/// <summary>
		/// Changes vector shapefiles into GeoJSON-formatted JSON objects, and csv files of the data in their attribute tables
		/// </summary>
		/// <param name="args"></param>
		/// <param name="colorRepo"></param>
		/// <param name="extension"></param>
		/// <param name="di"></param>
		/// <param name="resultDir"></param>
		/// <remarks>See http://nettopologysuite.googlecode.com/svn/branches/v2.0/NetTopologySuite.Samples.Console/SimpleTests/Attributes/AttributesTest.cs </remarks>
		private static Tuple<List<string>, List<string>> ProcessVectorFiles(string[] args, IColorRepository colorRepo, string extension, DirectoryInfo di, DirectoryInfo resultDir, List<string> processedDatasets)
		{
			List<string> skipped = new List<string>();
			foreach (FileInfo fi in FilesInDirectoryWithExtension(extension, di))
			{
				if (colorRepo.HasColorMappingOfFile(fi.Name) && !processedDatasets.Contains(fi.Name))
				{
					foreach (string resultName in colorRepo.ResultFileName(fi.Name))
					{
						Console.WriteLine(string.Format("Processing {0} into {1}...", fi.Name, resultName));
						StringBuilder bldr = new StringBuilder();

						NetTopologySuite.IO.ShapefileDataReader dataReader = new NetTopologySuite.IO.ShapefileDataReader(fi.FullName, new GeometryFactory());
						NetTopologySuite.Features.FeatureCollection featureCollection = new NetTopologySuite.Features.FeatureCollection();
						List<string> csvHdr = dataReader.DbaseHeader.Fields.Select(a => a.Name).ToList();
						csvHdr.Add(appColorNamspace);
						bldr.AppendLine(string.Join(",", csvHdr)); //write csv file header
						while (dataReader.Read())
						{
							NetTopologySuite.Features.Feature feature = new NetTopologySuite.Features.Feature();
							feature.Geometry = dataReader.Geometry;

							int numFields = dataReader.DbaseHeader.NumFields + 1;
							string[] keys = new string[numFields];
							int colorValueField = -1;
							for (int i = 0; i < numFields - 1; i++)
							{
								keys[i] = dataReader.DbaseHeader.Fields[i].Name;
								if (keys[i].Equals(colorRepo.ColorFieldForOutput(fi.Name, resultName)))
								{
									colorValueField = i;
								}
							}
							keys[numFields - 1] = appColorNamspace;

							//add attributes from source attribute table
							feature.Attributes = new AttributesTable();
							List<string> csvLine = new List<string>();							
							for (int i = 0; i < numFields - 1; i++)
							{
								object val = dataReader.GetValue(i);
								feature.Attributes.AddAttribute(keys[i], val);
								csvLine.Add(val.ToString());
							}

							//add additional attribute for color binding							
							string hexClr = colorRepo.SingleColorForFile(fi.Name, resultName); //only path where colorValueField, i.e. ColorMap.clrField can be unpopulated.

							if (string.IsNullOrEmpty(hexClr) && colorValueField > -1)
							{
								if (colorRepo.IsCategoricalMap(fi.Name, resultName))
								{
									//categorical color map
									hexClr = colorRepo.ColorsOfValueInFile(fi.Name, resultName, dataReader.GetString(colorValueField)).HexColor;
								}
								else
								{
									//numerical range color map
									hexClr = colorRepo.ColorsOfValueInFile(fi.Name, resultName, dataReader.GetDouble(colorValueField)).HexColor;
								}
							}

							if (string.IsNullOrEmpty(hexClr)) // else if (string.IsNullOrEmpty(hexClr) && colorValueField < 0)
							{
								throw new NotSupportedException("Cannot color a file with no attributes to bind to and no single-color given");
							}

							csvLine.Add(hexClr);
							feature.Attributes.AddAttribute(appColorNamspace, hexClr);

							bldr.AppendLine(string.Join(",", csvLine));
							featureCollection.Add(feature);
						}
						GeoJsonWriter wtr = new GeoJsonWriter();						
						string layerJson = wtr.Write(featureCollection);
						
						File.WriteAllText(resultDir.FullName + resultName, layerJson);
						File.WriteAllText(resultDir.FullName + resultName.Replace(".json", ".csv"), bldr.ToString());
						processedDatasets.Add(fi.Name);
					}
				}
				else
				{
					skipped.Add(fi.Name);
				}
			}
			return new Tuple<List<string>, List<string>>(processedDatasets, skipped);
		}

		private static FileInfo[] FilesInDirectoryWithExtension(string extension, DirectoryInfo di)
		{
			return di.GetFiles("*" + extension);
		}
	}
}
