
module app.directives {
    $module.directive(
        "validatorEquals",
        function ($http: ng.IHttpService, $q: ng.IQService) {
            return {
                require: 'ngModel',
                scope: {
                    validatorEquals: "="
                },
                link: function (scope, el, attrs, ngModel: ng.INgModelController) {
                    ngModel.$validators["equals"] = function (val, viewValue) {
                        return val == scope["validatorEquals"];
                    };
                }
            };
        });
}