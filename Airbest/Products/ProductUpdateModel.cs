using Airbest.Products.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products
{
    public class ProductUpdateModel
    {
        public string Name { get; set; }
        public Guid? CategoryId { get; set; }
        public string SkuNameFormat { get; set; }
    }
}
