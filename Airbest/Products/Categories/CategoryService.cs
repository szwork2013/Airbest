using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Airbest.Db;
using Meow.Diagnosis;
using Airbest.Languages;
using Huajie.Practices.Utils;

namespace Airbest.Products.Categories
{
    public class CategoryService
    {
        private readonly Db.AirbestDbContext db;

        public CategoryService(AirbestDbContext db)
        {
            ThrowHelper.ThrowNullArgument(db, nameof(db));
            this.db = db;
        }

        public QueryResult<Category> GetResult()
        {
            return null;
        }

        public void ReplaceAll(List<Category> categories)
        {
        }
    }
}
