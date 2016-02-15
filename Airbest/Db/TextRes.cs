namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TextRes")]
    public partial class TextRes
    {
        [Key]
        [Column(Order = 0)]
        public Guid OwnerId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string Language { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string Name { get; set; }

        public string Value { get; set; }
    }
}
