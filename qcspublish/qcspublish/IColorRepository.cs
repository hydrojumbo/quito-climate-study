using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	/// <summary>
	/// Interface of repository used to map colors to values within source files for particular layers.
	/// </summary>
	public interface IColorRepository
	{
		/// <summary>
		/// Returns the 0-255 RBG color values for a 6-character color hex code matching the color mapped to the range including value for the particular input/output file combination..
		/// </summary>
		/// <param name="fileName">Input source file name.</param>
		/// <param name="resultName">Output file name.</param>
		/// <param name="value">Value to map to color.</param>
		/// <returns></returns>
		RGBColors ColorsOfValueInFile(string fileName, string resultName, double value);

		/// <summary>
		/// Returns the 0-255 RBG color values for a 6-character color hex code matching the category mapped to categoricalValue in the file.
		/// </summary>
		/// <param name="fileName">Input source file name.</param>
		/// <param name="resultName">Output file name.</param>
		/// <param name="categoricalValue">Value to map to color.</param>
		/// <returns></returns>
		RGBColors ColorsOfValueInFile(string fileName, string resultName, string categoricalValue);

		/// <summary>
		/// Returns if this is a categorical value.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns></returns>
		Boolean IsCategoricalMap(string fileName, string resultName);

		String SingleColorForFile(string fileName, string resultName);	

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
		Boolean MapColorsToThisResult(string fileName, string resultName);

		/// <summary>
		/// Get the Legend of this file.
		/// </summary>
		/// <param name="fileName"></param>
		/// <param name="resultName"></param>
		/// <returns></returns>
		IEnumerable<LegendItem> FileLegend(string fileName, string resultName);
	}
}
