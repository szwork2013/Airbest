using Airbest.Db;
using Huajie.Practices.Models;
using Meow.Diagnosis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airbest.Languages
{
    public class TextResService
    {
        private readonly Db.AirbestDbContext db;

        public TextResService(AirbestDbContext db)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            this.db = db;
        }

        public Dictionary<string, Dictionary<string, string>> Get(Guid ownerId)
        {
            var r = new Dictionary<string, Dictionary<string, string>>();
            var q = from it in db.TextRes
                    where it.OwnerId == ownerId
                    group it by it.Language into its
                    select its;

            foreach (var group in q)
                r[group.Key] = group.ToDictionary(it => it.Name, it => it.Value);

            return r;
        }

        public void Update(Guid ownerId, Dictionary<string, Dictionary<string, string>> form, bool replace = false)
        {
            var old = db.TextRes
                .ToDictionary(it => Tuple.Create(it.OwnerId, it.Language, it.Name));

            var nnn = ParseListFromForm(ownerId, form)
                .ToDictionary(it => Tuple.Create(it.OwnerId, it.Language, it.Name));

            // 对比2个集合, 添加&更新项
            foreach (var np in nnn)
            {
                TextRes dbm = null;
                if (!old.TryGetValue(np.Key, out dbm))
                {   // 添加.
                    dbm = new TextRes();
                    dbm.OwnerId = np.Value.OwnerId;
                    dbm.Language = np.Value.Language;
                    dbm.Name = np.Value.Name;
                    db.TextRes.Add(dbm);
                }

                dbm.Value = np.Value.Value;
            }

            // 删除
            if (replace)
            {
                var q = from op in old
                        where !nnn.ContainsKey(op.Key)
                        select op.Value;

                db.TextRes.RemoveRange(q);
            }

            db.SaveChanges();
        }

        private List<TextRes> ParseListFromForm(Guid ownerId, Dictionary<string, Dictionary<string, string>> form)
        {
            var r = new List<TextRes>();
            foreach (var langGroup in form)
            {
                var lang = langGroup.Key;
                foreach (var valueGroup in langGroup.Value)
                {
                    var name = valueGroup.Key;
                    var value = valueGroup.Value;

                    r.Add(new TextRes()
                    {
                        OwnerId = ownerId,
                        Name = name,
                        Value = value,
                        Language = lang
                    });
                }
            }

            return r;
        }
    }
}
