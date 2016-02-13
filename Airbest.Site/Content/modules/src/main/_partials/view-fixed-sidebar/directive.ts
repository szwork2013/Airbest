
module app {
    $module.directive("viewFixedSidebar", function () {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-fixed-sidebar/template.html?v=' + buildNumber,
            replace: true,
            scope: {
            },
            link: function (scope: any, el, attrs: any) {
            },
            controllerAs: "ctrl",
            controller: function ($scope, sessionService) {
                let ctrl = this;

                ctrl.goSQ = function () {
                };

                ctrl.goTop = function () {
                };
            }
        };
    });
}