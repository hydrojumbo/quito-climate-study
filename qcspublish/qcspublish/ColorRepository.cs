using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace qcspublish
{
	public class ColorRepository : IColorRepository
	{
		private List<ColorMap> jsondata;
		private List<string> files;

		public ColorRepository()
		{

			jsondata = JsonConvert.DeserializeObject<ColorMap[]>(
				File.ReadAllText(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "\\ColorMap.json")).ToList();
			files = jsondata.Select(a => a.fileName.ToString()).ToList();
			jsondata.Where(r => r.colorMaps.All(a => string.IsNullOrEmpty(a.color) && !string.IsNullOrEmpty(a.rgb))).ToList()
				.ForEach(aa => aa.colorMaps.ToList().ForEach(cm => cm.color = cm.rgb.HexColorOfRgbString()));
		}

		public Boolean HasColorMappingOfFile(string fileName)
		{			
			if (jsondata.Any(a => a.fileName.Equals(fileName)))
			{
				return true;
			}
			else
			{
				// Console.WriteLine(string.Format("{0} not included in jsondata.", fileName));
				return false;
			}
			
		}

		/// <summary>
		/// Returns the field name to use to project a new color property into the output's attributes for binding on UI.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns></returns>
		public string ColorFieldForOutput(string fileName, string resultName)
		{
			return jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First().clrField;
		}

		/// <summary>
		/// Provides numerical range matching. Matches single color value if it exists.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <param name="value"></param>
		/// <returns></returns>
		public RGBColors ColorsOfValueInFile(string fileName, string resultName, double value)
		{
			ValidateFileName(fileName);
			ColorMap map = jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First();
			if (!string.IsNullOrEmpty(map.singleColorValue))
			{
				return new RGBColors(map.singleColorValue, "", true);
			}
			//will throw exception if value is bigger than greatest upper boundary or no colormaps and no singlecolor value exist; call MapColorsToThisResult first
			return new RGBColors(
				map.colorMaps.Where(a => value <= a.upperBoundary).OrderBy(aa => aa.upperBoundary).First().color,
				map.colorMaps.Where(a => value <= a.upperBoundary).OrderBy(aa => aa.upperBoundary).First().rgb, 
				false);			
		}

		public Boolean IsCategoricalMap(string fileName, string resultName)
		{
			return jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First().colorMaps.All(a => a.categoricalValue != null);
		}

		public String SingleColorForFile(string fileName, string resultName)
		{ 
			return jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First().singleColorValue;
		}

		/// <summary>
		/// If false, this shape should be represented by defaults for its geometry type in the UI.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns></returns>
		public Boolean MapColorsToThisResult(string fileName, string resultName)
		{			
			ColorMap map = jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First();
			return map.colorMaps.Count() > 1 || !string.IsNullOrEmpty(map.singleColorValue);
		}

		/// <summary>
		/// Indicates whether this color should be an outline or a filled shape.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns>True if the color should be used as an outline, not a fill.</returns>
		public Boolean IsOutlinedNotFilled(string fileName, string resultName)
		{
			ColorMap map = jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First();
			return !string.IsNullOrEmpty(map.singleColorValue);
		}

		/// <summary>
		/// Provides categorical value matching
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <param name="categoricalValue"></param>
		/// <returns></returns>
		public RGBColors ColorsOfValueInFile(string fileName, string resultName, string categoricalValue)
		{
			ValidateFileName(fileName);

			//will throw exception if value does not exist in the file; user will have to resume processing			
			ColorMap map = jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First();
			if (map.colorMaps.Where(r => categoricalValue.Equals(r.categoricalValue)).Count() > 0)
			{
				return new RGBColors(
					map.colorMaps.Where(a => categoricalValue.Equals(a.categoricalValue)).First().color, 
					map.colorMaps.Where(a => categoricalValue.Equals(a.categoricalValue)).First().rgb, 
					false);
			}
			else if (string.IsNullOrEmpty(categoricalValue) && map.colorMaps.Where(r => r.categoricalValue.Equals("((default))")).Count() > 0)
			{
				return new RGBColors(
					map.colorMaps.Where(a => a.categoricalValue.Equals("((default))")).First().color,
					map.colorMaps.Where(a => a.categoricalValue.Equals("((default))")).First().rgb, 
					false);
			}
			throw new Exception(string.Format("Color for categorical value '{0}' does not exist for fileName: '{1}' => resultName: '{2}' entry in ColorMap.json.", categoricalValue, fileName, resultName));
		}

		private void ValidateFileName(string fileName)
		{
			if (!jsondata.Any(a => a.fileName.Equals(fileName)))
			{
				throw new NotSupportedException(string.Format("{0} is not included in ColorMap.json", fileName));
			}
		}

		public IEnumerable<string> ResultFileName(string fileName)
		{
			ValidateFileName(fileName);
			return jsondata.Where(r => r.fileName.Equals(fileName)).Select(a => a.resultName);
		}

		public IEnumerable<LegendItem> FileLegend(string fileName, string resultName)
		{
			//no spec for this resource; don't build legend
			if (!jsondata.Any(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)))
			{
				return new List<LegendItem>();
			}

			//incompliant spec for this resource; don't build legend
			IEnumerable<ColorMap> colors = jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName));
			if (colors.Count() < 1)
			{								
				return new List<LegendItem>();
			}

			//only 1 filename-resultname pair supported by application
			ColorMap colormap = colors.First();

			//singleColorValue
			if (!string.IsNullOrEmpty(colormap.singleColorValue))
			{
				return new List<LegendItem>() { 
					new LegendItem() {
						IsDiscrete = true, DiscreteCategory = "", HexColor = colormap.singleColorValue
					}
				};
			}

			//raster already 3-band rgb
			if (!string.IsNullOrEmpty(colormap.legendFile))
			{
				return new List<LegendItem>() { 
					new LegendItem() {
						IsDiscrete = false, LegendFile = colormap.legendFile
					}
				};
			}

			List<LegendItem> legend = new List<LegendItem>();
			
			//discrete map
			if (colormap.colorMaps.All(a => !string.IsNullOrEmpty(a.categoricalValue)))
			{				
				foreach (var clr in colormap.colorMaps)
				{
					legend.Add(new LegendItem() { 
						IsDiscrete = true, DiscreteCategory = clr.categoricalValue, HexColor = clr.color 
					});
				}
				return legend;
			}			

			//continuous map			
			double lowerbound = 0;
			foreach (var clr in colormap.colorMaps)
			{
				legend.Add(new LegendItem() { 
					 IsDiscrete = false, LowerBound = lowerbound, UpperBound = clr.upperBoundary, HexColor = clr.color
				});				
				lowerbound = clr.upperBoundary;
			}
			return legend;
		}
	}
}
