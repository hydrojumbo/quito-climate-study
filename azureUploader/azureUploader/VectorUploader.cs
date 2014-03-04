using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace azureUploader
{
	/// <summary>
	/// Uploads geoJson files to public storage account. 
	/// Verifies container permissions. 
	/// Verifies CORS settings on storage account. 
	/// Applies gzip compression to data prior to upload.
	/// Assigns necessary metadata for gzip encoding and compatibility with Leaflet.js browser library.
	/// </summary>
	public class VectorUploader
	{
		private CloudStorageAccount csa;

		/// <summary>
		/// Uploader for "vectorout" directory.
		/// </summary>
		/// <param name="azureAccountName"></param>
		/// <param name="azureAccountKey"></param>
		/// <param name="localDirectory"></param>
		/// <param name="remoteContainerPath"></param>
		public VectorUploader(string azureAccountName, string azureAccountKey, string localDirectory, string remoteContainerPath)
		{
			
		}

		/// <summary>
		/// Compress file from local system, returns compressed stream ready to write to remote source.
		/// </summary>
		/// <param name="fileName"></param>
		/// <returns></returns>
		private MemoryStream GzipCompressFile(string fileName)
		{			
			// Read file into byte array buffer.
			byte[] b;
			using (FileStream f = new FileStream(fileName, FileMode.Open))
			{
				b = new byte[f.Length];
				f.Read(b, 0, (int)f.Length);
			}

			// Use GZipStream to write compressed bytes to target file.
			using (MemoryStream f2 = new MemoryStream())
			using (GZipStream gz = new GZipStream(f2, CompressionMode.Compress, false))
			{
				gz.Write(b, 0, b.Length);
				gz.Flush();
				f2.Position = 0; //reset position after write has been fully flushed
				return f2;
			}
		}
	}
}
