using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Properties
{
    public class PropertyQueryFilter: QueryFilter
    {
        public Guid? ProductId { get; set; }
        public PropertyQueryIncludes Includes { get; set; }
    }
}
