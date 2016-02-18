using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Categories
{
    public class Category
    {
        public Guid? Id { get; set; }

        public Guid? ParentId { get; set; }

        public string Name { get; set; }

        public string Desc { get; set; }

        public int Index { get; set; }

        public List<Category>  Children { get; set; }
    }
}
