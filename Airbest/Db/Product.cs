namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        public Guid Id { get; set; }

        public Guid? CategoryId { get; set; }

        public int Index { get; set; }

        public DateTime CreateDate { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }
    }
}
