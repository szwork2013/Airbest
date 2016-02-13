var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorUserNameNotExists", function ($http, $q, $member) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators["userNameNotExists"] = function (val, viewValue) {
                        return $member.isExists(val).then(function (r) {
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=UserNameNotExists.js.map