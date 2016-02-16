var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageResGroupController = (function () {
            function ManageResGroupController($scope) {
                this.model = null;
                this.langs = [
                    { name: "简", code: "cmn-Hans" },
                    { name: "繁", code: "cmn-Hant" },
                    { name: "英", code: "eng" },
                    { name: "德", code: "deu" }
                ];
                this.name = $scope["name"];
                this.model = $scope["model"];
                this.placeholder = $scope["placeholder"];
            }
            return ManageResGroupController;
        }());
        manage.ManageResGroupController = ManageResGroupController;
        manage.$module.directive("resGroup", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/manage/_partials/res-group/res-group.html?v=" + buildNumber,
                scope: {
                    name: "@",
                    placeholder: "@",
                    model: "=",
                },
                controller: ManageResGroupController,
                controllerAs: "ctrl"
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
