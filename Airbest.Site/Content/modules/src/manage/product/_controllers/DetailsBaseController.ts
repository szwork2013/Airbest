
module app.manage {

    class ManageProductDetailsBaseController {
        public product = null;
        public model = null;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $product: app.services.ProductService
        ) {
            this.product = $scope["product"];
            this.model = this.product;
            //this.model = {
            //    name: this.product.name,
            //};
        }

        public submit() {
            this.$product.update(this.product.id, this.model).then(r => {
                alert("更新成功");
                //angular.extend(this.product, this.model);
            });
        }
    }

    $module.directive("productDetailsBase", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-base.html?v=" + buildNumber,
            restrict: "E",
            replace: true,
            controller: ManageProductDetailsBaseController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}