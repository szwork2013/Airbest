var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorEquals", function ($http, $q) {
            return {
                require: 'ngModel',
                scope: {
                    validatorEquals: "="
                },
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$validators["equals"] = function (val, viewValue) {
                        return val == scope["validatorEquals"];
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=Equals.js.map