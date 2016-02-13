
module app {
    class HomeIndexController {
        public member: any;

        constructor(
            private $location: ng.ILocationService,
            private $ui: app.services.IUIService,
            private $http: ng.IHttpService,
            private $identity: app.services.IdentityService,
            private $shop: app.services.ShopService
        ) {
            $identity.checkout().then(r => {
                this.member = r;
            });
        }
    }

    $module.controller("HomeIndexController", HomeIndexController);
}