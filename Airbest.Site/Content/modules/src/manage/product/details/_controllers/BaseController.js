var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsBaseController = (function () {
            function ManageProductDetailsBaseController($location, $scope, $http, $product, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$http = $http;
                this.$product = $product;
                this.$ui = $ui;
                this.id = $location.search().id;
                var q = this.load();
                this.$ui.lockFor("加载中, 请稍候", q);
            }
            ManageProductDetailsBaseController.prototype.load = function () {
                var _this = this;
                var u = "/api/product/";
                var p = { id: this.id, includes: "res" };
                return this.$http.get(u, { params: p }).then(function (rsp) {
                    _this.product = rsp.data;
                    _this.model = angular.extend({}, _this.product);
                });
            };
            ManageProductDetailsBaseController.prototype.submit = function () {
                var u = "/api/product/update";
                var q = this.$http.post(u, this.model);
                this.$ui.lockFor("正在保存", q);
            };
            return ManageProductDetailsBaseController;
        }());
        manage.$module.controller("ManageProductDetailsBaseController", ManageProductDetailsBaseController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=BaseController.js.map