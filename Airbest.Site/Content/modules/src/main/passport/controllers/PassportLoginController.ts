
module app {
    class PassportLoginController {
        public returnUrl: string;
        public model: any;
        public encodedRegisterUrl;

        constructor(
            private $location: ng.ILocationService,
            private $identity: app.services.IdentityService,
            private $ui: app.services.IUIService) {

            this.returnUrl = this.$location.search().returnUrl;
            this.returnUrl = this.returnUrl || "/";
            this.encodedRegisterUrl = encodeURIComponent("passport/register");
        }

        public submit(evt) {
            var form: HTMLFormElement = evt.target;
            if (!form.checkValidity())
                return;

            this.$ui.lock("正在验证, 请稍候");
            this.$identity.signIn(this.model).then(r => {
                this.$ui.unlock();
                if (!r.success)
                    alert("登录失败, 账号或者密码错误");
                else {
                    this.$location.url(this.returnUrl);
                }
            });
        }
    }

    $module.controller("PassportLoginController", PassportLoginController);
}