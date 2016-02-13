
module app.main {

    class MemberNewsEditController {
        public model: any;
        public townId;

        constructor(
            public $ui: app.services.UIService,
            public $member: app.services.MemberService,
            public $identity: app.services.IdentityService,
            public $news: app.services.NewsService,
            public $scope: ng.IScope,
            public $location: ng.ILocationService
        ) {
            this.townId = $identity.signedMember.townId;
            this.model = {
                date: new Date(),
                townId: this.townId
            };
        }

        public submit() {
            this.$ui.lockFor(
                "正在发布", this.$news.updateOrAdd(this.model)
            ).then(r => {
                alert("发布成功!");
                this.$location.url("news/?townId=" + this.townId);
            });
        }
    };

    $module.controller("MemberNewsEditController", MemberNewsEditController);
}