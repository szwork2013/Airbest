using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Specials
{
    public class SpecialItem
    {
        public Guid? Id { get; set; }
        public int Index { get; set; }
        public string Name { get; set; }
        public Dictionary<string, Dictionary<string, string>> Res { get; set; }
    }
}
