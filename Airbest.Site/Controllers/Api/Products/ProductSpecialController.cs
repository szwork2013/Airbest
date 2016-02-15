using Airbest.Languages;
using Airbest.Products;
using Airbest.Products.Specials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Airbest.Site.Controllers.Api.Products
{
    [RoutePrefix("api/product/special")]
    public class ProductSpecialController : ApiController
    {
        private readonly SpecialService specialSvr;
        private readonly TextResService textSvr;

        public ProductSpecialController(SpecialService specialSvr, TextResService textSvr)
        {
            this.specialSvr = specialSvr;
            this.textSvr = textSvr;
        }

        [HttpGet]
        [Route("")]
        public dynamic Get([FromUri] SpecialQueryFilter filter)
        {
            filter = filter ?? new SpecialQueryFilter();
            return specialSvr.GetResult(filter);
        }

        [HttpPost]
        [Route("update")]
        public dynamic Update([FromBody] List<Special> specials, Guid productId, bool replace = false)
        {
            specialSvr.Update(productId, specials, replace);
            return new { success = true };
        }
    }
}