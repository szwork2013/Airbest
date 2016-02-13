
module app.directives {
    $module.directive(
        "validatorUserIsLiving",
        function ($http: ng.IHttpService, $q: ng.IQService) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel: ng.INgModelController) {
                    (ngModel.$asyncValidators as any).userIsLiving = function (val, viewValue) {
                        return $q((resolve, reject) => {
                            if (!val)
                                reject();
                            else {
                                let url = "/api/member/is-living/" + val;
                                $http.post<any>(url, {}).then(rsp => {
                                    let r = rsp.data;
                                    console.log(!!r);
                                    r ? resolve() : reject();
                                });
                            }
                        });
                    };
                }
            };
        });
}