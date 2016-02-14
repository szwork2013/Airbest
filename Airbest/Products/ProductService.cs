using Huajie.Practices.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airbest.Db;
using Meow.Diagnosis;
using Airbest.Products.Specials;

namespace Airbest.Products
{
    public class ProductService
    {
        private readonly Db.AirbestDbContext db;

        public ProductService(AirbestDbContext db)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            this.db = db;
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

        public void UpdateSpecials(Guid id, IEnumerable<Special> specials, BulkUpdateActions actions)
        {
            ThrowHelper.ThrowNullArgument(specials, nameof(specials));
            int changed = 0;

            var q = from it in db.ProductSpecials
                    where it.ProductId == id
                    orderby it.Index
                    select it;

            var dbmMap = q.ToDictionary(it => it.Id);

            foreach (var special in specials)
            {
                Db.ProductSpecial dbm = null;

                if (actions.HasFlag(BulkUpdateActions.Add) || (
                        actions.HasFlag(BulkUpdateActions.Update)
                        && special.Id != null
                        && dbmMap.TryGetValue((Guid)special.Id, out dbm)))
                {
                    dbm = CreateOrUpdateSpecialDbm(special, dbm, id);
                    ++changed;
                }
            }

            if (actions.HasFlag(BulkUpdateActions.Remove))
                foreach (var dbm in dbmMap.Values.Where(dbm => specials.All(s => s.Id != dbm.Id)))
                    db.ProductSpecials.Remove(dbm);
        }

        private Db.ProductSpecial CreateOrUpdateSpecialDbm(Special updateModel, Db.ProductSpecial dbm, Guid productId)
        {
            if (dbm == null)
            {
                dbm = db.ProductSpecials.Add(
                    new ProductSpecial()
                    {
                        Id = updateModel.Id ?? Guid.NewGuid(),
                        ProductId = productId
                    });
            }

            dbm.Index = dbm.Index;
            if (updateModel.Res)
            {
            }

            return dbm;
        }

        /// <summary>
        /// get res
        /// </summary>
        /// <param name="id">商品id</param>
        public Dictionary<string, Res.ProductRes> GetRes(Guid id)
        {
            var q = from it in db.Product_Res
                    where it.OwnerId == id
                    select it;

            return q.ToDictionary(
                dbm => dbm.Language, 
                dbm => WrapProductRes(dbm)
                );
        }

        private Res.ProductRes WrapProductRes(Product_Res dbm)
        {
            return new Res.ProductRes
            {
                Name = dbm.Name,
                Desc = dbm.Desc
            };
        }

        /// <summary>
        /// 更新商品基本属性.
        /// </summary>
        /// <param name="resMap"></param>
        public void UpdateRes(Guid id,Dictionary<string, Res.ProductRes> resMap)
        {
            ThrowHelper.ThrowNullArgument(resMap, nameof(resMap));

            foreach (var pair in resMap)
            {
                var dbm = db.Product_Res.Find(id, pair.Key);
                if (dbm == null)
                {
                    dbm = new Product_Res()
                    {
                        OwnerId = id,
                        Language = pair.Key
                    };

                    db.Product_Res.Add(dbm);
                }

                dbm.Name = pair.Value.Name;
                dbm.Desc = pair.Value.Desc;
            }

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
        /// TODO: 查询商品列表
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
