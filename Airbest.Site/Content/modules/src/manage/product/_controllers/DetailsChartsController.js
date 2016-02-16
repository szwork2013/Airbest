var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsChartsController = (function () {
            function ManageProductDetailsChartsController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.props = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.load();
            }
            ManageProductDetailsChartsController.prototype.submit = function () {
                if (confirm("确认要保存对型号规格的修改吗?")) {
                }
            };
            ManageProductDetailsChartsController.prototype.load = function () {
                var _this = this;
                var filter = {
                    productId: this.product.id,
                    includes: "res,items"
                };
                this.$product.getSpecials(filter).then(function (r) {
                    _this.props = r.data;
                });
            };
            ManageProductDetailsChartsController.prototype.addSpecial = function () {
                this.props.push({});
            };
            ManageProductDetailsChartsController.prototype.addItem = function (prop) {
                prop.items = prop.items || [];
                prop.items.push({});
            };
            ManageProductDetailsChartsController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductDetailsChartsController.prototype.swipe = function (it, arr, step) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    var ii = i + step;
                    if (ii >= 0 && ii < arr.length) {
                        var tmp = arr[ii];
                        arr[ii] = arr[i];
                        arr[i] = tmp;
                    }
                }
            };
            return ManageProductDetailsChartsController;
        }());
        manage.$module.directive("productDetailsCharts", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-charts.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsChartsController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsChartsController.js.map