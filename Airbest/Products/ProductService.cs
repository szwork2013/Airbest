using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airbest.Db;
using Meow.Diagnosis;
using Airbest.Products.Specials;
using Huajie.Practices.Models;
using Airbest.Languages;

namespace Airbest.Products
{
    public class ProductService
    {
        private readonly Db.AirbestDbContext db;
        private readonly TextResService textSvr;

        public ProductService(AirbestDbContext db, TextResService textSvr)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            ThrowHelper.ThrowNullArgument(textSvr, nameof(textSvr));

            this.db = db;
            this.textSvr = textSvr;
        }

        /// <summary>
        /// TODO: 创建产品
        /// </summary>
        /// <returns></returns>
        public Product Create(ProductCreateModel createModel)
        {
            ThrowHelper.ThrowNullArgument(createModel, nameof(createModel));

            var dbm = new Db.Product()
            {
                Id = Guid.NewGuid(),
                CreateDate = DateTime.Now,
                CategoryId = createModel.CategoryId,
                Index = 0,
                Name = createModel.Name,
            };

            db.Products.Add(dbm);
            db.SaveChanges();
            return WrapProduct(dbm);
        }

        /// <summary>
        /// 更新商品基本属性.
        /// </summary>
        /// <param name="updateModel"></param>
        public void Update(Guid id, ProductUpdateModel updateModel)
        {
            ThrowHelper.ThrowNullArgument(updateModel, nameof(updateModel));

            var dbm = FindDbProduct(id);
            dbm.Name = updateModel.Name;
            dbm.CategoryId = updateModel.CategoryId;
            dbm.SkuNameFormat = updateModel.SkuNameFormat;

            db.SaveChanges();
        }

        private Product WrapProduct(Db.Product dbm, ProductQueryIncludes includes = ProductQueryIncludes.None)
        {
            var r = new Product()
            {
                Id = dbm.Id,
                Name = dbm.Name,
                CategroyId = dbm.CategoryId,
                CreateDate = dbm.CreateDate,
                Index = dbm.Index,
                SkuNameFormat = dbm.SkuNameFormat,
            };

            return r;
        }

        /// <summary>
        /// TODO: 删除产品
        /// </summary>
        /// <returns></returns>
        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// TODO: 查询商品
        /// </summary>
        /// <returns></returns>
        public Product Get(Guid id, bool throwIfNull = true)
        {
            var dbm = FindDbProduct(id, throwIfNull);
            return dbm == null ? null : WrapProduct(dbm);
        }

        private Db.Product FindDbProduct(Guid id, bool throwIfNull = true)
        {
            var dbm = db.Products.Find(id);
            ThrowHelper.ThrowIf(dbm == null && throwIfNull, "未能找到Product, id=" + id);
            return dbm;
        }

        /// <summary>
        /// 查询商品列表
        /// </summary>
        /// <returns></returns>
        public QueryResult<Product> GetResult(ProductQueryFilter filter)
        {
            ThrowHelper.ThrowNullArgument(filter, nameof(filter));

            var q = from it in db.Products
                    orderby it.Index, it.CreateDate
                    select it;

            return filter.GetResult(q, dbm => WrapProduct(dbm));
        }
    }
}
