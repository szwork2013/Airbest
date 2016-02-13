var app;
(function (app) {
    var MemberInviteCodeController = (function () {
        function MemberInviteCodeController($shoppingcart, $ui, $location, $http, $interval) {
            this.$shoppingcart = $shoppingcart;
            this.$ui = $ui;
            this.$location = $location;
            this.$http = $http;
            this.$interval = $interval;
            this.data = null;
            this.expireMinutes = 0;
            this.init();
        }
        MemberInviteCodeController.prototype.init = function () {
            var _this = this;
            var api = "/api/member/invite-code/checkout";
            this.$http.post(api, {}).then(function (rsp) {
                var r = rsp.data;
                _this.data = r.data;
                _this.updateExpireMinutes(_this.data.expireDate);
                _this.url = location.origin + "/app/passport/register?inviteCode=" + _this.data.code;
            });
        };
        MemberInviteCodeController.prototype.reset = function () {
            var _this = this;
            var api = "/api/member/invite-code/reset";
            this.$ui.lock("正在生成, 请稍候");
            this.$http.post(api, {}).then(function (rsp) {
                _this.$ui.unlock();
                var r = rsp.data;
                _this.data = r.data;
                _this.updateExpireMinutes(_this.data.expireDate);
                _this.url = location.origin + "/app/passport/register?inviteCode=" + _this.data.code;
            });
        };
        MemberInviteCodeController.prototype.updateExpireMinutes = function (date) {
            var expire = Date.parse(date);
            this.expireMinutes = Math.floor((expire - Date.now()) / 1000 / 60);
            this.expireMinutes = Math.max(0, this.expireMinutes);
        };
        return MemberInviteCodeController;
    }());
    ;
    app.$module.controller("MemberInviteCodeController", MemberInviteCodeController);
})(app || (app = {}));
//# sourceMappingURL=InviteCodeController.js.map