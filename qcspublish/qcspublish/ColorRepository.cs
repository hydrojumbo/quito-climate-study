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

		public ColorRepository()
		{

			jsondata = JsonConvert.DeserializeObject<ColorMap[]>(
				File.ReadAllText(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "\\ColorMap.json")).ToList();
		}

		public Boolean HasColorMappingOfFile(string fileName)
		{
			return jsondata.Any(a => a.fileName.Equals(fileName));
		}

		public RGBColors ColorsOfValueInFile(string fileName, double value)
		{
			ValidateFileName(fileName);

			//will throw exception if value is bigger than greatest upper boundary
			return new RGBColors(jsondata.Where(r => r.fileName.Equals(fileName)).First().colorMaps.Where(a => value <= a.upperBoundary).OrderBy(aa => aa.upperBoundary).First().color);			
		}

		private void ValidateFileName(string fileName)
		{
			if (!jsondata.Any(a => a.fileName.Equals(fileName)))
			{
				throw new NotSupportedException(string.Format("{0} is not included in ColorMap.json", fileName));
			}
		}

		public string ResultFileName(string fileName)
		{
			ValidateFileName(fileName);
			return jsondata.Where(r => r.fileName.Equals(fileName)).First().resultName;
		}


	}
}
