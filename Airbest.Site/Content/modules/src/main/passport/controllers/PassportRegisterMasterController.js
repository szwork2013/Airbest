var app;
(function (app) {
    var PassportRegisterMasterController = (function () {
        function PassportRegisterMasterController($scope, $http, $location, $identity, $ui, $town) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.$town = $town;
            this.model = {};
            this.savedKey = "PassportRegisterMasterController.model";
            this.nosms = null;
            this.encodedUrl = encodeURIComponent($location.url());
            this.model.townAreaId = this.$location.search().id;
            this.nosms = $location.search().nosms;
            var savedJson = sessionStorage.getItem(this.savedKey);
            savedJson && angular.extend(this.model, angular.fromJson(savedJson));
            $scope.$on("$destroy", function (e) {
                sessionStorage.setItem(_this.savedKey, angular.toJson(_this.model));
            });
            this.model.townAreaId = this.$location.search().areaId;
            if (this.model.townAreaId)
                this.$http.get("/api/area/" + this.model.townAreaId).then(function (rsp) {
                    _this.townAreaName = rsp.data.name;
                });
        }
        PassportRegisterMasterController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$http.post("/api/passport/register-master", _this.model).then(function (rsp) {
                    var r = rsp.data;
                    alert("注册成功");
                    _this.$location.url("passport/login").replace();
                }, function () {
                    alert("系统繁忙, 请稍候再试");
                });
            }, "正在提交");
        };
        return PassportRegisterMasterController;
    }());
    angular.module("app").controller("PassportRegisterMasterController", PassportRegisterMasterController);
})(app || (app = {}));
//# sourceMappingURL=PassportRegisterMasterController.js.map