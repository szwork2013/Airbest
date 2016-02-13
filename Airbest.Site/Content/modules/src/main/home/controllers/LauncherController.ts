
module app {
    class HomeLauncherController {
        public images;
        public timer;

        constructor(
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private $ui: app.services.IUIService
        ) {
            this.images = [
                "/Content/themes/images/launchers/01.jpg?v=4",
                //"/Content/themes/images/launchers/01.jpg?v=4",
                //"/Content/themes/images/launchers/02.jpg?v=4",
                //"/Content/themes/images/launchers/03.jpg?v=4",
            ];

            this.timer = this.$timeout(() => {
                this.go();
            }, 3000);
        }

        public go() {
            this.$timeout.cancel(this.timer);
            this.$location.url("/");
        }
    }

    $module.controller("HomeLauncherController", HomeLauncherController);
}
