var app;
(function (app) {
    var HomePickAreaController = (function () {
        function HomePickAreaController($ui, $http, $location, $route, $q) {
            this.$ui = $ui;
            this.$http = $http;
            this.$location = $location;
            this.$route = $route;
            this.$q = $q;
            this.data = null;
            this.hasNextView = true;
            this.selected = null;
            this.returnUrl = $location.search().returnUrl;
            this.reset();
        }
        HomePickAreaController.prototype.reset = function () {
            var _this = this;
            this.selected = null;
            this.hasNextView = true;
            this.$ui.acc(function () {
                return _this.getAreas(null).then(function (r) {
                    _this.data = r;
                });
            });
        };
        HomePickAreaController.prototype.getAreas = function (parentId) {
            var _this = this;
            var filter = { parentId: parentId };
            return this.$http.get("/api/area", { params: filter }).then(function (rsp) {
                var r = rsp.data;
                return _this.$q.resolve(r.data);
            });
        };
        HomePickAreaController.prototype.return = function () {
            this.$location.url(this.returnUrl).search({ areaId: this.selected });
        };
        HomePickAreaController.prototype.pick = function (it) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.getAreas(it.id).then(function (r) {
                    if (r.length) {
                        _this.data = r;
                    }
                    else {
                        _this.hasNextView = false;
                        _this.selected = it.id;
                    }
                });
            });
        };
        return HomePickAreaController;
    }());
    app.$module.controller("HomePickAreaController", HomePickAreaController);
})(app || (app = {}));
//# sourceMappingURL=PickAreaController.js.map