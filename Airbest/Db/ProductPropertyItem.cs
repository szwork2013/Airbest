namespace Airbest.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ProductPropertyItem
    {
        public Guid Id { get; set; }

        public Guid? PropertyId { get; set; }

        [StringLength(50)]
        public string Model { get; set; }

        public int Index { get; set; }

        public double? Float1 { get; set; }
        public double? Float2 { get; set; }
        public double? Float3 { get; set; }

        public string Text { get; set; }

        public string Data { get; set; }

        public string Name { get; set; }
    }
}
