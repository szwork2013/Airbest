using Airbest.Languages;
using Airbest.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Airbest.Site.Controllers.Api.Products
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private readonly ProductService productSvr;

        public ProductController(ProductService productSvr)
        {
            this.productSvr = productSvr;
        }

        [HttpGet]
        [Route("")]
        public dynamic Get(Guid id,
            ProductQueryIncludes includes = ProductQueryIncludes.None)
        {
            return this.productSvr.Get(id, includes);
        }

        [HttpGet]
        [Route("")]
        public dynamic Get([FromUri]ProductQueryFilter filter)
        {
            filter = filter ?? new ProductQueryFilter();
            return this.productSvr.GetResult(filter);
        }

        [HttpPost]
        [Route("create")]
        public dynamic Create([FromBody]Product m)
        {
            return new
            {
                id = this.productSvr.Create(m)
            };
        }

        [HttpPost]
        [Route("update")]
        public dynamic Update([FromBody]Product m)
        {
            this.productSvr.Update(m);
            return new { success = true };
        }
    }
}