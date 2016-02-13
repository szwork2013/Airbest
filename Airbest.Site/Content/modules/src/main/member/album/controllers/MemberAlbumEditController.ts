
module app.main {

    class MemberAlbumEditController {
        public model: any;
        public townId;

        constructor(
            public $ui: app.services.UIService,
            public $member: app.services.MemberService,
            public $identity: app.services.IdentityService,
            public $album: app.services.AlbumService,
            public $scope: ng.IScope,
            public $location: ng.ILocationService
        ) {
            this.model = {};
            this.townId = $identity.signedMember.townId;
        }

        public submit() {
            this.$ui.acc(() => {
                this.model.albumId = this.townId;
                this.model.memberId = this.$identity.signedMember.id;
                return this.$album.updateOrAddPhoto(this.model).then(r => {
                    console.log(r.data.id);
                    this.$location.url("album/details").search({ id: r.data.id});
                });
            });
        }
    };

    $module.controller("MemberAlbumEditController", MemberAlbumEditController);
}