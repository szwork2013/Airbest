namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductProperty")]
    public partial class ProductProperty
    {
        public Guid Id { get; set; }

        public Guid? ProductId { get; set; }

        public int Index { get; set; }

        [StringLength(50)]
        public string Type { get; set; }


        public string Name { get; set; }

        public string Desc { get; set; }


        [StringLength(50)]
        public string Unit1 { get; set; }

        [StringLength(50)]
        public string Unit2 { get; set; }

        public string XData { get; set; }
    }
}
