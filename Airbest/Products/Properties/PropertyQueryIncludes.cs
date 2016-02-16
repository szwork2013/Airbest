using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products.Properties
{
    [Flags]
    public enum PropertyQueryIncludes
    {
        None = 0,

        Res = 1,

        Items = 2
    }
}
