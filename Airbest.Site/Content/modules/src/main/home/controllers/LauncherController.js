var app;
(function (app) {
    var HomeLauncherController = (function () {
        function HomeLauncherController($location, $timeout, $ui) {
            var _this = this;
            this.$location = $location;
            this.$timeout = $timeout;
            this.$ui = $ui;
            this.images = [
                "/Content/themes/images/launchers/01.jpg?v=4",
            ];
            this.timer = this.$timeout(function () {
                _this.go();
            }, 3000);
        }
        HomeLauncherController.prototype.go = function () {
            this.$timeout.cancel(this.timer);
            this.$location.url("/");
        };
        return HomeLauncherController;
    }());
    app.$module.controller("HomeLauncherController", HomeLauncherController);
})(app || (app = {}));
//# sourceMappingURL=LauncherController.js.map