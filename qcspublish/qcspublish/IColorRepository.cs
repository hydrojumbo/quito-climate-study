﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	public interface IColorRepository
	{
		/// <summary>
		/// Returns the 0-255 RBG color values for a 6-character color hex code, e.g. 
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="value"></param>
		/// <returns></returns>
		RGBColors ColorsOfValueInFile(string fileName, double value);
	}
}
