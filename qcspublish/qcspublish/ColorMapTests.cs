namespace qcspublish
{
	using System;
	using System.Collections.Generic;
	using System.IO;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;
	using Newtonsoft.Json;
	using NUnit.Framework;

	/// <summary>
	/// Tests for matching color map to directory.
	/// </summary>
	[TestFixture]
	public class ColorMapTests
	{
		[Test]
		public void OpenColorMapAndParseJson()
		{
			using (FileStream fs = File.OpenRead("ColorMap.json"))
			{
				ColorMap[] jsondata = JsonConvert.DeserializeObject<ColorMap[]>(File.ReadAllText("ColorMap.json"));
				Assert.IsFalse(jsondata.All(a => a.colorMaps.All(aa => aa.categoricalValue != null)), "At least one categorical dataset should be populated");
				Assert.IsFalse(jsondata.All(a => !a.colorMaps.All(aa => aa.upperBoundary == 0.0)), "At least one numerical range should not be populated with anything but default double values.");
			}
		}
	}
}
