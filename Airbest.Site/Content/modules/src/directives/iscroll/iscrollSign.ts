
module app.directives {
    $module.directive("iscrollSignGesturePullDown", function () {
        return {
            restrict: "E",
            templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullDown.html?v=" + buildNumber,
            scope: {
            },
            link: function (scope, el, attrs, ctrl) {
            }
        };
    });

    $module.directive("iscrollSignGesturePullUp", function () {
        return {
            restrict: "E",
            templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullUp.html?v=" + buildNumber,
            scope: {
            },
            link: function (scope, el, attrs, ctrl) {
            }
        };
    });
} 