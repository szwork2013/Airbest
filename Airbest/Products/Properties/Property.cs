using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Properties
{
    public class Property
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }
        public string Desc { get; set; }
        public int Index { get; set; }
        public string Type { get; set; }

        public List<PropertyItem> Items { get; set; }
        public Dictionary<string, Dictionary<string, string>> Res { get; set; }

        public string Unit1 { get; set; }
        public string Unit2 { get; set; }
    }
}
