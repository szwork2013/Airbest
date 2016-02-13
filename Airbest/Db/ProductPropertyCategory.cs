namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductPropertyCategory")]
    public partial class ProductPropertyCategory
    {
        public Guid Id { get; set; }

        public int Index { get; set; }
    }
}
