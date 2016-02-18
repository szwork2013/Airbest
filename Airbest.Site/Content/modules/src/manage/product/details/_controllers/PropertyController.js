var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsPropertyController = (function () {
            function ManageProductDetailsPropertyController($location, $scope, $http, $product, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$http = $http;
                this.$product = $product;
                this.$ui = $ui;
                this.id = $location.search().id;
                this.$ui.lockFor("加载中", this.load());
            }
            ManageProductDetailsPropertyController.prototype.load = function () {
                var _this = this;
                var u1 = "/api/product";
                var f1 = { id: this.id };
                var p1 = this.$http.get("/api/product", { params: f1 }).then(function (rsp) {
                    _this.product = rsp.data;
                });
                var u2 = "/api/product/property";
                var f2 = { productId: this.id, includes: "res,items" };
                var p2 = this.$http.get(u2, { params: f2 }).then(function (rsp) {
                    var r = rsp.data;
                    _this.props = r.data;
                });
                return [p1, p2];
            };
            ManageProductDetailsPropertyController.prototype.submit = function () {
                if (!confirm("确认要保存对型号规格的修改吗?"))
                    return;
                this.updateIndexAndData();
                var u = "/api/product/property/replace-all";
                var f = { productId: this.id };
                var q = this.$http.post(u, this.props, { params: f });
                this.$ui.lockFor("正在保存", q).then(function (r) {
                    alert("保存成功");
                });
            };
            ManageProductDetailsPropertyController.prototype.initChartProp = function (prop) {
                prop.xData = prop.xData || "0,10,20,30,40,50,60,70,80,90";
                if (!prop._xArr)
                    prop._xArr = prop.xData.split(",");
            };
            ManageProductDetailsPropertyController.prototype.initChartItem = function (item) {
                if (!item._arr)
                    item._arr = item.data ? item.data.split(",") : [];
            };
            /**
             * updateIndex:
             *      更新列表的index属性
             */
            ManageProductDetailsPropertyController.prototype.updateIndexAndData = function () {
                _.forEach(this.props, function (prop, i) {
                    prop.index = i;
                    if (prop.type == 'chart') {
                        prop.xData = prop._xArr && prop._xArr.join(',');
                    }
                    _.forEach(prop.items || [], function (item, ii) {
                        item.index = ii;
                        if (prop.type == 'chart')
                            item.data = item._arr && item._arr.join(',');
                    });
                });
            };
            ManageProductDetailsPropertyController.prototype.addProp = function () {
                this.props.push({ type: "scalar" });
            };
            ManageProductDetailsPropertyController.prototype.addItem = function (prop) {
                prop.items = prop.items || [];
                prop.items.push({});
            };
            ManageProductDetailsPropertyController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductDetailsPropertyController.prototype.swipe = function (it, arr, step) {
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
            return ManageProductDetailsPropertyController;
        }());
        manage.$module.controller("ManageProductDetailsPropertyController", ManageProductDetailsPropertyController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=PropertyController.js.map