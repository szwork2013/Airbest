using Huajie.Practices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Specials
{
    public class Special : ITrackable<Guid?>
    {
        public Guid? Id { get; set; }
        public int Index { get; set; }
        public List<SpecialItem> Items { get; set; }
        public Dictionary<string, Dictionary<string, string>> Res { get; set; }
    }
}
