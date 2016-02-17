
module app.manage {
    export class ManageResGroupController {
        public langs: { name: string, code:string }[];
        public model = null;
        public name: string;
        public placeholder: string;
        public res = null;
        public type: string;
        public rows: string;

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
            this.type = $scope["type"] || "text";
            this.rows = $scope["rows"] || "4";

            this.model = $scope["model"];
            this.model.res = this.model.res || {};
            this.res = this.model.res;

            this.placeholder = $scope["placeholder"];
        }

        public filledCount() {
            var i = 0;
            var n = this.name;
            _.forEach(this.langs, lang => {
                if (this.res[lang.code] && this.res[lang.code][n])
                    ++i;
            });
            return i;
        }
    }

    $module.directive("resGroup", function () {
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
            link: function (scope, el, attrs, ctrl: app.manage.ManageResGroupController) {
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
}