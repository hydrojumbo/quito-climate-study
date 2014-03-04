using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace azureUploader
{
	/// <summary>
	/// Uploads built and tiled static resources to Azure storage directory, publishing the web application.
	/// </summary>
	class Program
	{
		/// <summary>
		/// Validates and uploads a built quito-climate-study application to an Azure storage account.
		/// </summary>
		/// <param name="args">Azure storage account name, Azure storage account key.</param>
		static void Main(string[] args)
		{
			if (args.Length < 3)
				throw new NotSupportedException("Storage account name, key, and local path to quito-climate-study with prepared output files are required parameters.");

			RasterUploader _rasterEngine = new RasterUploader(args[0], args[1], args[2], "tiles");
			VectorUploader _vectorEngine = new VectorUploader(args[0], args[1], args[2], "vector");

		}
	}
}
