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
		private Dictionary<string, ColorMap[]> jsondata;

		public ColorRepository()
		{
			
			jsondata = JsonConvert.DeserializeObject<RasterColorMap[]>(
				File.ReadAllText(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "\\RasterColorMap.json"))
				.ToDictionary(k => k.fileName, v => v.colorMaps);
		}

		public Boolean HasColorMappingOfFile(string fileName)
		{
			return jsondata.ContainsKey(fileName);
		}

		public RGBColors ColorsOfValueInFile(string fileName, double value)
		{
			if (!jsondata.ContainsKey(fileName))
			{
				throw new NotSupportedException(string.Format("{0} is not included in RasterColorMap.json", fileName));
			}

			//will throw exception if value is bigger than greatest upper boundary
			return new RGBColors(jsondata[fileName].Where(r => value <= r.upperBoundary).OrderBy(a => a.upperBoundary).First().color);
		}
	}
}
