
module app.manage {

    class ManageProductDetailsBaseController {
        public model;
        public product;
        public id;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $product: app.services.ProductService,
            private $ui: app.services.UIService
        ) {
            this.id = $location.search().id;
            let q = this.load();
            this.$ui.lockFor("加载中, 请稍候", q);
        }

        public load() {
            let u = "/api/product/";
            let p = { id: this.id, includes: "res" };
            return this.$http.get<any>(u, { params: p }).then(rsp => {
                this.product = rsp.data;
                this.model = angular.extend({}, this.product);
            });
        }

        public submit() {
            let u = "/api/product/update";
            let q = this.$http.post<any>(u, this.model);
            this.$ui.lockFor("正在保存", q);
        }
    }

    $module.controller("ManageProductDetailsBaseController", ManageProductDetailsBaseController);
}