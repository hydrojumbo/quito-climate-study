using System;
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
			string srcDir = @"C:\dev\quito\For_Geoportal\For_Geoportal\";
			string rasterout = @"rasterout\";
			string vectorout = @"vectorout\";			
			string tifResultDir = srcDir + rasterout;
			string shpResultDir = srcDir + vectorout;
			
			if (args.Length == 1)
			{
				srcDir = args[0];
			}			

			//if app scales, or additional implementations made (e.g. database table), use DI for this dependency
			IColorRepository colorRepo = new ColorRepository();

			//see: http://sharpmap.codeplex.com/discussions/421752			
			GeoAPI.GeometryServiceProvider.Instance = new NetTopologySuite.NtsGeometryServices();

			List<string> processedRasters = new List<string>();
			List<string> processedVectors = new List<string>();
			Stopwatch sw = new Stopwatch();
			sw.Start();
			processedRasters = ProcessDatasets(args, srcDir, tifResultDir, colorRepo, ".tif", processedRasters);
			processedVectors = ProcessDatasets(args, srcDir, shpResultDir, colorRepo, ".shp", processedVectors);
			sw.Stop();
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
		private static List<string> ProcessDatasets(string[] args, string srcDir, string resultDirectory, IColorRepository colorRepo, string extension, List<string> processedDatasets)
		{			
			if (!extension.Equals(".tif") && !extension.Equals(".shp"))
			{
				throw new NotSupportedException("Only '.tif' and '.shp' files are supported.");
			}
			DirectoryInfo di = new DirectoryInfo(srcDir);
			int filesToProcess = di.GetFiles("*" + extension).Count();
			if (filesToProcess > 0)
			{
				Console.WriteLine(string.Format("Processing {0} files matching '*{0}'", extension));
				DirectoryInfo resultDir = new DirectoryInfo(resultDirectory);
				if (!resultDir.Exists)
				{
					resultDir.Create();
				}
				
				if (extension == ".tif")
				{

					processedDatasets = ProcessRasterFiles(args, colorRepo, extension, di, resultDir, processedDatasets);
				}
				else
				{
					processedDatasets = ProcessVectorFiles(args, colorRepo, extension, di, resultDir, processedDatasets);
				}				
			}	
			
			//recurse through subdirectories
			foreach (DirectoryInfo subDi in di.GetDirectories())
			{
				processedDatasets = ProcessDatasets(args, subDi.FullName, resultDirectory, colorRepo, extension, processedDatasets);
			}
			return processedDatasets;
		}

		/// <summary>
		/// Applies color map to input 1-band 32-bit float raster files and persists results as new .tif files with equivalent spatial metadata as respective source files as 3-band 8-bit int raster files suitable for web tiling.
		/// </summary>
		/// <param name="args"></param>
		/// <param name="colorRepo"></param>
		/// <param name="extension"></param>
		/// <param name="di"></param>
		/// <param name="resultDir"></param>
		private static List<string> ProcessRasterFiles(string[] args, IColorRepository colorRepo, string extension, DirectoryInfo di, DirectoryInfo resultDir, List<string> processedDatasets)
		{			
			OSGeo.GDAL.Driver srcDrv = Gdal.GetDriverByName("GTiff");			
			foreach (FileInfo fi in FilesInDirectoryWithExtension(extension, di))
			{
				if (colorRepo.HasColorMappingOfFile(fi.Name) && !processedDatasets.Contains(fi.Name))
				{
					Console.WriteLine("Processing " + fi.Name + "...");

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
						RGBColors colors = colorRepo.ColorsOfValueInFile(fi.Name, r[cell]);
						red[cell] = (byte)colors.Red;
						green[cell] = (byte)colors.Green;
						blue[cell] = (byte)colors.Blue;
					}

					//write new output 		
					using (Dataset output = srcDrv.Create(resultDir + fi.Name, band.XSize, band.YSize, 3, DataType.GDT_Byte, null))
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
					processedDatasets.Add(fi.Name);
				}				
			}
			return processedDatasets;
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
		private static List<string> ProcessVectorFiles(string[] args, IColorRepository colorRepo, string extension, DirectoryInfo di, DirectoryInfo resultDir, List<string> processedDatasets)
		{
			foreach (FileInfo fi in FilesInDirectoryWithExtension(extension, di))
			{
				if (!processedDatasets.Contains(fi.Name))
				{
					Console.WriteLine("Processing " + fi.Name + "...");
					StringBuilder bldr = new StringBuilder();

					NetTopologySuite.IO.ShapefileDataReader dataReader = new NetTopologySuite.IO.ShapefileDataReader(fi.FullName, new GeometryFactory());
					ArrayList featureCollection = new ArrayList();
					bldr.AppendLine(string.Join(",", dataReader.DbaseHeader.Fields.Select(a => a.Name))); //write csv file header
					while (dataReader.Read())
					{
						NetTopologySuite.Features.Feature feature = new NetTopologySuite.Features.Feature();
						feature.Geometry = dataReader.Geometry;

						int length = dataReader.DbaseHeader.NumFields;
						string[] keys = new string[length];
						for (int i = 0; i < length; i++)
						{
							keys[i] = dataReader.DbaseHeader.Fields[i].Name;
						}

						feature.Attributes = new AttributesTable();
						List<string> csvLine = new List<string>();
						for (int i = 0; i < length; i++)
						{
							object val = dataReader.GetValue(i);
							feature.Attributes.AddAttribute(keys[i], val);
							csvLine.Add(val.ToString());
						}
						bldr.AppendLine(string.Join(",", csvLine));
						featureCollection.Add(feature);
					}
					GeoJsonWriter wtr = new GeoJsonWriter();
					string layerJson = wtr.Write(featureCollection);
					File.WriteAllText(resultDir.FullName + fi.Name.Replace(".shp", ".json"), layerJson);
					File.WriteAllText(resultDir.FullName + fi.Name.Replace(".shp", ".csv"), bldr.ToString());
					processedDatasets.Add(fi.Name);
				}				
			}
			return processedDatasets;
		}

		private static FileInfo[] FilesInDirectoryWithExtension(string extension, DirectoryInfo di)
		{
			return di.GetFiles("*" + extension);
		}
	}
}
