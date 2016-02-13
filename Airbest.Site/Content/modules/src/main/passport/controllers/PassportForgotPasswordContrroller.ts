
module app {
    class PassportForgotPasswordController {
        public model;

        /**
         * constructor
         * @param $location
         * @param $ui
         * @param $member
         */
        constructor(
            private $location: ng.ILocationService,
            private $ui: app.services.IUIService,
            private $member: app.services.MemberService,
            private $verify: app.services.VerifyService) {

            this.model = {};
        }

        /**
         * submit form
         */
        public submit(form: ng.IFormController) {
            this.$ui.lock("正在验证, 请稍候");
            this.$member.setPasswordByVerifyCode(this.model)
                .then(r => {
                    if (r.success) {
                        alert("新密码已经设置成功!");
                        this.$location.url("passport/login");
                    }
                });
        }
    }

    angular.module("app").controller("PassportForgotPasswordController", PassportForgotPasswordController);
}