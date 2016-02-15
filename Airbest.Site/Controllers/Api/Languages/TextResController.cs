using Airbest.Languages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Airbest.Site.Controllers.Api.Languages
{
    public class TextResController: ApiController
    {
        private readonly TextResService textSvr;

        public TextResController(TextResService textSvr)
        {
            this.textSvr = textSvr;
        }
    }
}