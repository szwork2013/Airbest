
module app.manage {

    class ManageProductCreateController {

        public model: any;

        constructor(
            private $location: ng.ILocationService,
            private $product: app.services.ProductService
        ) {
            this.model = {};
        }

        public submit() {
            this.$product.create(this.model).then(r => {
                let u = "product/details?id=" + r.id;
                this.$location.url(u).replace();
            });
        }
    }

    $module.controller("ManageProductCreateController", ManageProductCreateController);
}