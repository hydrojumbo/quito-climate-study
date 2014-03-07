using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	/// <summary>
	/// Container and converter for 
	/// </summary>
	public class RGBColors
	{
		private int red;
		private int green;
		private int blue;
		private string hexColor;

		public int Red { get { return red; } }
		public int Green { get { return green; } }
		public int Blue { get { return blue; } }
		public string HexColor { get { return hexColor; } }

		public RGBColors(string hexColor)
		{
			Color color = System.Drawing.ColorTranslator.FromHtml(hexColor);
			this.red = color.R;
			this.green = color.G;
			this.blue = color.B;
			this.hexColor = hexColor;
		}
	}
}
