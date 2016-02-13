
module app.utils {

    /**
     * class RouteTable
     */
    export class RouteTable {

        /** 
         * 默认配置项. 
         */
        public static defaultConfig: IRouteTableConfig = {
            controllerSuffix: "Controller",
            controllerAs: "ctrl",
            templateSuffix: ".html",
        }

        /** 配置 */
        public config: IRouteTableConfig;

        /** 路由 */
        public routes: IRoute[];

        /** 
         * RouteTable
         * @param config
         */
        constructor(config: IRouteTableConfig) {
            let d = RouteTable.defaultConfig;
            this.config = angular.extend({}, d, config);
            this.routes = [];
        }

        /**
         * 注册路由表
         * @param provider
         */
        public register(provider: ng.route.IRouteProvider) {
            let config = this.config;

            if (!this.routes)
                return;

            angular.forEach(this.routes, (route) => {
                let routeName = this.getRouteName(route);
                provider
                    .when(route.path, {
                        templateUrl: this.getTemplateUrl(routeName),
                        controller: this.getControllerName(routeName),
                        controllerAs: config.controllerAs,
                        resolve: {
                            authorize: this.getAuthorizeResolver(route),
                            title: () => {
                                return route.title;
                            }
                        }
                    });
            });
        }

        private getRouteName(route: IRoute) {
            let name = route.path;
            if (name.split("/").length == 2)
                name = "/home" + name;
            if (name.charAt(route.path.length - 1) == "/")
                name = name + "index";
            return name;
        }

        private getTemplateUrl(routeName: string) {
            let cfg = this.config;
            let url = cfg.templateBaseUrl + routeName + cfg.templateSuffix + cfg.templateQueryString;
            url = url.replace(/\/\//g, "/");
            return url;
        }

        private getControllerName(routeName: string) {
            let cfg = this.config;
            let name = routeName.replace(/[-\/_]\w/g, s => s.substr(1).toUpperCase()).replace(/[-\/_]/g, "")
            return cfg.controllerPrefix + name + cfg.controllerSuffix;
        }

        private getAuthorizeResolver(route: IRoute) {
            let authorize = angular.extend({}, this.config.authorize, route.authorize);

            return function (
                $q: ng.IQService,
                $location: ng.ILocationService,
                $identity: app.services.IdentityService) {
                return $q((resolve, reject) => {
                    let b = true;
                    let data: any = {};

                    if (!authorize.allowAnonymous) {
                        $identity.checkout().then(signedMember => {
                            if (!signedMember) {
                                let url = $location.url();
                                data.redirect = "passport/login?returnUrl=" + encodeURIComponent(url);
                                reject(data);
                            } else {
                                resolve(data)
                            }
                        });
                    } else {
                        resolve(data)
                    }
                });
            }
        }
    }

    

    /** 路由表 */
    interface IRouteTableConfig {

        /** 模板基础url */
        templateBaseUrl?: string;

        /** 模板名称后缀, 例如 .html */
        templateSuffix?: string;

        /** 模板附加参数 */
        templateQueryString?: string;

        /** 控制器名称前缀 */
        controllerPrefix?: string;

        /** 控制器名称后缀 */
        controllerSuffix?: string;

        /** controller as */
        controllerAs?: string;

        /** 身份验证 */
        authorize?: IRouteAuthorize;
    }

    interface IRoute {

        /** 路径 */
        path: string;

        /** 标题 */
        title?: string;

        /** 身份验证 */
        authorize?: IRouteAuthorize;
    }

    /**
     * IRouteAuthorize
     *      身份验证.
     */
    interface IRouteAuthorize {

        /** 许可匿名用户. */
        allowAnonymous?: boolean;

        /** 许可的角色列表. */
        roles?: string[];
    }
}