
module app.manage {

    class ManageProductIndexController {
        public products = null;
        constructor(
            private $location: ng.ILocationService,
            private $product: app.services.ProductService
        ) {
            this.load();
        }

        public load() {
            this.$product.getList({}).then(r => {
                this.products = r.data;
            });
        }
    }

    $module.controller("ManageProductIndexController", ManageProductIndexController);
}