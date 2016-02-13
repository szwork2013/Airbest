
module app {
    class PassportRegisterController {
        public model: any = {};
        public towns: any[];
        public nosms = null;

        constructor(
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $location: ng.ILocationService,
            private $identity: app.services.IdentityService,
            private $ui: app.services.UIService,
            private $town: app.services.TownService
        ) {
            this.nosms = $location.search().nosms;

            this.$ui.acc(() => {
                return this.$town.getList({}).then(r => {
                    this.towns = r.data;
                    this.model.townId = this.$location.search().townId || this.towns[0].id;
                });
            }, "正在获取村庄");
        }

        public submit(form: ng.IFormController) {
            this.$ui.acc(() => {
                return this.$http.post<any>("/api/passport/register", this.model).then(rsp => {
                    let r = rsp.data;
                    alert("注册成功");
                    this.$location.url("passport/login").replace();
                });
            }, "正在提交");
        }
    }

    angular.module("app").controller("PassportRegisterController", PassportRegisterController);
}