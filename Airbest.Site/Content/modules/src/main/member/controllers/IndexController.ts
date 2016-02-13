module app {
    class MemberIndexController {

        public navis: any[];
        public isSalesman = false;

        constructor(
            private $ui: app.services.IUIService,
            private $location: ng.ILocationService,
            private $identity: app.services.IdentityService
        ) {
            var roles = $identity.signedMember.roles as any[];
            this.isSalesman = (roles.indexOf("salesman") != -1);
        }

        public signOut() {
            if (confirm("确认退出吗?")) {
                this.$identity.signOut().then(r => {
                    this.$location.url("passport/login");
                });
            }
        }
    }

    $module.controller("MemberIndexController", MemberIndexController);
}
