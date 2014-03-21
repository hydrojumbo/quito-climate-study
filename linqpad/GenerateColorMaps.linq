<Query Kind="Program">
  <Reference>&lt;RuntimeDirectory&gt;\System.ComponentModel.Composition.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.ComponentModel.DataAnnotations.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Data.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Data.Services.Client.dll</Reference>
  <Reference>&lt;ProgramFilesX86&gt;\Microsoft ASP.NET\ASP.NET MVC 4\Assemblies\System.Web.Http.dll</Reference>
  <NuGetReference>Newtonsoft.Json</NuGetReference>
  <Namespace>Microsoft.WindowsAzure</Namespace>
  <Namespace>Microsoft.WindowsAzure.Storage</Namespace>
  <Namespace>Microsoft.WindowsAzure.Storage.Auth</Namespace>
  <Namespace>Microsoft.WindowsAzure.Storage.Table</Namespace>
  <Namespace>Newtonsoft.Json</Namespace>
  <Namespace>Newtonsoft.Json.Converters</Namespace>
  <Namespace>System.Data.Services.Client</Namespace>
  <Namespace>System.Threading.Tasks</Namespace>
</Query>

void Main()
{
	ValueColorMap[] hist_tmed_an_lyr = new ValueColorMap[6]{
	  new ValueColorMap() { upperBoundary = 5, color = "#4575B5" },
	  new ValueColorMap() { upperBoundary = 10, color = "#8DA5BA" },
	  new ValueColorMap() { upperBoundary = 15, color = "#FFFF73" },
	  new ValueColorMap() { upperBoundary = 20, color = "#FFAA00" },
	  new ValueColorMap() { upperBoundary = 25, color = "#E64C00" },
	  new ValueColorMap() { upperBoundary = 999999, color = "#A80000" },
	 };
	 
	ValueColorMap[] hist_prec_tot_lyr = new ValueColorMap[7]{
	  new ValueColorMap() { upperBoundary = 500, color = "#FFFF80" },
	  new ValueColorMap() { upperBoundary = 1000, color = "#A1F24B" },
	  new ValueColorMap() { upperBoundary = 1500, color = "#38E009" },
	  new ValueColorMap() { upperBoundary = 2000, color = "#3DB868" },
	  new ValueColorMap() { upperBoundary = 2500, color = "#1A93AB" },
	  new ValueColorMap() { upperBoundary = 3000, color = "#204B91" },
	  new ValueColorMap() { upperBoundary = 9999999, color = "#0C1078" },
	 };
	 
	
	DirectoryInfo dir = new DirectoryInfo(@"C:\dev\quito\For_Geoportal_WGS\For_Geoportal_WGS\New\Precipitacion_2050_monthly");
	
	JsonConvert.SerializeObject(
	dir.GetDirectories().Where(r => !r.Name.Contains("info")).ToList().Select(d => new ColorMap() {
	 fileName = d.Name, resultName = d.Name + ".tif", colorMaps = hist_prec_tot_lyr
	}), Newtonsoft.Json.Formatting.Indented, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore}).Dump();
}

public class ColorMap
	{
		/// <summary>
		/// Name of the shapefile or tif to process.
		/// </summary>
		public string fileName { get; set; }

		/// <summary>
		/// Name of the file to produce for use in web client.
		/// </summary>
		public string resultName { get; set; }

		/// <summary>
		/// If there is a color file to use in the build process, find it here.
		/// </summary>
		public string clrFile { get; set; }

		/// <summary>
		/// Field of shapefile to bind color display to. If none, should assume no emphasis on any field in final display.
		/// </summary>
		public string clrField { get; set; }		

		/// <summary>
		/// If all cells should be the same color for this result, put it here.
		/// </summary>
		public string singleColorValue { get; set; }

		/// <summary>
		/// Rules about how to color various values.
		/// </summary>
		public ValueColorMap[] colorMaps { get; set; }

		public ColorMap()
		{ }
	}
	
/// <summary>
	/// Maps categorical and numerical attribute values to display colors.
	/// </summary>
	public class ValueColorMap
	{
		/// <summary>
		/// If set, maps a color to a categorical variable value.
		/// </summary>
		public string categoricalValue { get; set; }

		/// <summary>
		/// If set, maps a color to the upper boundary of a range of values.
		/// </summary>
		public double upperBoundary { get; set; }

		/// <summary>
		/// Hexidecimal 8-bit RGB value, no alpha channel.
		/// </summary>
		public string color { get; set; }

		public ValueColorMap()
		{ }
	}
