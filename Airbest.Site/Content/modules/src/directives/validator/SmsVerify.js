var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorSmsVerify", function ($q, $verify) {
            return {
                require: 'ngModel',
                scope: {
                    phone: "="
                },
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators.smsVerify = function (val, viewValue) {
                        if (!scope["phone"] || !val)
                            return $q.resolve();
                        return $verify.testSms(scope["phone"], val).then(function (r) {
                            return r ? $q.resolve(r) : $q.reject(r);
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=SmsVerify.js.map