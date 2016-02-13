var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorTownAreaNotExists", function ($http, $q, $member) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators["townAreaNotExists"] = function (val, viewValue) {
                        var url = "/api/town/exists-area/" + val;
                        return $http.post(url, {}).then(function (rsp) {
                            var r = rsp.data;
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=TownAreaNotExists.js.map