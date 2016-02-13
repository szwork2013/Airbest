
module app.main {

    class MemberProductEditController {
        public model: any;
        public townId;

        constructor(
            public $ui: app.services.UIService,
            public $member: app.services.MemberService,
            public $identity: app.services.IdentityService,
            public $product: app.services.ProductService,
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
                "正在发布", this.$product.updateOrAdd(this.model)
            ).then(r => {
                alert("发布成功!");
                this.$location.url("product/?townId=" + this.townId);
            });
        }
    };

    $module.controller("MemberProductEditController", MemberProductEditController);
}