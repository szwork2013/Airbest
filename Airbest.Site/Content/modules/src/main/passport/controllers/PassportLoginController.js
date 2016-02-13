var app;
(function (app) {
    var PassportLoginController = (function () {
        function PassportLoginController($location, $identity, $ui) {
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.returnUrl = this.$location.search().returnUrl;
            this.returnUrl = this.returnUrl || "/";
            this.encodedRegisterUrl = encodeURIComponent("passport/register");
        }
        PassportLoginController.prototype.submit = function (evt) {
            var _this = this;
            var form = evt.target;
            if (!form.checkValidity())
                return;
            this.$ui.lock("正在验证, 请稍候");
            this.$identity.signIn(this.model).then(function (r) {
                _this.$ui.unlock();
                if (!r.success)
                    alert("登录失败, 账号或者密码错误");
                else {
                    _this.$location.url(_this.returnUrl);
                }
            });
        };
        return PassportLoginController;
    }());
    app.$module.controller("PassportLoginController", PassportLoginController);
})(app || (app = {}));
//# sourceMappingURL=PassportLoginController.js.map