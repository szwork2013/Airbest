var app;
(function (app) {
    var utils;
    (function (utils) {
        /**
         * class RouteTable
         */
        var RouteTable = (function () {
            /**
             * RouteTable
             * @param config
             */
            function RouteTable(config) {
                var d = RouteTable.defaultConfig;
                this.config = angular.extend({}, d, config);
                this.routes = [];
            }
            /**
             * 注册路由表
             * @param provider
             */
            RouteTable.prototype.register = function (provider) {
                var _this = this;
                var config = this.config;
                if (!this.routes)
                    return;
                angular.forEach(this.routes, function (route) {
                    var routeName = _this.getRouteName(route);
                    provider
                        .when(route.path, {
                        templateUrl: _this.getTemplateUrl(routeName),
                        controller: _this.getControllerName(routeName),
                        controllerAs: config.controllerAs,
                        resolve: {
                            authorize: _this.getAuthorizeResolver(route),
                            title: function () {
                                return route.title;
                            }
                        }
                    });
                });
            };
            RouteTable.prototype.getRouteName = function (route) {
                var name = route.path;
                if (name.split("/").length == 2)
                    name = "/home" + name;
                if (name.charAt(route.path.length - 1) == "/")
                    name = name + "index";
                return name;
            };
            RouteTable.prototype.getTemplateUrl = function (routeName) {
                var cfg = this.config;
                var url = cfg.templateBaseUrl + routeName + cfg.templateSuffix + cfg.templateQueryString;
                url = url.replace(/\/\//g, "/");
                return url;
            };
            RouteTable.prototype.getControllerName = function (routeName) {
                var cfg = this.config;
                var name = routeName.replace(/[-\/_]\w/g, function (s) { return s.substr(1).toUpperCase(); }).replace(/[-\/_]/g, "");
                return cfg.controllerPrefix + name + cfg.controllerSuffix;
            };
            RouteTable.prototype.getAuthorizeResolver = function (route) {
                var authorize = angular.extend({}, this.config.authorize, route.authorize);
                return function ($q, $location, $identity) {
                    return $q(function (resolve, reject) {
                        var b = true;
                        var data = {};
                        if (!authorize.allowAnonymous) {
                            $identity.checkout().then(function (signedMember) {
                                if (!signedMember) {
                                    var url = $location.url();
                                    data.redirect = "passport/login?returnUrl=" + encodeURIComponent(url);
                                    reject(data);
                                }
                                else {
                                    resolve(data);
                                }
                            });
                        }
                        else {
                            resolve(data);
                        }
                    });
                };
            };
            /**
             * 默认配置项.
             */
            RouteTable.defaultConfig = {
                controllerSuffix: "Controller",
                controllerAs: "ctrl",
                templateSuffix: ".html",
            };
            return RouteTable;
        }());
        utils.RouteTable = RouteTable;
    })(utils = app.utils || (app.utils = {}));
})(app || (app = {}));
//# sourceMappingURL=RouteTable2.js.map