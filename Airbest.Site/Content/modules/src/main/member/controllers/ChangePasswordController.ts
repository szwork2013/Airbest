
module app {
    class MemberChangePasswordController {

        public model: any;

        constructor(
            private $location: ng.ILocationService,
            private $ui: app.services.IUIService,
            private $member: app.services.MemberService,
            private $identity: app.services.IdentityService
        ) {
            this.model = {
                tel: this.$identity.signedMember.userName
            };
        }

        public checkPassword(input: ng.INgModelController) {
            input.$setDirty();
            let password = this.model.oldPassword;
            let account = this.$identity.signedMember.name;

            if (password) {
                this.$ui.lock("正在验证");
                this.$identity.testPassword(account, password)
                    .then(r => {
                        this.$ui.unlock();
                        console.log(r);
                        input.$setValidity("test", r);
                    });
            }
        }

        public submit() {
            this.$ui.lock("正在保存");
            this.model.id = this.$identity.signedMember.id;
            this.$member.setPassword(this.model).then(r => {
                this.$ui.unlock();
                if (r.success) {
                    alert("新密码已经保存");
                    this.$location.url("member");
                }
            });
        }
    }

    $module.controller("MemberChangePasswordController", MemberChangePasswordController);
}
