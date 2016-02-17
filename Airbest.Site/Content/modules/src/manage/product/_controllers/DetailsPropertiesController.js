var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductPropertiesInfoController = (function () {
            function ManageProductPropertiesInfoController($location, $scope, $http, $product, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$http = $http;
                this.$product = $product;
                this.$ui = $ui;
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
            /**
             * submit:
             *      提交
             */
            ManageProductPropertiesInfoController.prototype.submit = function () {
                var _this = this;
                if (!confirm("确认要保存对型号规格的修改吗?"))
                    return;
                this.updateIndexAndData();
                var u = "/api/product/property/replace-all";
                var f = { productId: this.product.id };
                var q = this.$http.post(u, this.props, { params: f }).then(function (rsp) {
                    return _this.load();
                });
                this.$ui.lockFor("正在保存", q).then(function (r) {
                    alert("保存成功");
                });
                ;
            };
            ManageProductPropertiesInfoController.prototype.initChartProp = function (prop) {
                prop.xData = prop.xData || "0,10,20,30,40,50,60,70,80,90";
                if (!prop._xArr) {
                    prop._xArr = prop.xData.split(",");
                }
            };
            ManageProductPropertiesInfoController.prototype.initChartItem = function (item) {
                if (!item._arr) {
                    item._arr = item.data ? item.data.split(",") : [];
                }
            };
            /**
             * updateIndex:
             *      更新列表的index属性
             */
            ManageProductPropertiesInfoController.prototype.updateIndexAndData = function () {
                // props
                _.forEach(this.props, function (prop, i) {
                    prop.index = i;
                    if (prop.type == 'chart') {
                        prop.xData = prop._xArr && prop._xArr.join(',');
                    }
                    // items
                    _.forEach(prop.items || [], function (item, ii) {
                        item.index = ii;
                        if (prop.type == 'chart')
                            item.data = item._arr && item._arr.join(',');
                    });
                });
            };
            /**
             * load:
             *      加载数据
             */
            ManageProductPropertiesInfoController.prototype.load = function () {
                var _this = this;
                var pid = this.product.id;
                var u = "/api/product/property";
                var f = {
                    productId: pid,
                    includes: "res,items"
                };
                this.props = null;
                return this.$http.get(u, { params: f }).then(function (rsp) {
                    var r = rsp.data;
                    _this.props = r.data;
                });
            };
            ManageProductPropertiesInfoController.prototype.addProp = function () {
                this.props.push({
                    type: "scalar"
                });
            };
            ManageProductPropertiesInfoController.prototype.addItem = function (prop) {
                prop.items = prop.items || [];
                prop.items.push({});
            };
            ManageProductPropertiesInfoController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductPropertiesInfoController.prototype.swipe = function (it, arr, step) {
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
            return ManageProductPropertiesInfoController;
        }());
        manage.$module.directive("productDetailsProperties", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-properties.html?v=" + buildNumber,
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
