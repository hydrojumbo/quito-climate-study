using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace qcspublish
{
	/// <summary>
	/// Container for legend information of all published datasets.
	/// </summary>
	public class LegendRepository : Dictionary<string, IEnumerable<LegendItem>>
	{
		public LegendRepository() : base()
		{
			
		}
	}
}
