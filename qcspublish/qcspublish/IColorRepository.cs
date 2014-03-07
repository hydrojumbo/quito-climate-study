using System;
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
		RGBColors ColorsOfValueInFile(string fileName, string resultName, double value);

		/// <summary>
		/// Checks if file has mapping.
		/// </summary>
		/// <param name="fileName"></param>
		/// <returns></returns>
		Boolean HasColorMappingOfFile(string fileName);

		/// <summary>
		/// Returns the field name to use to project a new color property into the output's attributes for binding on UI.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns></returns>
		string ColorFieldForOutput(string fileName, string resultName);
		IEnumerable<string> ResultFileName(string fileName);
	}
}
