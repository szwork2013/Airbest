var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsSpecialController = (function () {
            function ManageProductDetailsSpecialController($location, $scope, $product, $http, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.$http = $http;
                this.$ui = $ui;
                this.id = $location.search().id;
                this.$ui.lockFor("加载中", this.load());
            }
            ManageProductDetailsSpecialController.prototype.submit = function () {
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
            ManageProductDetailsSpecialController.prototype.load = function () {
                var _this = this;
                var u1 = "/api/product";
                var f1 = { id: this.id };
                var p1 = this.$http.get(u1, { params: f1 }).then(function (rsp) {
                    _this.product = rsp.data;
                });
                var u2 = "/api/product/special";
                var f2 = { productId: this.id, includes: "res,items" };
                var p2 = this.$http.get(u2, { params: f2 }).then(function (rsp) {
                    var r = rsp.data;
                    _this.specials = r.data;
                });
                return [p1, p2];
            };
            ManageProductDetailsSpecialController.prototype.addSpecial = function () {
                this.specials.push({});
            };
            ManageProductDetailsSpecialController.prototype.addItem = function (special) {
                special.items = special.items || [];
                special.items.push({});
            };
            ManageProductDetailsSpecialController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductDetailsSpecialController.prototype.swipe = function (it, arr, step) {
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
            return ManageProductDetailsSpecialController;
        }());
        manage.$module.controller("ManageProductDetailsSpecialController", ManageProductDetailsSpecialController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=SpecialController.js.map