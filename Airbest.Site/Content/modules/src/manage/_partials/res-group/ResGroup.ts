
module app.manage {
    export class ManageResGroupController {
        public langs: any[];
        public model = null;
        public name: string;
        public placeholder: string;

        constructor(
            $scope: ng.IScope
        ) {
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
    }

    $module.directive("resGroup", function () {
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
}