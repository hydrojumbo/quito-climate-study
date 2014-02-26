quito-climate-study
===================

Build process and web portal for the results of a climate change vulnerability study on Quito, Ecuador.


###Preparing raster data for publication
####Tools used:
1. Windows 7 running on x64 platform.
2. qpcspublish from this repository
3. [FWTools 2.4.7 Windows 32bit](http://fwtools.maptools.org/)
4. MapTiler 0.5.2 Start edition (single-user license costs $28 as of 2/15/2014)

This site uses an OpenStreetMap-compatible tilesource format to serve raster datasets over the web. Starting from 32-bit single-band raster files with file names matching the 'fileName' property of one of the color maps defined in qcspublich/RasterColorMap.json:

1. Install [FWTools 2.4.7 Windows 32bit](http://fwtools.maptools.org/) and download and purchase a 'Start Edition' license.
2. Download qcspublish.zip (todo: add link for distributable package) and unzip it or clone this repository and open and build qcspublish/qcspublish.sln in Visual Studio 2012.
3. Place all (Geotiff)[http://www.remotesensing.org/geotiff/spec/geotiffhome.html] raster files to be converted into a single directory.
4. Open a command terminal (Start => type 'cmd' => Press Enter) and change directory to the directory with qcspublish.exe in it (where you unzipped qcspublish.zip or built qcspublish.sln in step (2)).
5. Run qcspublish path-to-directory-of-images-to-convert. This will produce a new directory, '/rasterout' inside whatever directory contained the images being converted.
6. Open MapTiler. For each file that is placed in the '/rasterout' folder:
	1. load it choose Continue.
	2. When options are presented to choose destination and Zoom from, select the directory inside the '/rasterout' directory that  and set the Zoom from equal to 7 to 12. 
	3. Choose Render.
7. 

You should make a separate folder for the tiles of each raster file you wish to display on the site. Before publishing the site to the cloud, you will need to move each of these folders into the quito-climate-study/tiles folder for the upload script to find them. 

###Preparing vector data for publication
This site supports the use of GeoJson data sources to display vector datasets. Source data for these datasets can be upwards of 60Mb; to reduce the data size in storage and sent over the wire, gzip compression is applied prior to uploading the data files. [Almost all current browsers](http://webmasters.stackexchange.com/questions/22217/which-browsers-handle-content-encoding-gzip-and-which-of-them-has-any-special) can support this compression.

####To create GeoJSON data files:
1. (Skip if you have already done this for (raster data)[#Preparing raster data for publication]) Download qcspublish.zip (todo: add link for distributable package) and unzip it or clone this repository and open and build qcspublish/qcspublish.sln in Visual Studio 2012.
2. Place all (shapefiles)[http://en.wikipedia.org/wiki/Shapefile#Shapefile_shape_format_.28.shp.29] to be converted into a single directory.
3. Open a command terminal (Start => type 'cmd' => Press Enter) and change directory to the directory with qcspublish.exe in it (where you unzipped qcspublish.zip or built qcspublish.sln in step (2)).
4. Run qcspublish path-to-directory-of-shapefiles-to-convert. This will produce a new directory, '/vectorout'
5. The site publication script will manage compression of these files.
6. Before publishing the site to the cloud, copy or move each of these GeoJSON files to the quito-climate-study/vector folder so the upload script can find them.

###Setting up a development environment to enable you to rebuild this application
NOTE: This is only necessary if you wish to change the structure of the geoportal, for example, to add another section or additional maps. To update existing maps content, see below. This setup was executed on Windows 7 (should work on other platforms as well but this has not been tested).

1. Read [Yeoman getting started](http://yeoman.io/gettingstarted.html)
2. Install [node js](http://nodejs.org/download/)
3. Open a command prompt (Windows 7: Start Menu => Type "cmd" => Press Enter).
4. Install yeoman by typing: npm install -g yo (Enter)
5. Install ruby by downloading and running [the installer](http://rubyinstaller.org/). Make sure to put ruby executables in your PATH when prompted by the installer.
6. Open a Git client (recommend Git Bash; alternatives include: Git Gui, Tower on Mac, Github for Windows, Visual Studio Git Integration) and type 'cd path-of-directory-to-hold-this-project'.
7. Clone this project e.g. in Git Bash, type 'git clone https://github.com/hydrojumbo/quito-climate-study.git' (no quotes).
8. In the command prompt, type cd quito-climate-study to move inside the just-created project folder.
9. Install the angular generator: npm install -g generator-angular

You should now be ready to build the files that get uploaded to cloud storage as the web portal. Type 'grunt serve' in the command prompt to build the app and host it on your local machine (not accessible to the internet).

