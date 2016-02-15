using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airbest.Db;
using Airbest.Languages;
using Meow.Diagnosis;
using Huajie.Practices.Utils;

namespace Airbest.Products.Specials
{
    public class SpecialService
    {
        private readonly Db.AirbestDbContext db;
        private readonly TextResService textSvr;

        public SpecialService(AirbestDbContext db, TextResService textSvr)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            ThrowHelper.ThrowNullArgument(textSvr, nameof(textSvr));

            this.db = db;
            this.textSvr = textSvr;
        }

        public QueryResult<Special> GetResult(SpecialQueryFilter filter)
        {
            ThrowHelper.ThrowNullArgument(filter, nameof(filter));

            var q = from it in db.ProductSpecials
                    where filter.ProductId == null || filter.ProductId == it.ProductId
                    orderby it.Index
                    select it;

            return filter.GetResult(q, dbm => WrapSpecial(dbm, filter.Includes));
        }
 
        private Special WrapSpecial(ProductSpecial dbm, SpecialQueryIncludes includes)
        {
            var r = new Special() {
                Id = dbm.Id,
                Index = dbm.Index,
            };

            if (includes.HasFlag(SpecialQueryIncludes.Res))
                r.Res = textSvr.Get((Guid)r.Id);

            if (includes.HasFlag(SpecialQueryIncludes.Items))
                r.Items = GetItems((Guid)r.Id, includes);

            return r;
        }

        private List<SpecialItem> GetItems(Guid id, SpecialQueryIncludes includes)
        {
            var q = from it in db.ProductSpecialItems
                    where it.SpecialId == id
                    orderby it.Index
                    select new SpecialItem
                    {
                        Id = it.Id,
                        Name = it.Name,
                        Index = it.Index,
                    };

            var r = q.ToList();
            if (includes.HasFlag(SpecialQueryIncludes.Res))
                foreach (var it in r)
                    it.Res = textSvr.Get((Guid)it.Id);
   
            return r;
        }

        public void Update(Guid productId, List<Special> specials, bool replace = false)
        {
            ThrowHelper.ThrowNullArgument(specials, nameof(specials));

            using (var trans = db.Database.BeginTransaction())
            {
                ThrowHelper.ThrowNullArgument(specials, nameof(specials));

                // 现有项
                var old = db.ProductSpecials.Where(it => it.ProductId == productId)
                    .ToDictionary(it => it.Id);

                // 需要更新的项
                var nnn = specials.Where(it => it.Id != null)
                    .ToDictionary(it => it.Id.Value);

                // 对比2个集合: 更新
                foreach (var np in nnn)
                {
                    Db.ProductSpecial dbm = null;
                    old.TryGetValue(np.Key, out dbm);
                    Update(np.Value, dbm, productId, replace);
                }

                // 添加新项.
                foreach (var n in specials.Where(it => it.Id == null))
                    Update(n, null, productId, replace);

                // 删除
                if (replace)
                {
                    db.ProductSpecials.RemoveRange(
                        from op in old
                        where !nnn.ContainsKey(op.Key)
                        select op.Value
                        );
                }

                db.SaveChanges();
                trans.Commit();
            }
        }

        private void Update(Special special, Db.ProductSpecial dbm, Guid productId, bool replace)
        {
            if (dbm == null)
            {
                dbm = new ProductSpecial();
                dbm.Id = special.Id ?? Guid.NewGuid();
                dbm.ProductId = productId;
                db.ProductSpecials.Add(dbm);
            }

            dbm.Index = special.Index;

            if (special.Res != null)
                textSvr.Update(dbm.Id, special.Res);

            if (special.Items != null)
                UpdateItems(dbm.Id, special.Items, replace);
        }

        private void UpdateItems(Guid specialId, List<SpecialItem> items, bool replace)
        {
            // 现有项
            var old = db.ProductSpecialItems.Where(it => it.SpecialId == specialId)
                .ToDictionary(it => it.Id);

            // 需要更新的项
            var nnn = items.Where(it => it.Id != null)
                .ToDictionary(it => it.Id.Value);

            // 对比2个集合: 更新
            foreach (var np in nnn)
            {
                Db.ProductSpecialItem dbm = null;
                old.TryGetValue(np.Key, out dbm);
                UpdateItem(np.Value, dbm, specialId);
            }

            // 添加新项.
            foreach (var n in items.Where(it => it.Id == null))
                UpdateItem(n, null, specialId);

            // 删除
            if (replace)
            {
                db.ProductSpecialItems.RemoveRange(
                    from op in old
                    where !nnn.ContainsKey(op.Key)
                    select op.Value
                    );
            }
        }

        private void UpdateItem(SpecialItem item, ProductSpecialItem dbm, Guid specialId)
        {
            if (dbm == null)
            {
                dbm = new ProductSpecialItem();
                dbm.Id = item.Id ?? Guid.NewGuid();
                dbm.SpecialId = specialId;
                db.ProductSpecialItems.Add(dbm);
            }

            dbm.Index = item.Index;
            dbm.Name = item.Name;

            if (item.Res != null)
                textSvr.Update(dbm.Id, item.Res);
        }
    }
}
