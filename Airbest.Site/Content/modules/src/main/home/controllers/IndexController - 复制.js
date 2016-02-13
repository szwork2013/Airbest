var app;
(function (app) {
    var HomeIndexController = (function () {
        function HomeIndexController($location, $ui, $http, $identity, $shop) {
            var _this = this;
            this.$location = $location;
            this.$ui = $ui;
            this.$http = $http;
            this.$identity = $identity;
            this.$shop = $shop;
            $identity.checkout().then(function (r) {
                _this.member = r;
            });
        }
        return HomeIndexController;
    }());
    app.$module.controller("HomeIndexController", HomeIndexController);
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map