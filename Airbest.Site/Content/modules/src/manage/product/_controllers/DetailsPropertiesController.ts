
module app.manage {

    class ManageProductPropertiesInfoController {
        public product = null;
        public model = null;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $product: app.services.ProductService
        ) {
            this.product = $scope["product"];
            this.model = {
                id: this.product.id,
                name: this.product.name,
            };
        }

        public submit() {
            console.log(this.product.id, this.model);
            this.$product.update(this.product.id, this.model).then(r => {
                alert("更新成功");
                angular.extend(this.product, this.model);
            });
        }
    }

    $module.directive("productDetailsProperties", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-properties.html",
            restrict: "E",
            replace: true,
            controller: ManageProductPropertiesInfoController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}