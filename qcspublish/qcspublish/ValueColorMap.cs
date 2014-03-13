using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	/// <summary>
	/// Maps categorical and numerical attribute values to display colors.
	/// </summary>
	public class ValueColorMap
	{
		/// <summary>
		/// If set, maps a color to a categorical variable value.
		/// </summary>
		public string categoricalValue { get; set; }

		/// <summary>
		/// If set, maps a color to the upper boundary of a range of values.
		/// </summary>
		public double upperBoundary { get; set; }

		/// <summary>
		/// Hexidecimal 8-bit RGB value, no alpha channel.
		/// </summary>
		public string color { get; set; }

		public ValueColorMap()
		{ }
	}
}
