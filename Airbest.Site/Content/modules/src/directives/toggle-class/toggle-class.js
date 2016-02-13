var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("toggleClass", function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var className = attrs["toggleClass"];
                    el.on("click", function (e) {
                        el.toggleClass(className);
                    });
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=toggle-class.js.map