using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Categories
{
    public class CategoryQueryFilter: QueryFilter
    {
        public Guid? ParentId { get; set; }
        public CategoryQueryIncludes Includes { get; set; }
    }
}
