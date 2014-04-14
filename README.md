quito-climate-study
===================

Build process and web portal for the results of a climate change vulnerability study on Quito, Ecuador.

###Getting Started

####About
The quito-climate-study repository contains four independent applications that together enable the open publication of the datasets used in ***INSERT CITATION OF PAPER WITH DOWNLOAD LINK****, presented in a modern web application:
1. An in-browser ["Single Page Application"](http://en.wikipedia.org/wiki/Single-page_application) based on the [AngularJS](http://angularjs.org/) Javascript framework.
2. "qcspublish" - A command-line GIS build process application for transforming a directory of vector Shapefile (.shp), and raster [GeoTiff](http://www.remotesensing.org/geotiff/spec/geotiffhome.html) (.tif) and ESRI Grid datasets into a collection of resources needed for the web application.
3. A [Grunt](http://gruntjs.com/) build configuration for building the AngularJS application from templates.
4. "azureUploader" - A command-line application for publishing a built site to an Azure blob storage account.

####Limitations
The site as it is currently built is designed to be hosted directly on Windows Azure Blob storage. This approach has several drawbacks - notably: 
1. A lack of opportunity to manage and throttle requests beyond what is built into the Azure platform.
2. The requirement that the home page url have '/index.html' instead of just the root domain (no default http route).

####Requirements
This build process was created and tested on a 64-bit Windows 7 PC, although any Windows 7 PC should suffice. The build process requires several tools to be installed on your machine. Additionally, [MapTiler Start edition](http://www.maptiler.org/) (single-user license costs $28 as of 2/15/2014) is used to manually turn the results of the GIS build process for raster datasets into tiles for view on the web. Publishing this site with these tools requires a [subscription on Windows Azure](http://azure.microsoft.com/en-us/pricing/free-trial/), and an [Azure Storage Account](http://azure.microsoft.com/en-us/services/storage/). 

####Setting up a computer to build the web site
1. Install [FWTools 2.4.7 Windows 32bit](http://fwtools.maptools.org/).
2. Download and purchase a 'Start Edition' license of [MapTiler](http://www.maptiler.org/). 
3. Install [node js](http://nodejs.org/download/)
4. Open a command prompt (Windows 7: Start Menu => Type "cmd" => Press Enter).
5. Install yeoman by typing: "npm install -g yo" => Press Enter. Read [Yeoman getting started](http://yeoman.io/gettingstarted.html) for more information.
6. Install ruby by downloading and running [the installer](http://rubyinstaller.org/). Make sure to put ruby executables in your PATH when prompted by the installer.
7. Clone this repository with Git (e.g. in Git Bash, type "git clone https://github.com/hydrojumbo/quito-climate-study.git" or [Download the zip file](https://github.com/hydrojumbo/quito-climate-study/archive/master.zip) and unzip it on your computer. In case you have never used Git before, recommended "clients" (programs that let you use Git) include: Git Bash, Git Gui, Tower on Mac, and Github for Windows. Git is only necessary if you want to add layers to the site and have those changes included with the source.
8. While this is not necessary, [Azure Storage Explorer](http://azurestorageexplorer.codeplex.com/) is a convenient way to browse the files of the site after they have been uploaded.

###Publishing the web site 
There are several steps involved in publishing the web site. At a high level, these are:
1. [Create web representations of the GIS vector and raster data files](#Create-web-representations-of-the-GIS-vector-and-raster-data-files)
2. [Build the web site and preview it in your browser by hosting it locally](#Build-the-web-site-and-preview-it-in-your-browser-by-hosting-it-locally)
3. [Build the distribution version of the web site](#Build-the-distribution-version-of-the-web-site)
4. [Upload the distribution version of the web site to the cloud](#Upload-the-distribution-version-of-the-web-site-to-the-cloud)

####Create web representations of the GIS vector and raster data files
The quito-climate-study web site uses standard [GeoJSON](http://geojson.org/) to represent vector datasets, and [OpenStreetMap-compliant geographic tiles](http://wiki.openstreetmap.org/wiki/Tiles#Graphical_Map_Tiles) to represent raster datasets online. The qcspublish command line application transforms the GIS data files used by the study's authors into these types of resources, and generates .csv files of attribute tables to facilitate download. 

#####Running qcspublish
Qcspublish works by locating all GIS files with ".shp", ".tif", and ".adf" extensions within a directory and all of its sub-directories, and processing them based on rules specified in the ColorMap.json file included in the directory with qcspublish. By editing the ColorMap.json file, you can teach qcspublish how to process new layers for the site.

To run qcspublish:
Follow the [setup instructions](Setting-up-a-computer-to-build-the-web-site) above.
1. Open a command terminal (Start => type 'cmd' => Press Enter) and change directory to the directory with qcspublish.exe in it (e.g. cd c:/dev/quito-climate-study/.
2. Run qcspublish, specifying the following arguments (required):
	1. Source directory: all GIS files within this directory will be processed.
	2. App directory: this should be the path to the /app directory inside of the /quito-climate-study directory of the web application.

	For example: qcspublish C:\dev\quito\For_Geoportal_WGS\ C:\dev\quito\quito-climate-study\app\

NOTE: Steps 3 and 4 only apply if you have added new raster files to the site. 
3. After running qcspublish, open the quito-climate-study/app/raster/rgb/ directory. You should see a list of files. For each of these files, there is a subdirectory with the same name in the quito-climate-study/app/raster/ directory.
4. Open MapTiler. MapTiler Start Edition allows you to process one file at a time. For each of the raster files in the quito-climate-study/app/raster/rgb folder:

	1. Open MapTiler, choose Mercator Tiles and check Continue ![MapTiler Step 1](https://raw.github.com/hydrojumbo/quito-climate-study/master/doc/img/MapTilerStart_1.png).
	2. Drag and drop the image into the MapTiler aplication, and choose Continue. ![MapTiler Step 2](https://raw.github.com/hydrojumbo/quito-climate-study/master/doc/img/MapTilerLoadFromAppRaster_2.png)
	3. Make sure the Folder output option is selcted (it is by default). Set the zoom levels to "Zoom from 7 to 12."
	4. Choose Render ![MapTiler Step 3](https://raw.github.com/hydrojumbo/quito-climate-study/master/doc/img/MapTilerSetZoom_3.png)
	5. A in the "Select output directory" dialogue box that pops up, find the folder in the quito-climate-study/app/raster/ directory that matches the file name of the raster file you are processing, and choose Select Folder. ![MapTiler Step 4](https://raw.github.com/hydrojumbo/quito-climate-study/master/doc/img/MapTilerSelectImageFolder_4.png)
	6. MapTiler will generate the tiles you need and put them in the folder you selected. To process additional files, select back in MapTiler and unload the application.

To avoid duplicating effort, a zip file containing a complete raster directory is available.

#####What qcspublish does with raster data
Note: all raster datasets supported by this tool are 1-band rasters with 32-bit floating point values. If the dataset you want to include is already a 3-band RGB file, you do not need to process it with qcspublish (example: dem.tif), however, you do need to include an entry for it in ColorMap.json with a reference to an image in the quito-climate-study/app/images/legend/ directory to display as that file's legend.

1. Opens dataset and determines the color range to publish it with. Color ranges for each layer are specified in ColorMap.json, a file located in the same directory as qcspublish.exe.
2. Creates a /raster directory in the /app directory of the quito-climate-study directory if one does not exist.
3. Creates an /original directory in the /app/raster directory if one does not exist..
4. Creates an /rgb directory in the /app/raster directory if one does not exist.
5. Creates a 1-band 32-bit GeoTiff with the original raster values and saves it in the /app/raster/original directory. This file is used for data download.
6. Creates a 3-band 8-bit GeoTiff with the colors specified by the ColorMap.json record for that file, and saves it in the /app/raster/rbg directory.
7. Creates a directory with the same file name as the files just generated (without the extension) in the /app/raster directory.

#####What qcspublish does with vector data
This site supports the use of GeoJson data sources to display vector datasets. Source data for these datasets can be upwards of 60Mb; to reduce the data size in storage and sent over the wire, gzip compression is applied prior to uploading the data files. [Almost all current browsers](http://webmasters.stackexchange.com/questions/22217/which-browsers-handle-content-encoding-gzip-and-which-of-them-has-any-special) can support this compression.

1. Opens dataset and determines the color range to publish it with. Color ranges for each layer are specified in ColorMap.json, a file located in the same directory as qcspublish.exe.
2. Creates a /vector directory in the /app directory of the quito-climate-study directory if one does not exist.
3. Adds a column, "quito-color," to the attribute table of the shapefile, and includes the appropriate color for each feature of the dataset.
4. Saves the modified dataset as GeoJSON (.json) and CSV (.csv) files in the app/vector directory. All GeoJSON files are encoded with gzip compression to minimize file transfer size to modern web clients.

####Build the web site and preview it in your browser by hosting it locally
To preview the site, quito-climate-study relies on the grunt task runner to compile the javascript and host the files on a web server on your localhost (typically 127.0.0.1:9000). This toolchain provides automation of the publication process, and a convenient editing experience in which any changes to HTML, CSS, or Javascript source files causes the browser to refresh the page and reflect the changes.

Before building the site, make sure you have fully-built /app/raster/, /app/vector/, and /app/legend/ directories by [running qcspublish](#Running-qcspublish) or extracting the pre-processed files for raster, vector, and legend.

Once you have the GIS resource representations in place:

1. Open a console (Start Menu => type 'cmd' => Press Enter) and navigate to the quito-climate-study directory, (e.g. 'cd c:/dev/quito-climate-study').
2. Type 'grunt serve' => Press Enter. You should see the console showing the results of the build process, and your default web browser launching a new tab with the site in it.

####Build the distribution version of the web site
The distribution version of the site is the version that you upload to a public-facing web server or host on a cloud storage service like Azure Blob Storage or Amazon S3. The distribution version of the site is functionally identical to the web site in the /app/ directory of the project, with additional optimizations applied.

Before building the site, make sure you have fully-built /app/raster/, /app/vector/, and /app/legend/ directories by [running qcspublish](#Running-qcspublish) or extracting the pre-processed files for raster, vector, and legend into the quito-climate-study/app directory.

1. Open a console (Start Menu => type 'cmd' => Press Enter) and navigate to the quito-climate-study directory, (e.g. 'cd c:/dev/quito-climate-study').
2. Type 'grunt build' => Press Enter. The console will show results of the build process, and new directory /dist/ will be created inside the quito-climate-study application.

####Upload the distribution version of the web site to the cloud
The azureUploader console application manages the upload of the /dist/ directory to a Windows Azure storage account. On the way, it also applies HTTP metadata headers that optimize resource usage on the site (e.g. cause the browser to cache resources instead of requesting them each time a user wants to view them), and make them compliant with [internet media type](http://en.wikipedia.org/wiki/MIME_type#List_of_common_media_types) standards to maximize browser compatibility with the web site.

If you want to publish the site on another web host, you should copy the quito-climate-study/dist/ directory after you have [built the web site](#Build-the-distribution-version-of-the-web-site). You will need to make sure to configure [internet media type](http://en.wikipedia.org/wiki/MIME_type#List_of_common_media_types) for each of the mime types. See [the UploadFile method of the Uploader class in azureUploader](/blob/master/azureUploader/azureUploader/Uploader.cs) for the list of HTTP metadata to apply to each of the mime types needed to publish quito-climate-study.

Before running the azureUploader console application, you make sure you have fully-built /app/raster, /app/vector/, and /app/legend/ directories by [running qcspublish](#Running-qcspublish), or extracting the pre-processed files for raster, vector, and legend. You must also have [built the distribution version of the site](#Build-the-distribution-version-of-the-web-site).

You will also need a Windows Azure storage account name and access key to publish the site. After getting an Azure subscription and [provisioning a storage account](http://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-accoun#create), you can find these credentials by following the [steps shown in this video](https://www.youtube.com/watch?v=KMjeSDa_2AE).

To run azureUploader:
1. Open a console (Start Menu => type 'cmd' => Press Enter) and navigate to the quito-climate-study directory, (e.g. 'cd c:/dev/quito-climate-study').
2. Type azureUploader and specify the following required parameter inputs:
	1. Azure storage account name. 
	2. Azure storage account key.
	3. Path to quito-climate-study/dist directory.

	For example: 'azureUploader quitoestudiodeclima HaN7FfuhVWZBGV/zhDnckn6GiT5Swna46aDmOFoAwXfjI4duQj3CCQ4IEDAgFac+oX/DCHzLPqu1dVDLK/1cnA== c:/dev/quito-climate-study/dist'
3. The console application will list each file it uploads. When it is complete, you should be able to browse to http://<your-storage-account-name>.blob.core.windows.net/index.html to see the site.

###Attribution
The GIS build process of this system is based on the efforts of several open source projects and communities:
1. 