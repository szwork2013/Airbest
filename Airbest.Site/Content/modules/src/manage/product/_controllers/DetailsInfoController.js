var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsInfoController = (function () {
            function ManageProductDetailsInfoController($location, $scope, $product) {
                var _this = this;
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.model = null;
                this.product = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.$product.getRes(this.product.id).then(function (r) {
                    _this.model = r;
                    _.forEach(_this.langs, function (lang) {
                        _this.model[lang.code] = _this.model[lang.code] || {};
                    });
                });
            }
            ManageProductDetailsInfoController.prototype.submit = function () {
                this.$product.updateRes(this.product.id, this.model).then(function (r) {
                    alert("更新成功");
                });
            };
            return ManageProductDetailsInfoController;
        }());
        manage.$module.directive("productDetailsInfo", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-info.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsInfoController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsInfoController.js.map