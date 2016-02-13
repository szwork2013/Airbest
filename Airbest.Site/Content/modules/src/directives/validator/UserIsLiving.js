var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorUserIsLiving", function ($http, $q) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators.userIsLiving = function (val, viewValue) {
                        return $q(function (resolve, reject) {
                            if (!val)
                                reject();
                            else {
                                var url = "/api/member/is-living/" + val;
                                $http.post(url, {}).then(function (rsp) {
                                    var r = rsp.data;
                                    console.log(!!r);
                                    r ? resolve() : reject();
                                });
                            }
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=UserIsLiving.js.map