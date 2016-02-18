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
using System.IO;

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

        public Product Get(Guid id, ProductQueryIncludes includes = ProductQueryIncludes.None, bool throwIfNull = true)
        {
            var dbm = FindDbm(id, throwIfNull);
            return dbm == null ? null : FromDbm(dbm, includes);
        }

        public QueryResult<Product> GetResult(ProductQueryFilter filter)
        {
            ThrowHelper.ThrowNullArgument(filter, nameof(filter));

            var q = from it in db.Products
                    orderby it.Index, it.CreateDate
                    select it;

            return filter.GetResult(q, dbm => FromDbm(dbm, includes: filter.Includes));
        }

        public Guid Create(Product product)
        {
            ThrowHelper.ThrowNullArgument(product, nameof(product));
            var dbm = CreateDbm(product);

            UpdateDbm(dbm, product);
            db.Products.Add(dbm);
            db.SaveChanges();

            return dbm.Id;
        }

        public void Update(Product product)
        {
            ThrowHelper.ThrowNullArgument(product, nameof(product));
            ThrowHelper.ThrowNullArgument(product.Id, $"{nameof(product)}.{nameof(product.Id)}");
            var dbm = FindDbm((Guid)product.Id);

            UpdateDbm(dbm, product);
            db.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var dbm = FindDbm(id, false);
            if (dbm != null)
            {
                db.Products.Remove(dbm);
                db.SaveChanges();
            }
        }

        #region privates

        private Db.Product FindDbm(Guid id, bool throwIfNull = true)
        {
            var dbm = db.Products.Find(id);
            ThrowHelper.ThrowIf(dbm == null && throwIfNull, "未能找到Product, id=" + id);
            return dbm;
        }

        private void UpdateDbm(Db.Product dbm, Product product)
        {
            dbm.Name = product.Name;
            dbm.CategoryId = product.CategoryId;
            dbm.ImageUrl = product.ImageUrl;
            dbm.Index = product.Index;

            if (product.Res != null)
                textSvr.Update(dbm.Id, product.Res);
        }

        private Db.Product CreateDbm(Product product)
        {
            return new Db.Product()
            {
                Id = Guid.NewGuid(),
            };
        }

        private Product FromDbm(Db.Product dbm, ProductQueryIncludes includes)
        {
            var product = new Product()
            {
                Id = dbm.Id,
                Name = dbm.Name,
                CategoryId = dbm.CategoryId,
                Index = dbm.Index,
                ImageUrl = dbm.ImageUrl
            };

            if (includes.HasFlag(ProductQueryIncludes.Res))
                product.Res = textSvr.Get((Guid)product.Id);

            return product;
        }

        #endregion
    }
}
