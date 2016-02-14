using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Specials
{
    public class Special
    {
        public Guid? Id { get; set; }
        public Dictionary<string, SpecialRes> Res { get; set; }
        public List<SpecialItem> Items { get; set; }
    }
}
