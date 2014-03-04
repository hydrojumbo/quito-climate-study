using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace azureUploader
{
	/// <summary>
	/// Uploads raster tiles for consumption by OpenStreetMap-compliant app, e.g. quito-climate-study
	/// </summary>
	public class RasterUploader
	{
		private CloudStorageAccount csa;

		/// <summary>
		/// Uploader for prepared raster data used in quito-climate-study project.
		/// </summary>
		/// <param name="azureAccountName"></param>
		/// <param name="azureAccountKey"></param>
		/// <param name="localDirectory">Top level directory of all tile directories.</param>
		/// <param name="remoteContainerPath">Top-level directory to contain all tile-specific directories in remotem storage.</param>
		public RasterUploader(string azureAccountName, string azureAccountKey, string localDirectory, string remoteContainerPath)
		{ 
			
		}
	}
}
