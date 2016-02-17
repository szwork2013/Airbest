var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductSkusInfoController = (function () {
            function ManageProductSkusInfoController($location, $scope, $product, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.$ui = $ui;
                this.product = null;
                this.specials = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.load();
            }
            ManageProductSkusInfoController.prototype.submit = function () {
                var _this = this;
                if (confirm("确认要保存对型号规格的修改吗?")) {
                    // sort
                    _.forEach(this.specials, function (special, i) {
                        special.index = i;
                        _.forEach(special.items || [], function (item, ii) {
                            item.index = ii;
                        });
                    });
                    var q = this.$product.updateSpecials(this.product.id, this.specials).then(function (r) {
                        return _this.load();
                    });
                    this.$ui.lockFor("正在保存", q).then(function (r) {
                        alert("保存成功");
                    });
                }
            };
            ManageProductSkusInfoController.prototype.load = function () {
                var _this = this;
                var filter = {
                    productId: this.product.id,
                    includes: "res,items"
                };
                return this.$product.getSpecials(filter).then(function (r) {
                    _this.specials = r.data;
                });
            };
            ManageProductSkusInfoController.prototype.addSpecial = function () {
                this.specials.push({});
            };
            ManageProductSkusInfoController.prototype.addItem = function (special) {
                special.items = special.items || [];
                special.items.push({});
            };
            ManageProductSkusInfoController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductSkusInfoController.prototype.swipe = function (it, arr, step) {
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
            return ManageProductSkusInfoController;
        }());
        manage.$module.directive("productDetailsSkus", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-skus.html?v=" + buildNumber,
                restrict: "E",
                replace: true,
                controller: ManageProductSkusInfoController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
