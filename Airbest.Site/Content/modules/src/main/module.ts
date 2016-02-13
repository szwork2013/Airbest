

module app {

    export let $module = angular.module("app", ["app.services", "app.bmap", "app.directives", "ngRoute", "ngMessages", "plupload.module"]);

    $module.config(
        function (
            $locationProvider: angular.ILocationProvider,
            $routeProvider: angular.route.IRouteProvider
        ) {
            $locationProvider.html5Mode(true);

            var table = new utils.RouteTable({
                templateSuffix: ".html",
                templateQueryString: "?v=" + buildNumber,
                templateBaseUrl: "/Content/modules/src/main",
                controllerPrefix: "",
                authorize: { allowAnonymous: false }
            });

            table.routes = [
                /** 调试 */
                { path: "/diagnosis/", authorize: { allowAnonymous: true } },

                /** address */
                { path: "/address/from-input", authorize: { allowAnonymous: true } },
                { path: "/address/from-map", authorize: { allowAnonymous: true } },
                { path: "/address/", authorize: { allowAnonymous: true } },

                /** 注册 & 登录 */
                { title:"登录", path: "/passport/login", authorize: { allowAnonymous: true } },
                { title:"会员注册", path: "/passport/register", authorize: { allowAnonymous: true } },
                { title:"会员注册", path: "/passport/register-master", authorize: { allowAnonymous: true } },
                { title:"修改密码", path: "/passport/change-password", authorize: { allowAnonymous: true } },
                { title:"忘记密码", path: "/passport/forgot-password", authorize: { allowAnonymous: true } },

                /** 村庄靓点 */
                { title:"村庄风貌", path: "/album/details", authorize: { allowAnonymous: true } },
                { title:"村庄风貌", path: "/album/", authorize: { allowAnonymous: true } },

                /** 农产品 */
                { title:"村庄农产品", path: "/product/town", authorize: { allowAnonymous: true } },
                { title:"村庄农产品", path: "/product/details", authorize: { allowAnonymous: true } },
                { title:"村庄农产品", path: "/product/", authorize: { allowAnonymous: true } },

                /** 新闻 */
                { title:"新闻快讯", path: "/news/town", authorize: { allowAnonymous: true } },
                { title:"新闻快讯", path: "/news/details", authorize: { allowAnonymous: true } },
                { title:"新闻快讯", path: "/news/", authorize: { allowAnonymous: true } },

                /** 论坛 */
                { title:"村庄论坛", path: "/mail-group/town", authorize: { allowAnonymous: true } },
                { title:"村庄论坛", path: "/mail-group/reply" },
                { title:"村庄论坛", path: "/mail-group/post" },
                { title:"村庄论坛", path: "/mail-group/" },

                /** 村庄 */
                { title:"查找村庄", path: "/town/search", authorize: { allowAnonymous: true } },
                { title:"各地村庄", path: "/town/", authorize: { allowAnonymous: true } },

                /** 村庄主页 */
                { title:"", path: "/town/private/", authorize: { allowAnonymous: true } },

                /** 会员中心 */
                { title:"修改密码", path: "/member/change-password" },
                { title:"修改资料", path: "/member/profile" },
                { title:"修改头像", path: "/member/head" },
                { title:"微信绑定", path: "/member/bindwx" },
                { title:"会员中心", path: "/member/" },

                /** 站长:新闻管理 */
                { title:"发布新闻", path: "/member/news/edit" },
                { title:"新闻管理", path: "/member/news/" },

                /** 站长:相册管理 */
                { title:"发布照片", path: "/member/album/edit" },
                { title:"照片管理", path: "/member/album/" },

                /** 站长:农产品管理 */
                { title:"发布农产品", path: "/member/product/edit" },
                { title:"农产品管理", path: "/member/product/" },

                /** 其他 */
                { title:"帮助中心", path: "/helper/details", authorize: { allowAnonymous: true } },
                { title:"选择地址", path: "/pick-area", authorize: { allowAnonymous: true } },
                { title:"客户服务", path: "/customer-service", authorize: { allowAnonymous: true } },
                { title:"在线客服", path: "/online-service", authorize: { allowAnonymous: true } },
                { title:"联系我们", path: "/contact", authorize: { allowAnonymous: true } },
                { title:"", path: "/launcher", authorize: { allowAnonymous: true } },
                { title:"下载", path: "/download-app", authorize: { allowAnonymous: true } },
                { title:"意见反馈", path: "/feedback" },

                /** 首页 */
                { path: "/", authorize: { allowAnonymous: true } },
            ];

            table.register($routeProvider);
            $routeProvider.otherwise({ redirectTo: '/' });
        });

    $module.filter('msdate', function () {
        return function (input) {
            if (angular.isString(input) && input.indexOf("/Date(") == 0)
                input = new Date(parseInt(input.substr(6)));
            return input;
        };
    }).run(
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
}