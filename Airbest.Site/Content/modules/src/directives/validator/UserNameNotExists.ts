
module app.directives {
    $module.directive(
        "validatorUserNameNotExists",
        function (
            $http: ng.IHttpService,
            $q: ng.IQService,
            $member: app.services.MemberService
        ) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel: ng.INgModelController) {
                    ngModel.$asyncValidators["userNameNotExists"] = (val, viewValue) => {
                        return $member.isExists(val).then(r => {
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
}