
module app.manage {
    export class ManageAppNaviController{
        constructor() {
        }
    }

    $module.directive("appNavi", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/Content/modules/src/manage/_partials/app-navi/app-navi.html?v=" + buildNumber,
            scope: {
            },
            controller: ManageAppNaviController,
            controllerAs: "ctrl"
        };
    });
}