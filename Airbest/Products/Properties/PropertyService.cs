using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airbest.Db;
using Huajie.Practices.Utils;
using Meow.Diagnosis;
using Airbest.Languages;

namespace Airbest.Products.Properties
{
    public class PropertyService
    {
        private Db.AirbestDbContext db { get; set; }
        private readonly TextResService textSvr;

        public PropertyService(AirbestDbContext db, TextResService textSvr)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            ThrowHelper.ThrowNullArgument(textSvr, nameof(textSvr));

            this.db = db;
            this.textSvr = textSvr;
        }

        public QueryResult<Property> GetResult(PropertyQueryFilter filter)
        {
            ThrowHelper.ThrowNullArgument(filter, nameof(filter));

            var q = from it in db.ProductProperties
                    where filter.ProductId == null || filter.ProductId == it.ProductId
                    orderby it.Index
                    select it;

            return filter.GetResult(q, dbm => WrapProperty(dbm, filter.Includes));
        }

        private Property WrapProperty(ProductProperty dbm, PropertyQueryIncludes includes)
        {
            var r = new Property()
            {
                Id = dbm.Id,
                Index = dbm.Index,
                Name = dbm.Name,
                Desc = dbm.Desc,
                Type = dbm.Type,
                Unit1 = dbm.Unit1,
                Unit2 = dbm.Unit2,
            };

            if (includes.HasFlag(PropertyQueryIncludes.Res))
                r.Res = textSvr.Get((Guid)r.Id);

            if (includes.HasFlag(PropertyQueryIncludes.Items))
                r.Items = GetItems((Guid)r.Id, includes);

            return r;
        }

        private List<PropertyItem> GetItems(Guid id, PropertyQueryIncludes includes)
        {
            var q = from it in db.ProductPropertyItems
                    where it.PropertyId == id
                    orderby it.Index
                    select new PropertyItem
                    {
                        Id = it.Id,
                        Name = it.Name,
                        Index = it.Index,
                        Data = it.Data,
                        Model = it.Model,
                        Float1 = it.Float1,
                        Float2 = it.Float2,
                        Float3 = it.Float3,
                        Text = it.Text,
                    };

            var r = q.ToList();
            if (includes.HasFlag(PropertyQueryIncludes.Res))
                foreach (var it in r)
                    it.Res = textSvr.Get((Guid)it.Id);

            return r;
        }

        public void ReplaceAll(Guid productId, List<Property> properties)
        {
            Update(productId, properties, replace: true);
        }

        private void Update(Guid productId, List<Property> properties, bool replace = false)
        {
            ThrowHelper.ThrowNullArgument(properties, nameof(properties));

            using (var trans = db.Database.BeginTransaction())
            {
                ThrowHelper.ThrowNullArgument(properties, nameof(properties));

                // 现有项
                var old = db.ProductProperties.Where(it => it.ProductId == productId)
                    .ToDictionary(it => it.Id);

                // 需要更新的项
                var nnn = properties.Where(it => it.Id != null)
                    .ToDictionary(it => it.Id.Value);

                // 对比2个集合: 更新
                foreach (var np in nnn)
                {
                    Db.ProductProperty dbm = null;
                    old.TryGetValue(np.Key, out dbm);
                    Update(np.Value, dbm, productId, replace);
                }

                // 添加新项.
                foreach (var n in properties.Where(it => it.Id == null))
                    Update(n, null, productId, replace);

                // 删除
                if (replace)
                {
                    db.ProductProperties.RemoveRange(
                        from op in old
                        where !nnn.ContainsKey(op.Key)
                        select op.Value
                        );
                }

                db.SaveChanges();
                trans.Commit();
            }
        }

        private void Update(Property prop, Db.ProductProperty dbm, Guid productId, bool replace)
        {
            if (dbm == null)
            {
                dbm = new ProductProperty();
                dbm.Id = prop.Id ?? Guid.NewGuid();
                dbm.ProductId = productId;
                db.ProductProperties.Add(dbm);
            }

            dbm.Index = prop.Index;
            dbm.Name = prop.Name;
            dbm.Desc = prop.Desc;
            dbm.Type = prop.Type;
            dbm.Unit1 = prop.Unit1;
            dbm.Unit2 = prop.Unit2;

            if (prop.Res != null)
                textSvr.Update(dbm.Id, prop.Res);

            if (prop.Items != null)
                UpdateItems(dbm.Id, prop.Items, replace);
        }

        private void UpdateItems(Guid specialId, List<PropertyItem> items, bool replace)
        {
            // 现有项
            var old = db.ProductPropertyItems.Where(it => it.PropertyId == specialId)
                .ToDictionary(it => it.Id);

            // 需要更新的项
            var nnn = items.Where(it => it.Id != null)
                .ToDictionary(it => it.Id.Value);

            // 对比2个集合: 更新
            foreach (var np in nnn)
            {
                Db.ProductPropertyItem dbm = null;
                old.TryGetValue(np.Key, out dbm);
                UpdateItem(np.Value, dbm, specialId);
            }

            // 添加新项.
            foreach (var n in items.Where(it => it.Id == null))
                UpdateItem(n, null, specialId);

            // 删除
            if (replace)
            {
                db.ProductPropertyItems.RemoveRange(
                    from op in old
                    where !nnn.ContainsKey(op.Key)
                    select op.Value
                    );
            }
        }

        private void UpdateItem(PropertyItem item, ProductPropertyItem dbm, Guid specialId)
        {
            if (dbm == null)
            {
                dbm = new ProductPropertyItem();
                dbm.Id = item.Id ?? Guid.NewGuid();
                dbm.PropertyId = specialId;
                db.ProductPropertyItems.Add(dbm);
            }

            dbm.Index = item.Index;
            dbm.Name = item.Name;
            dbm.Model = item.Model;
            dbm.Float1 = item.Float1;
            dbm.Float2 = item.Float2;
            dbm.Float3 = item.Float3;

            dbm.Text = item.Text;
            dbm.Data = item.Data;

            if (item.Res != null)
                textSvr.Update(dbm.Id, item.Res);
        }
    }
}
