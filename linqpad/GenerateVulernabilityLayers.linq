<Query Kind="Program">
  <Connection>
    <ID>db123753-cc28-436c-85f0-c81594a19c92</ID>
    <Persist>true</Persist>
    <Driver>EntityFramework</Driver>
    <Server>sr2avc5eyc.database.windows.net</Server>
    <CustomAssemblyPath>C:\dev\optirtcazure\OptiRTC.SqlAccess\bin\Debug\OptiRTC.SqlAccess.dll</CustomAssemblyPath>
    <CustomTypeName>OptiRTC.SqlAccess.OptiEntities</CustomTypeName>
    <CustomMetadataPath>res://OptiRTC.SqlAccess/OptiEntities.csdl|res://OptiRTC.SqlAccess/OptiEntities.ssdl|res://OptiRTC.SqlAccess/OptiEntities.msl</CustomMetadataPath>
    <SqlSecurity>true</SqlSecurity>
    <Database>OptiRTC12</Database>
    <UserName>adminbedig</UserName>
    <Password>AQAAANCMnd8BFdERjHoAwE/Cl+sBAAAAJDap5OgZOEis/8wDAsR8kAAAAAACAAAAAAADZgAAwAAAABAAAADbOJ2sW7MaYwqOCvMtNDqnAAAAAASAAACgAAAAEAAAADkBXUp2tE2Mn8VLlyWOnpMQAAAAwSbV06IZuv5WQ46dKjzwrxQAAACIiPNQ9XOTkO05p67VxndWY4RP4g==</Password>
    <DbVersion>Azure</DbVersion>
    <DisplayName>OptiRTC12-production</DisplayName>
  </Connection>
  <Reference Relative="..\..\..\optirtcazure\OptiRTC.Common.Utilities\bin\Debug\OptiRTC.Common.Utilities.dll">C:\dev\optirtcazure\OptiRTC.Common.Utilities\bin\Debug\OptiRTC.Common.Utilities.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTC.Data.Http\bin\OptiRTC.Data.Http.dll">C:\dev\optirtcazure\OptiRTC.Data.Http\bin\OptiRTC.Data.Http.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Models.dll">C:\dev\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Models.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.ProcessingObjects.dll">C:\dev\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.ProcessingObjects.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTC.ProcessInitiation\obj\Debug\OptiRTC.ProcessInitiation.dll">C:\dev\optirtcazure\OptiRTC.ProcessInitiation\obj\Debug\OptiRTC.ProcessInitiation.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Resources.dll">C:\dev\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Resources.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Space.dll">C:\dev\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTC.Space.dll</Reference>
  <Reference Relative="..\..\..\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTCStorage.dll">C:\dev\optirtcazure\OptiRTCStorage\bin\Debug\OptiRTCStorage.dll</Reference>
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
  <Namespace>OptiRTC.Common</Namespace>
  <Namespace>OptiRTC.Common.Events</Namespace>
  <Namespace>OptiRTC.Common.OptiException</Namespace>
  <Namespace>OptiRTC.Common.Utilities.AzureStorageAdapters</Namespace>
  <Namespace>OptiRTC.ProcessInitiation</Namespace>
  <Namespace>OptiRTC.ProcessInitiation.BusinessModels</Namespace>
  <Namespace>OptiRTC.ProcessInitiation.DataManipulation</Namespace>
  <Namespace>OptiRTC.Space</Namespace>
  <Namespace>OptiRTC.SqlAccess</Namespace>
  <Namespace>OptiRTC.Workflows.ProcessInitiation</Namespace>
  <Namespace>OptiRTCStorage.Query</Namespace>
  <Namespace>OptiTime</Namespace>
  <Namespace>System.Data.Services.Client</Namespace>
  <Namespace>System.Globalization</Namespace>
  <Namespace>System.Threading.Tasks</Namespace>
</Query>

void Main()
{
	DirectoryInfo src = new DirectoryInfo(@"C:\dev\quito\For_Geoportal_WGS\For_Geoportal_WGS\rasterout");
	DirectoryInfo dest = new DirectoryInfo(@"C:\dev\quito\quito-climate-study\app\raster");
	List<Layer> layers = new List<Layer>();
	TextInfo tInfo = System.Threading.Thread.CurrentThread.CurrentCulture.TextInfo;
	foreach (FileInfo file in src.GetFiles("*.tif"))
	{
		//if ahs not been transferred to directory, create subdir
		// if(!dest.GetFiles("*.tif").Select(a => a.Name).Contains(file.Name))
		// {
			// dest.CreateSubdirectory(file.Name.Replace(".tif", ""));
			layers.Add(new UserQuery.Layer() {
			 data = file.Name.Replace(".tif", ""), isSelected = false, 
			 name = "Historica (1960-1990) " + tInfo.ToTitleCase(string.Join(" ", file.Name.Replace(".tif", "").Split('_').Take(2))), 
			 opacity = 1, type = "raster"
			});
		// }
	}	
	JsonConvert.SerializeObject(layers.Where(r => r.data.ToUpper().EndsWith("TMIN")).OrderBy(a => Convert.ToInt32(a.data.Split('_')[1])), Newtonsoft.Json.Formatting.Indented, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore}).Dump();
}

// Define other methods and classes here
public class Layer 
{
	public string name;
	public string data;
	public string type;
	public Boolean isSelected;
	public double opacity;
	
	public Layer()
	{}
}