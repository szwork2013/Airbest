var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageAppNaviController = (function () {
            function ManageAppNaviController() {
            }
            return ManageAppNaviController;
        }());
        manage.ManageAppNaviController = ManageAppNaviController;
        manage.$module.directive("appNavi", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/manage/_partials/app-navi/app-navi.html?v=" + buildNumber,
                scope: {},
                controller: ManageAppNaviController,
                controllerAs: "ctrl"
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
