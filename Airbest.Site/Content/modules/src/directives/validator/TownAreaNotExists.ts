
module app.directives {
    $module.directive(
        "validatorTownAreaNotExists",
        function (
            $http: ng.IHttpService,
            $q: ng.IQService,
            $member: app.services.MemberService
        ) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel: ng.INgModelController) {
                    ngModel.$asyncValidators["townAreaNotExists"] = (val, viewValue) => {
                        let url = "/api/town/exists-area/" + val;
                        return $http.post(url, {}).then(rsp => {
                            let r = rsp.data;
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
}