using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Properties
{
    public class PropertyItem
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }

        public int Index { get; set; }
        public Dictionary<string, Dictionary<string, string>> Res { get; set; }

        public string Text { get; set; }
        public string Data { get; set; }

        public double? Float1 { get; set; }
        public double? Float2 { get; set; }
        public double? Float3 { get; set; }
    }
}
