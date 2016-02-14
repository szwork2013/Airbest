
module app.manage {

    /**
     * declare module
     */
    export let $module = angular.module(
        "app.manage", ["app.services", "app.directives", "ngRoute", "ngMessages", "plupload.module"]
    );

    $module.run(
        function (
            $rootScope: ng.IRootScopeService,
            $route: ng.route.IRouteService,
            $location: ng.ILocationService,
            $ui: app.services.IUIService,
            $identity: app.services.IdentityService
        ) {
            $rootScope.$on("$routeChangeSuccess", function (event) {
                $ui.unlock();
                $rootScope["pageTitle"] = $route.current.locals["title"];
            });

            $rootScope.$on("$routeChangeError", function (event, current, prev, rejection) {
                if (rejection && rejection.redirect) {
                    $location.url(rejection.redirect).replace();
                }
            });
        });

    /**
     * config routing
     */
    $module.config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true); 

        var table = new utils.RouteTable({
            templateSuffix: ".html",
            templateQueryString: "?v=" + buildNumber,
            templateBaseUrl: "/Content/modules/src/manage",
            controllerPrefix: "Manage",
            authorize: {
                allowAnonymous: true
            }
        });
         
        table.routes = [
            { title: "添加产品", path: "/product/create" },
            { title: "产品中心", path: "/product/details" },
            { title: "产品中心", path: "/product/" },
            { path: "/" }, 
        ];

        table.register($routeProvider);
        //$routeProvider.otherwise({ redirectTo: 'product/' });
    });

    class ManageMemberApplicationDetailsController {

        public model = [];
        public id = null;

        constructor(
            private $location: ng.ILocationService,
            private $http: ng.IHttpService) {

            this.id = this.$location.search().id;
            this.load();
        }

        /**
         * 加载数据.
         */
        public load() {
            let url = "/api/member-application/" + this.id;
            this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                this.model = r.data;
            });
        }

        /**
         * 批准申请.
         */
        public resolve() { 
            if (confirm("确认要通过此项申请吗?")) {
                let url = "/api/member-application/resolve/" + this.id;
                this.$http.post<any>(url, {}).then(rsp => {
                    let r = rsp.data;
                    if (r.success) {
                        alert("已经成功审核, 登录名/初始密码将通过短信发送给用户");
                        this.$location.url("member-application");
                    }
                });
            }
        }

        /**
         * 删除申请.
         */
        public remove() {
            if (confirm("确认要删除此项申请吗? 删除之后无法还原, 请谨慎操作")) {
                let url = "/api/member-application/" + this.id;
                this.$http.delete<any>(url).then(rsp => {
                    let r = rsp.data;
                    alert("删除成功");
                    this.$location.url("member-application");
                });
            }
        }
    }

    class ManageMemberApplicationIndexController {

        public apps = [];
         
        constructor(
            private $location: ng.ILocationService,
            private $http: ng.IHttpService) {

            this.load();
        }

        /**
         * 加载数据.
         */
        public load() {
            let url = "/api/member-application/new?t=" + Date.now();
            this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                this.apps = r.data;
            });
        }
    }

    class ManageJsonIndexController {

        private json: any;
        private url: string;

        constructor(
            private $location: ng.ILocationService,
            private $http: ng.IHttpService) {
            this.url = $location.search().url;
        }

        public load() {
            this.$http.get<any>(this.url + "?t=" + Date.now()).then(bag => {
                this.json = bag.data || { data: [] };
            });
        }

        public save() {
            var api = "/api/manage/savejson?url=" + encodeURIComponent(this.url);
            this.$http.post<any>(api, this.json)
                .then(bag => {
                    let r = bag.data;
                    if (r.success == true)
                        alert("保存成功!");
                });
        }

        public move(data: Array<any>, item: any, step: number) {
            let i = data.indexOf(item);
            let ni = i + step;
            let target = data[ni];

            if (target) {
                data[ni] = item;
                data[i] = target;
            }
        }

        public remove(data: Array<any>, item: any) {
            let i = data.indexOf(item);
            data.splice(i, 1);
        }

        public add(data: Array<any>, item: any, toFront: boolean) {
            toFront ? data.unshift(item) : data.push(item);
        } 
    }

    $module.controller("ManageMemberApplicationDetailsController", ManageMemberApplicationDetailsController)
    $module.controller("ManageMemberApplicationIndexController", ManageMemberApplicationIndexController)
    $module.controller("ManageJsonIndexController", ManageJsonIndexController);
    $module.controller("ManageJsonHomeNaviController", ManageJsonIndexController);
}
