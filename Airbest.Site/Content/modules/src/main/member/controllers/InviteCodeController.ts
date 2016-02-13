module app {

    class MemberInviteCodeController {
        public data = null;
        public expireMinutes = 0;
        public url: string;

        constructor(
            public $shoppingcart: services.ShoppingcartService,
            public $ui: services.IUIService,
            public $location: ng.ILocationService,
            public $http: ng.IHttpService,
            public $interval: ng.IIntervalService) {

            this.init();
        }

        public init() {
            let api = "/api/member/invite-code/checkout";
            this.$http.post<any>(api, {}).then((rsp) => {
                let r = rsp.data;
                this.data = r.data;
                this.updateExpireMinutes(this.data.expireDate);
                this.url = location.origin + "/app/passport/register?inviteCode=" + this.data.code;
            });
        }

        public reset() {
            let api = "/api/member/invite-code/reset";
            this.$ui.lock("正在生成, 请稍候");
            this.$http.post<any>(api, {}).then((rsp) => {
                this.$ui.unlock();
                let r = rsp.data;
                this.data = r.data;
                this.updateExpireMinutes(this.data.expireDate);
                this.url = location.origin + "/app/passport/register?inviteCode=" + this.data.code;
            });
        }

        public updateExpireMinutes(date) {
            let expire = Date.parse(date);
            this.expireMinutes = Math.floor((expire - Date.now()) / 1000 / 60);
            this.expireMinutes = Math.max(0, this.expireMinutes);
        }
    };

    $module.controller("MemberInviteCodeController", MemberInviteCodeController);
}
