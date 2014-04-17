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
		public Boolean IsOutline { get; set; }

		public RGBColors(string hexColor, string rgb, Boolean isOutline)
		{
			IsOutline = isOutline;
			if (!string.IsNullOrEmpty(hexColor))
			{
				Color color = System.Drawing.ColorTranslator.FromHtml(hexColor);
				this.red = color.R;
				this.green = color.G;
				this.blue = color.B;
				this.hexColor = hexColor;
			}
			else if (!string.IsNullOrEmpty(rgb))
			{
				string clr = rgb.Replace("(", "").Replace(")", "");
				string[] clrs = clr.Split(',');
				this.red = Convert.ToInt32(clrs[0]);
				this.green = Convert.ToInt32(clrs[1]);
				this.blue = Convert.ToInt32(clrs[2]);
				this.hexColor = "#" + (this.red.ToString("X2") + this.green.ToString("X2") + this.blue.ToString("X2"));
			}									
		}
	}
}
