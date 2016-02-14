var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductPropertiesInfoController = (function () {
            function ManageProductPropertiesInfoController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.model = null;
                this.product = $scope["product"];
                this.model = {
                    id: this.product.id,
                    name: this.product.name,
                };
            }
            ManageProductPropertiesInfoController.prototype.submit = function () {
                var _this = this;
                console.log(this.product.id, this.model);
                this.$product.update(this.product.id, this.model).then(function (r) {
                    alert("更新成功");
                    angular.extend(_this.product, _this.model);
                });
            };
            return ManageProductPropertiesInfoController;
        }());
        manage.$module.directive("productDetailsProperties", function () {
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
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
