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
		}

		public Boolean HasColorMappingOfFile(string fileName)
		{			
			if (jsondata.Any(a => a.fileName.Equals(fileName)))
			{
				return true;
			}
			else
			{
				Console.WriteLine(string.Format("{0} not included in jsondata.", fileName));
				return false;
			}
			
		}

		public RGBColors ColorsOfValueInFile(string fileName, string resultName, double value)
		{
			ValidateFileName(fileName);

			//will throw exception if value is bigger than greatest upper boundary
			return new RGBColors(jsondata.Where(r => r.fileName.Equals(fileName) && r.resultName.Equals(resultName)).First().colorMaps.Where(a => value <= a.upperBoundary).OrderBy(aa => aa.upperBoundary).First().color);			
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


	}
}
