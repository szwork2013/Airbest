var app;
(function (app) {
    var MemberIndexController = (function () {
        function MemberIndexController($ui, $location, $identity) {
            this.$ui = $ui;
            this.$location = $location;
            this.$identity = $identity;
            this.isSalesman = false;
            var roles = $identity.signedMember.roles;
            this.isSalesman = (roles.indexOf("salesman") != -1);
        }
        MemberIndexController.prototype.signOut = function () {
            var _this = this;
            if (confirm("确认退出吗?")) {
                this.$identity.signOut().then(function (r) {
                    _this.$location.url("passport/login");
                });
            }
        };
        return MemberIndexController;
    }());
    app.$module.controller("MemberIndexController", MemberIndexController);
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map