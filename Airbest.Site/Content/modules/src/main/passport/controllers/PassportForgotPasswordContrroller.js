var app;
(function (app) {
    var PassportForgotPasswordController = (function () {
        /**
         * constructor
         * @param $location
         * @param $ui
         * @param $member
         */
        function PassportForgotPasswordController($location, $ui, $member, $verify) {
            this.$location = $location;
            this.$ui = $ui;
            this.$member = $member;
            this.$verify = $verify;
            this.model = {};
        }
        /**
         * submit form
         */
        PassportForgotPasswordController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.lock("正在验证, 请稍候");
            this.$member.setPasswordByVerifyCode(this.model)
                .then(function (r) {
                if (r.success) {
                    alert("新密码已经设置成功!");
                    _this.$location.url("passport/login");
                }
            });
        };
        return PassportForgotPasswordController;
    }());
    angular.module("app").controller("PassportForgotPasswordController", PassportForgotPasswordController);
})(app || (app = {}));
//# sourceMappingURL=PassportForgotPasswordContrroller.js.map