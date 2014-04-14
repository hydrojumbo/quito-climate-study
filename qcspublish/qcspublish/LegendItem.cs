using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	/// <summary>
	/// Data required to show one range and color in a legend on Leaflet.
	/// </summary>
	public class LegendItem
	{
		/// <summary>
		/// Minimum value of range of this legend entry.
		/// </summary>
		public double LowerBound { get; set; }

		/// <summary>
		/// Maximum value of range of this legend entry.
		/// </summary>
		public double UpperBound { get; set; }

		/// <summary>
		/// If true, this legend entry should use the DiscreteCategory value instead of the Lower and Upper Bounds
		/// </summary>
		public Boolean IsDiscrete { get; set; }

		/// <summary>
		/// If included, this image file should be used as the legend. The image file should be plaed in the quito-climate-study/app/images/legend directory.
		/// </summary>
		public string LegendFile { get; set; }

		/// <summary>
		/// If this legend entry binds to a discrete property (not continuous), this is the name.
		/// </summary>
		public string DiscreteCategory { get; set; }

		/// <summary>
		/// Color to represent this range.
		/// </summary>
		public string HexColor { get; set; }

		public LegendItem()
		{ }
	}
}
