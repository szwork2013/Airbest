using Airbest.Languages;
using Airbest.Products.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Airbest.Site.Controllers.Api.Products
{
    [RoutePrefix("api/product/property")]
    public class ProductPropertyController : ApiController
    {
        private readonly PropertyService propertySvr;
        private readonly TextResService textSvr;

        public ProductPropertyController(PropertyService propertySvr, TextResService textSvr)
        {
            this.propertySvr = propertySvr;
            this.textSvr = textSvr;
        }

        [HttpPost]
        [Route("replace-all")]
        public dynamic ReplaceAll(Guid productId, [FromBody]List<Property> properies)
        {
            propertySvr.ReplaceAll(productId, properies);
            return new { success = true };
        }

        [HttpGet]
        [Route("")]
        public dynamic Get([FromUri]PropertyQueryFilter filter)
        {
            filter = filter ?? new PropertyQueryFilter();
            return propertySvr.GetResult(filter);
        }
    }
}