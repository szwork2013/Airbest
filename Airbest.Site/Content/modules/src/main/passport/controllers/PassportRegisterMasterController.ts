
module app {
    class PassportRegisterMasterController {
        public model: any = {};
        public encodedUrl: string;
        public savedKey = "PassportRegisterMasterController.model";
        public townAreaName;
        public nosms = null;

        constructor(
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $location: ng.ILocationService,
            private $identity: app.services.IdentityService,
            private $ui: app.services.UIService,
            private $town: app.services.TownService
        ) {
            this.encodedUrl = encodeURIComponent($location.url());
            this.model.townAreaId = this.$location.search().id;
            this.nosms = $location.search().nosms;

            var savedJson = sessionStorage.getItem(this.savedKey);
            savedJson && angular.extend(this.model, angular.fromJson(savedJson));

            $scope.$on("$destroy", (e) => {
                sessionStorage.setItem(this.savedKey, angular.toJson(this.model));
            });

            this.model.townAreaId = this.$location.search().areaId;
            if (this.model.townAreaId)
                this.$http.get<any>("/api/area/" + this.model.townAreaId).then(rsp => {
                    this.townAreaName = rsp.data.name;
                });
        }

        public submit(form: ng.IFormController) {
            this.$ui.acc(() => {
                return this.$http.post<any>("/api/passport/register-master", this.model).then(rsp => {
                    let r = rsp.data;
                    alert("注册成功");
                    this.$location.url("passport/login").replace();
                }, () => {
                    alert("系统繁忙, 请稍候再试");
                });
            }, "正在提交");
        }
    }

    angular.module("app").controller("PassportRegisterMasterController", PassportRegisterMasterController);
}