namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product_Res
    {
        [Key]
        [Column(Order = 0)]
        public Guid OwnerId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string Language { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public string Desc { get; set; }
    }
}
