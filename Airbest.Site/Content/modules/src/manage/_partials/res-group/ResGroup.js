var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageResGroupController = (function () {
            function ManageResGroupController($scope) {
                this.model = null;
                this.res = null;
                this.langs = [
                    { name: "简", code: "cmn-Hans" },
                    { name: "繁", code: "cmn-Hant" },
                    { name: "英", code: "eng" },
                    { name: "德", code: "deu" }
                ];
                this.name = $scope["name"];
                this.type = $scope["type"] || "text";
                this.rows = $scope["rows"] || "4";
                this.model = $scope["model"];
                this.model.res = this.model.res || {};
                this.res = this.model.res;
                this.placeholder = $scope["placeholder"];
            }
            ManageResGroupController.prototype.filledCount = function () {
                var _this = this;
                var i = 0;
                var n = this.name;
                _.forEach(this.langs, function (lang) {
                    if (_this.res[lang.code] && _this.res[lang.code][n])
                        ++i;
                });
                return i;
            };
            return ManageResGroupController;
        }());
        manage.ManageResGroupController = ManageResGroupController;
        manage.$module.directive("resGroup", function () {
            return {
                restrict: "E",
                replace: false,
                templateUrl: "/Content/modules/src/manage/_partials/res-group/res-group.html?v=" + buildNumber,
                scope: {
                    name: "@",
                    placeholder: "@",
                    type: "@",
                    rows: "@",
                    model: "=",
                },
                controller: ManageResGroupController,
                controllerAs: "ctrl",
                link: function (scope, el, attrs, ctrl) {
                    el.on("click", function () {
                    });
                    el.on("click", ".folding-toggle", function (e) {
                        el.toggleClass("folding");
                    });
                    if (ctrl.filledCount() == 4)
                        el.toggleClass("folding", true);
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=ResGroup.js.map