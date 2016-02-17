
module app.manage {

    class ManageProductDetailsController {
        public product = null;
        public id = null;
        public tab = null;

        constructor(
            private $location: ng.ILocationService,
            private $product: app.services.ProductService
        ) {
            this.id = $location.search().id;
            this.tab = "base";
            this.load();
        }

        public load() {
            this.$product.get(this.id).then(r => {
                this.product = r;
            });
        }
    }

    $module.controller("ManageProductDetailsController", ManageProductDetailsController);
}