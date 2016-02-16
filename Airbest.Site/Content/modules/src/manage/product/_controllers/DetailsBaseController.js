var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsBaseController = (function () {
            function ManageProductDetailsBaseController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.model = null;
                this.product = $scope["product"];
                this.model = this.product;
                //this.model = {
                //    name: this.product.name,
                //};
            }
            ManageProductDetailsBaseController.prototype.submit = function () {
                this.$product.update(this.product.id, this.model).then(function (r) {
                    alert("更新成功");
                    //angular.extend(this.product, this.model);
                });
            };
            return ManageProductDetailsBaseController;
        }());
        manage.$module.directive("productDetailsBase", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-base.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsBaseController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsBaseController.js.map