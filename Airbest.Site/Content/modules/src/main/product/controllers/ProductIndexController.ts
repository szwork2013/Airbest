
module app.main {

    export class ProductIndexController {
        public products: any[] = [];
        public hasMore = true;
        public filter: any = {};
        public loading = false;

        constructor(
            public $town: app.services.TownService,
            public $rootScope: ng.IRootScopeService,
            public $ui: app.services.UIService,
            public $product: app.services.ProductService,
            public $location: ng.ILocationService
        ) {
            this.filter.townId = $location.search().townId;
            this.load();

            if (this.filter.townId) {
                this.$town.get(this.filter.townId).then(r => {
                    this.$rootScope["pageTitle"] = r.name + "农产品";
                });
            }
        }

        public load() {
            if (this.loading || !this.hasMore)
                return;

            this.loading = true;
            this.$ui.acc(() => {
                this.filter.take = 40;
                this.filter.skip = this.products.length;
                this.filter.includes = "town";

                return this.$product.getList(this.filter).then(r => {
                    Array.prototype.push.apply(this.products, r.data);
                    if (!r.data.length)
                        this.hasMore = false;
                });
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    $module.controller("ProductIndexController", ProductIndexController);
}