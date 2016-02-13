

module app {

    class MemberProfileController {
        public model: any;
        public genderOptions;

        constructor(
            public $ui: app.services.UIService,
            public $identity: app.services.IdentityService,
            public $member: app.services.MemberService,
            public $scope: ng.IScope,
            public $location: ng.ILocationService
        ) {
            this.model = angular.extend({}, $identity.signedMember);
            this.genderOptions = [
                { id: 1, name: "男" },
                { id: 2, name: "女" },
            ];
        }

        public submit() {
            this.$ui.acc(() => {
                return this.$member.updateProfile(this.model).then(r => {
                    this.model = r;
                    angular.extend(this.model, r);
                    angular.extend(this.$identity.signedMember, r);
                    alert("保存成功");
                });
            });
        }
    };

    $module.controller("MemberProfileController", MemberProfileController);
}