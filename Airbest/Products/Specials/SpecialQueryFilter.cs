using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Specials
{
    public class SpecialQueryFilter: QueryFilter
    {
        public Guid? ProductId { get; set; }
        public SpecialQueryIncludes Includes { get; set; }
    }
}
