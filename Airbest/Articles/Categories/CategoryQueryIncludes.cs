﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Articles.Categories
{
    [Flags]
    public enum CategoryQueryIncludes
    {
        None = 0,
        Res = 1,
        Children = 2
    }
}
