﻿using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Products
{
    public class ProductQueryFilter: QueryFilter
    {
        public ProductQueryIncludes Includes { get; set; }
    }
}
