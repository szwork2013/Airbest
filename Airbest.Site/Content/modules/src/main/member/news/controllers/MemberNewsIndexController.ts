
module app.main {

    class MemberNewsIndexController {
        public model: any;
        public townId;

        constructor(
            public $ui: app.services.UIService,
            public $member: app.services.MemberService,
            public $identity: app.services.IdentityService,
            public $news: app.services.AlbumService,
            public $scope: ng.IScope,
            public $location: ng.ILocationService
        ) {
            this.model = {};
            this.townId = $identity.signedMember.townId;
        }

        public submit() {
            this.$ui.acc(() => {
                return {} as any
            });
        }
    };

    $module.controller("MemberNewsIndexController", MemberNewsIndexController);
}