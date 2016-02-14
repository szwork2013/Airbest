namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductSpecial")]
    public partial class ProductSpecial
    {
        public Guid Id { get; set; }

        public Guid? ProductId { get; set; }

        public int Index { get; set; }
    }
}
