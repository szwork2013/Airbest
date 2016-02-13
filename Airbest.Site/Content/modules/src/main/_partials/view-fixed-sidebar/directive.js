var app;
(function (app) {
    app.$module.directive("viewFixedSidebar", function () {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-fixed-sidebar/template.html?v=' + buildNumber,
            replace: true,
            scope: {},
            link: function (scope, el, attrs) {
            },
            controllerAs: "ctrl",
            controller: function ($scope, sessionService) {
                var ctrl = this;
                ctrl.goSQ = function () {
                };
                ctrl.goTop = function () {
                };
            }
        };
    });
})(app || (app = {}));
//# sourceMappingURL=directive.js.map