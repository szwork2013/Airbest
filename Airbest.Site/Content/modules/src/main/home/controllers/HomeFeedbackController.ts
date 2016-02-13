
module app.main {

    export class HomeFeedbackController {

        constructor(
            private $ui: app.services.UIService,
            private $http: ng.IHttpService
        ) {
        }

        public submit() {
        }
    }

    $module.controller("HomeFeedbackController", HomeFeedbackController);
}