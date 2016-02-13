var app;
(function (app) {
    var PassportRegisterController = (function () {
        function PassportRegisterController($scope, $http, $location, $identity, $ui, $town) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.$town = $town;
            this.model = {};
            this.nosms = null;
            this.nosms = $location.search().nosms;
            this.$ui.acc(function () {
                return _this.$town.getList({}).then(function (r) {
                    _this.towns = r.data;
                    _this.model.townId = _this.$location.search().townId || _this.towns[0].id;
                });
            }, "正在获取村庄");
        }
        PassportRegisterController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$http.post("/api/passport/register", _this.model).then(function (rsp) {
                    var r = rsp.data;
                    alert("注册成功");
                    _this.$location.url("passport/login").replace();
                });
            }, "正在提交");
        };
        return PassportRegisterController;
    }());
    angular.module("app").controller("PassportRegisterController", PassportRegisterController);
})(app || (app = {}));
//# sourceMappingURL=PassportRegisterController.js.map