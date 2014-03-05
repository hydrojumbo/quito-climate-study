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
	public class Uploader
	{
		private CloudStorageAccount csa;

		/// <summary>
		/// Uploader for "vectorout" directory.
		/// </summary>
		/// <param name="azureAccountName"></param>
		/// <param name="azureAccountKey"></param>
		public Uploader(string azureAccountName, string azureAccountKey)
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
			ConfigureCorsOnStorageAccount(client);
			client.RetryPolicy = new Microsoft.WindowsAzure.Storage.RetryPolicies.ExponentialRetry();
			await UploadFilesOfDirectory(localDirectory, remoteContainerPath, client);
			return;
		}

		/// <summary>
		/// Recursively upload everything in the remote directory.
		/// </summary>
		/// <param name="localDirectory"></param>
		/// <param name="remoteContainerPath"></param>
		/// <param name="client"></param>
		/// <returns></returns>
		private async Task UploadFilesOfDirectory(string localDirectory, string remoteContainerPath, CloudBlobClient client)
		{
			Console.WriteLine("");
			Console.WriteLine("Uploading files from " + localDirectory + "...");
			CloudBlobContainer container;
			string filePrefix = "";
			if (remoteContainerPath.Contains("/"))
			{
				string[] directoryStructure = remoteContainerPath.Split('/');
				container = client.GetContainerReference(directoryStructure[0]);
				filePrefix = string.Join("/", directoryStructure.Skip(1));
			}
			else
			{ 
				container = client.GetContainerReference(remoteContainerPath);
				await container.CreateIfNotExistsAsync();
				await container.SetPermissionsAsync(new BlobContainerPermissions()
				{
					PublicAccess = BlobContainerPublicAccessType.Blob
				});			
			}
									
			DirectoryInfo local = new DirectoryInfo(localDirectory);
			List<Task> uploads = new List<Task>();
			foreach (FileInfo file in local.GetFiles())
			{
				uploads.Add(ProcessAndUploadFile(file, container, filePrefix));
			}
			if (uploads.Count() > 0)
			{
				await Task.WhenAll(uploads);
			}			

			List<Task> subdirectories = new List<Task>();
			foreach (DirectoryInfo child in local.GetDirectories())
			{
				string nextContainer = remoteContainerPath.Contains("$root") ? child.Name : remoteContainerPath + "/" + child.Name;
				subdirectories.Add(UploadFilesOfDirectory(child.FullName,  nextContainer, client));
			}
			if (subdirectories.Count() > 0)
			{
				await Task.WhenAll(subdirectories);
			}
			
		}

		/// <summary>
		/// Applies pre-processing to data file. Uploads file to remote container.
		/// </summary>
		/// <param name="file"></param>
		/// <param name="container"></param>
		/// <returns></returns>
		private async Task ProcessAndUploadFile(FileInfo file, CloudBlobContainer container, string filePrefix)
		{
			try
			{
				if (file.Extension.Contains("json") || file.Extension.Contains("html"))
				{
					using (MemoryStream ms = new MemoryStream())
					{
						using (GZipStream gzip = new GZipStream(ms, CompressionMode.Compress, true))
						{
							using (FileStream fs = new FileStream(file.FullName, FileMode.Open))
							{
								fs.CopyTo(gzip);
							}							
						}
						ms.Position = 0;
						await UploadFile(ms, file, container, filePrefix);					
					}
				}
				else
				{
					using (FileStream fs = new FileStream(file.FullName, FileMode.Open))
					{
						await UploadFile(fs, file, container, filePrefix);
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(string.Format("Exception uploading {0}. Message: {1}. Inner exception: {2}", file.FullName, ex.Message, ex.InnerException));
			}			
			
			return;
		}			

		/// <summary>
		/// Assigns metadata and uploads the file stream
		/// </summary>
		/// <param name="stream"></param>
		/// <param name="file"></param>
		/// <param name="container"></param>
		/// <returns></returns>
		private async Task UploadFile(Stream stream, FileInfo file, CloudBlobContainer container, string filePrefix)
		{
			//get blob with nested structure
			string fileWithDirectoryPrefix = string.IsNullOrEmpty(filePrefix) ? file.Name : filePrefix + "/" + file.Name;
			CloudBlockBlob blob = container.GetBlockBlobReference(fileWithDirectoryPrefix);			
			blob.Properties.CacheControl = CacheControlAgeForResource(file.Extension);
			
			switch (file.Extension)
			{
				case ".json":
					blob.Properties.ContentType = "application/json";
					blob.Properties.ContentEncoding = "gzip";
					break;

				case ".csv":
					blob.Properties.ContentType = "text/csv";
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					break;

				case ".tif":
					blob.Properties.ContentType = "image/tiff";			
					break;

				case ".pdf":
					blob.Properties.ContentType = "application/pdf"; //see: http://www.rfc-editor.org/rfc/rfc3778.txt
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					break;

				case ".html":
					blob.Properties.ContentType = "text/html";
					blob.Properties.ContentEncoding = "gzip";
					break;

				case ".ico":
					blob.Properties.ContentType = "image/vnd.microsoft.icon";
					break;

				case ".htaccess":
					blob.Properties.ContentType = "text/plain";
					break;

				case ".txt":
					blob.Properties.ContentType = "text/plain";
					break;

				case ".js":
					blob.Properties.ContentType = "application/javascript";
					break;

				case ".css":
					blob.Properties.ContentType = "text/css";
					break;

				case ".md":
					blob.Properties.ContentType = "text/plain";
					break;

				case ".gitignore":
					blob.Properties.ContentType = "text/plain";
					break;

				case ".jpg":
					blob.Properties.ContentType = "image/jpeg";
					break;

				case ".png":
					blob.Properties.ContentType = "image/png";
					break;

				case ".gif":
					blob.Properties.ContentType = "image/gif";
					break;

				case ".eot":
					blob.Properties.ContentType = "application/vnd.ms-fontobject";
					break;

				case ".svg":
					blob.Properties.ContentType = "image/svg+xml";
					break;

				case ".ttf":
					blob.Properties.ContentType = "font/ttf";
					break;

				case ".woff":
					blob.Properties.ContentType = "font/x-woff";
					break;

				default:
					blob.Properties.ContentType = "application/octetstream";
					blob.Properties.ContentDisposition = "attachment;filename=" + file.Name;
					Console.WriteLine(string.Format("File extension {0} unsupported by VectorUploader. Resource {1} will be marked as application/octetstream", file.Extension, file.Name));
					
					break;
			}

			try
			{
				await blob.UploadFromStreamAsync(stream);
				Console.WriteLine("Uploaded " + file.Name + "...");
			}
			catch (Exception ex)
			{ 
				Console.WriteLine(string.Format("Exception uploading file {0} to {1} with message {2}, inner exception {3}", file.Name, fileWithDirectoryPrefix, ex.Message, ex.InnerException));
				Console.WriteLine("Press any key to continue...");
				Console.ReadKey();
			}			
			return;
		}

		/// <summary>
		/// CDN-relevant metadata.
		/// </summary>
		/// <param name="extension"></param>
		/// <returns></returns>
		private static string CacheControlAgeForResource(string extension)
		{
			return "public, max-age=3600";
		}

		/// <summary>
		/// Ensure javascript CORS requests from web APIs work.
		/// </summary>
		/// <remarks>See: http://msdn.microsoft.com/en-us/library/windowsazure/dn535601.aspx </remarks>
		/// <param name="client"></param>
		private static void ConfigureCorsOnStorageAccount(CloudBlobClient client)
		{
			CorsProperties cps = new CorsProperties();
			cps.CorsRules.Add(new CorsRule()
			{
				AllowedOrigins = new List<string>() { "*" },
				AllowedMethods = CorsHttpMethods.Get
			});
			ServiceProperties sp = new Microsoft.WindowsAzure.Storage.Shared.Protocol.ServiceProperties();
			sp.Cors = cps;
			sp.Logging.LoggingOperations = LoggingOperations.Read;
			sp.Logging.RetentionDays = 7;
			sp.Logging.Version = "1.0";
			sp.MinuteMetrics.MetricsLevel = MetricsLevel.ServiceAndApi;
			sp.MinuteMetrics.RetentionDays = 7;
			sp.MinuteMetrics.Version = "1.0";
			sp.HourMetrics.MetricsLevel = MetricsLevel.None;
			sp.HourMetrics.RetentionDays = 1;
			sp.HourMetrics.Version = "1.0";
			client.SetServiceProperties(sp,
			new BlobRequestOptions() { MaximumExecutionTime = TimeSpan.FromSeconds(30) }
			,
			null);
		}
	}
}
