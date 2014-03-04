using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;

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
		public VectorUploader(string azureAccountName, string azureAccountKey)
		{
			csa = new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(azureAccountName, azureAccountKey), true);		
		}

		/// <summary>
		/// Facilitates uploads beginning at a one-directory deep azure storage container.
		/// </summary>
		/// <param name="localDirectory"></param>
		/// <param name="remoteContainerPath"></param>
		/// <returns></returns>
		public async Task Upload(string localDirectory, string remoteContainerPath)
		{
			CloudBlobClient client = csa.CreateCloudBlobClient();
			CloudBlobContainer container = client.GetContainerReference(remoteContainerPath);
			await container.CreateIfNotExistsAsync();
			await container.SetPermissionsAsync(new BlobContainerPermissions() {
				PublicAccess = BlobContainerPublicAccessType.Blob
			});
			ConfigureCorsOnStorageAccount(client);
			DirectoryInfo local = new DirectoryInfo(localDirectory);
			List<Task> uploads = new List<Task>();
			foreach (FileInfo file in local.GetFiles())
			{
				uploads.Add(ProcessAndUploadFile(file, container));
			}
			await Task.WhenAll(uploads);
			return;
		}

		/// <summary>
		/// Applies pre-processing to data file. Uploads file to remote container.
		/// </summary>
		/// <param name="file"></param>
		/// <param name="container"></param>
		/// <returns></returns>
		private async Task ProcessAndUploadFile(FileInfo file, CloudBlobContainer container)
		{
			if (file.Extension.Contains("json"))
			{
				MemoryStream ms = GzipCompressFile(file.FullName);
				await UploadFile(ms, file, container);
			}
			else
			{
				using (FileStream fs = new FileStream(file.FullName, FileMode.Open))
				{
					MemoryStream mss = new MemoryStream();
					fs.CopyTo(mss);
					await UploadFile(mss, file, container);
				}				
			}
			
			return;
		}

		/// <summary>
		/// Assigns metadata and uploads the file stream
		/// </summary>
		/// <param name="ms"></param>
		/// <param name="file"></param>
		/// <param name="container"></param>
		/// <returns></returns>
		private async Task UploadFile(MemoryStream ms, FileInfo file, CloudBlobContainer container)
		{
			CloudBlockBlob blob = container.GetBlockBlobReference(file.Name);			
			blob.Properties.CacheControl = CacheControlAgeForResource(file.Extension);
			switch (file.Extension)
			{
				case "json":
					blob.Properties.ContentType = "application/json";
					blob.Properties.ContentEncoding = "gzip";
					break;

				case "csv":
					blob.Properties.ContentType = "text/csv";
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					break;

				case "tif":
					blob.Properties.ContentType = "image/tiff";
					break;

				case "pdf":
					blob.Properties.ContentType = "application/pdf";
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					break;

				default:
					blob.Properties.ContentType = "application/octetstream";
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					Console.WriteLine(string.Format("File extension {0} unsupported by VectorUploader. Resource {1} will be marked as application/octetstream", file.Extension, file.Name));
					
					break;
			}

			await blob.UploadFromStreamAsync(ms);
			return;
		}

		/// <summary>
		/// CDN-relevant metadata.
		/// </summary>
		/// <param name="extension"></param>
		/// <returns></returns>
		public static string CacheControlAgeForResource(string extension)
		{
			return "public, max-age=3600";
		}

		/// <summary>
		/// Ensure javascript CORS requests from web APIs work.
		/// </summary>
		/// <param name="client"></param>
		private static void ConfigureCorsOnStorageAccount(CloudBlobClient client)
		{
			client.SetServiceProperties(new Microsoft.WindowsAzure.Storage.Shared.Protocol.ServiceProperties()
			{
				Cors = new Microsoft.WindowsAzure.Storage.Shared.Protocol.CorsProperties()
				{
					CorsRules = new List<CorsRule>() { 
						new CorsRule() {
							AllowedOrigins = new List<string>() { "*" },
							AllowedMethods = CorsHttpMethods.Get
						}
					}
				}
			}, null, null);
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
