namespace azureUploader
{
	using System;
	using System.Collections.Generic;
	using System.Diagnostics;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;

	/// <summary>
	/// Uploads built and tiled static resources to Azure storage directory, publishing the web application.
	/// </summary>
	class Program
	{
		/// <summary>
		/// Validates and uploads a built quito-climate-study application to an Azure storage account.
		/// </summary>
		/// <param name="args">Azure storage account name, Azure storage account key, local path to quito-climate-study/dist directory.</param>
		static void Main(string[] args)
		{
			List<string> skipDirectories = new List<string>();
#if !DEBUG
			if (args.Length < 3)
			{
				Console.WriteLine("Storage account name, key, and local path to quito-climate-study/dist directory (e.g. C:/dev/quito/quito-climate-study/dist) are required parameters.");
				return;
			}

			if (!args[2].Split('\\').Last().Equals("dist"))
			{
				Console.WriteLine("Third argument must specify the path of the 'dist' directory. If there is no 'dist' directory in quito-climate-study, follow online instructions to build the site.");
				return;
			}			
			string accountName = args[0];
			string actkey = args[1];
			string localDir = args[2];

			if (args.Any(a => a.StartsWith("-r")))
			{ skipDirectories.Add("raster"); }
			if (args.Any(a => a.StartsWith("-v")))
			{ skipDirectories.Add("vector"); }
			if (args.Any(a => a.StartsWith("-b")))
			{ skipDirectories.Add("bower-components"); }			
	
#else
			string accountName = "quitoestudiodeclima";
			string actkey = "HaN7FfuhVWZBGV/zhDnckn6GiT5Swna46aDmOFoAwXfjI4duQj3CCQ4IEDAgFac+oX/DCHzLPqu1dVDLK/1cnA==";
			string localDir = "C:\\dev\\quito\\quito-climate-study\\dist";
			/*string accountName = args[0];
			string actkey = args[1];
			string localDir = args[2];*/						
#endif
			Stopwatch sw = new Stopwatch();
			sw.Start();
			Task t = UploadFiles(accountName, actkey, localDir, skipDirectories);

			t.ContinueWith((str) =>
			{
				Console.WriteLine(str.Status.ToString());
				Console.WriteLine("Complete");
			});
			t.Wait();
			sw.Stop();
			Console.WriteLine(string.Format("Upload completed in {0} seconds", sw.Elapsed.TotalSeconds));
		}

		public async static Task UploadFiles(string accountName, string actkey, string localDir, IEnumerable<string> skipDirectories)
		{
			Uploader uploader = new Uploader(accountName, actkey);
			await uploader.Upload(localDir, "$root", skipDirectories);
		}
	}
}
