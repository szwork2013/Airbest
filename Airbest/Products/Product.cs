using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products
{
    public class Product
    {
        public Guid? CategroyId { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid Id { get; set; }
        public int Index { get; set; }
        public string Name { get; set; }
        public string SkuNameFormat { get; set; }
    }
}
