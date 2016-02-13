
module app.main {

    export class ProductDetailsController {
        public product;

        constructor(
            public $ui: app.services.UIService,
            public $product: app.services.ProductService,
            public $location: ng.ILocationService,
            public $sce: ng.ISCEService
        ) {
            let id = $location.search().id;
            this.load(id);
        }

        public load(id) {
            this.$ui.acc(() => {
                return this.$product.get(id).then(r => {
                    this.product = r;
                    this.product.content = this.$sce.trustAsHtml(this.product.content);
                });
            });
        }
    }

    $module.controller("ProductDetailsController", ProductDetailsController);
}