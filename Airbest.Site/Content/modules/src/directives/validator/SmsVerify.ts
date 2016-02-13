
module app.directives {
    $module.directive(
        "validatorSmsVerify",
        function (
            $q: ng.IQService,
            $verify: app.services.VerifyService) {
            return {
                require: 'ngModel',
                scope: {
                    phone: "="
                },
                link: function (scope, el, attrs, ngModel: ng.INgModelController) {
                    (ngModel.$asyncValidators as any).smsVerify = function (val, viewValue) {
                        if (!scope["phone"] || !val)
                            return $q.resolve();
                        return $verify.testSms(scope["phone"], val).then(r => {
                            return r ? $q.resolve(r) : $q.reject(r);
                        });
                    };
                }
            };
        });
}