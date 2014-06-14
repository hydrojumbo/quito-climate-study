using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	public static class HexColorConverter
	{
		public static string HexColorOfRgbString(this string rgbString)
		{
			string[] clrs = rgbString.Replace("(", "").Replace(")", "").Split(',');
			int red = Convert.ToInt32(clrs[0]);
			int green = Convert.ToInt32(clrs[1]);
			int blue = Convert.ToInt32(clrs[2]);
			return "#" + (red.ToString("X2") + green.ToString("X2") + blue.ToString("X2"));
		}
	}
}
