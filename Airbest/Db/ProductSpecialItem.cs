namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductSpecialItem")]
    public partial class ProductSpecialItem
    {
        public Guid Id { get; set; }

        public Guid? SpecialId { get; set; }

        public string Name { get; set; }

        public int Index { get; set; }
    }
}
