namespace Airbest.Db
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=Model11")
        {
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Product_Res> Product_Res { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductCategory_Res> ProductCategory_Res { get; set; }
        public virtual DbSet<ProductProperty> ProductProperties { get; set; }
        public virtual DbSet<ProductProperty_Res> ProductProperty_Res { get; set; }
        public virtual DbSet<ProductPropertyCategory> ProductPropertyCategories { get; set; }
        public virtual DbSet<ProductPropertyCategory_Res> ProductPropertyCategory_Res { get; set; }
        public virtual DbSet<ProductSpecial> ProductSpecials { get; set; }
        public virtual DbSet<ProductSpecial_Res> ProductSpecial_Res { get; set; }
        public virtual DbSet<ProductSpecialItem> ProductSpecialItems { get; set; }
        public virtual DbSet<ProductSpecialItem_Res> ProductSpecialItem_Res { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
