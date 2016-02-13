var app;
(function (app) {
    var MemberChangePasswordController = (function () {
        function MemberChangePasswordController($location, $ui, $member, $identity) {
            this.$location = $location;
            this.$ui = $ui;
            this.$member = $member;
            this.$identity = $identity;
            this.model = {
                tel: this.$identity.signedMember.userName
            };
        }
        MemberChangePasswordController.prototype.checkPassword = function (input) {
            var _this = this;
            input.$setDirty();
            var password = this.model.oldPassword;
            var account = this.$identity.signedMember.name;
            if (password) {
                this.$ui.lock("正在验证");
                this.$identity.testPassword(account, password)
                    .then(function (r) {
                    _this.$ui.unlock();
                    console.log(r);
                    input.$setValidity("test", r);
                });
            }
        };
        MemberChangePasswordController.prototype.submit = function () {
            var _this = this;
            this.$ui.lock("正在保存");
            this.model.id = this.$identity.signedMember.id;
            this.$member.setPassword(this.model).then(function (r) {
                _this.$ui.unlock();
                if (r.success) {
                    alert("新密码已经保存");
                    _this.$location.url("member");
                }
            });
        };
        return MemberChangePasswordController;
    }());
    app.$module.controller("MemberChangePasswordController", MemberChangePasswordController);
})(app || (app = {}));
//# sourceMappingURL=ChangePasswordController.js.map