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
        private readonly TextResService textSvr;

        public ProductController(ProductService productSvr, TextResService textSvr)
        {
            this.productSvr = productSvr;
            this.textSvr = textSvr;
        }

        [HttpPost]
        [Route("create")]
        public dynamic Create([FromBody]ProductCreateModel m)
        {
            return this.productSvr.Create(m);
        }

        [HttpPost]
        [Route("{id:guid}/update")]
        public dynamic Update(Guid id, [FromBody]ProductUpdateModel m)
        {
            this.productSvr.Update(id, m);
            return new { success = true };
        }


        #region res

        [HttpPost]
        [Route("{id:guid}/update-res")]
        public dynamic UpdateRes(Guid id, [FromBody]Dictionary<string, Dictionary<string, string>> m)
        {
            textSvr.Update(id, m);
            return new { success = true };
        }

        [HttpGet]
        [Route("{id:guid}/res")]
        public dynamic GetRes(Guid id)
        {
            return textSvr.Get(id);
        }

        #endregion

        [HttpGet]
        [Route("")]
        public dynamic Get([FromUri]ProductQueryFilter filter)
        {
            filter = filter ?? new ProductQueryFilter();
            return this.productSvr.GetResult(filter);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public dynamic Get(Guid id)
        {
            return this.productSvr.Get(id);
        }
    }
}