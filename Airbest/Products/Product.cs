using Airbest.Languages;
using Huajie.Practices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products
{
    public class Product: ResedModel
    {
        public Guid? Id { get; set; }

        public Guid? CategoryId { get; set; }

        public string ImageUrl { get; set; }

        public int Index { get; set; }

        public string Name { get; set; }
    }
}
