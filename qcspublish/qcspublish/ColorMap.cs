using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
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
		/// Field of shapefile to bind color display to
		/// </summary>
		public string clrField { get; set; }

		/// <summary>
		/// Rules about how to color various values.
		/// </summary>
		public ValueColorMap[] colorMaps { get; set; }

		public ColorMap()
		{ }
	}
}
