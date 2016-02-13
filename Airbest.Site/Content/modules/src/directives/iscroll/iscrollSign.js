var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("iscrollSignGesturePullDown", function () {
            return {
                restrict: "E",
                templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullDown.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                }
            };
        });
        directives.$module.directive("iscrollSignGesturePullUp", function () {
            return {
                restrict: "E",
                templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullUp.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=iscrollSign.js.map