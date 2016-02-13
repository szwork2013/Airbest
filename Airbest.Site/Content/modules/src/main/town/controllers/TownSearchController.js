var app;
(function (app) {
    var main;
    (function (main) {
        var TownSearchController = (function () {
            function TownSearchController($ui, $town, $interval, $timeout, $location, $identity, $scope) {
                var _this = this;
                this.$ui = $ui;
                this.$town = $town;
                this.$interval = $interval;
                this.$timeout = $timeout;
                this.$location = $location;
                this.$identity = $identity;
                this.$scope = $scope;
                this.keywords = "";
                this.searchedKw = "";
                this.loading = false;
                this.member = null;
                $identity.checkout().then(function (r) {
                    _this.member = r;
                });
                var timer = $interval(function () {
                    _this.load();
                }, 100);
                $scope.$on("$destroy", function (e) {
                    $interval.cancel(timer);
                });
            }
            TownSearchController.prototype.load = function () {
                var _this = this;
                if (this.searchedKw == this.keywords || this.loading)
                    return;
                this.searchedKw = this.keywords;
                if (!this.searchedKw)
                    this.towns = [];
                else {
                    this.loading = true;
                    var filter = { keywords: this.searchedKw, includes: "master" };
                    this.$town.getList(filter).then(function (r) {
                        _this.towns = r.data;
                    }).finally(function () {
                        _this.loading = false;
                    });
                }
            };
            TownSearchController.prototype.go = function (item) {
                var returnUrl = this.$location.search().returnUrl;
                console.log("returnUrl");
                if (!returnUrl) {
                    this.$location.url("town/private?id=" + item.id);
                }
                else {
                    this.$location.url(returnUrl).search({ townId: item.id });
                }
            };
            return TownSearchController;
        }());
        app.$module.controller("TownSearchController", TownSearchController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownSearchController.js.map