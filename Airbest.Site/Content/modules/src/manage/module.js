var app;
(function (app) {
    var manage;
    (function (manage) {
        /**
         * declare module
         */
        manage.$module = angular.module("app.manage", ["app.services", "app.directives", "ngRoute", "ngMessages", "plupload.module"]);
        manage.$module.run(function ($rootScope, $route, $location, $ui, $identity) {
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
        manage.$module.config(function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            var table = new app.utils.RouteTable({
                templateSuffix: ".html",
                templateQueryString: "?v=" + buildNumber,
                templateBaseUrl: "/Content/modules/src/manage",
                controllerPrefix: "Manage",
                authorize: {
                    allowAnonymous: true
                }
            });
            table.routes = [
                { path: "/product/details/special" },
                { path: "/product/details/property" },
                { path: "/product/details/base" },
                { path: "/product/details/" },
                { path: "/product/create" },
                { path: "/product/" },
                { path: "/" },
            ];
            table.register($routeProvider);
            //$routeProvider.otherwise({ redirectTo: 'product/' });
        });
        var ManageMemberApplicationDetailsController = (function () {
            function ManageMemberApplicationDetailsController($location, $http) {
                this.$location = $location;
                this.$http = $http;
                this.model = [];
                this.id = null;
                this.id = this.$location.search().id;
                this.load();
            }
            /**
             * 加载数据.
             */
            ManageMemberApplicationDetailsController.prototype.load = function () {
                var _this = this;
                var url = "/api/member-application/" + this.id;
                this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    _this.model = r.data;
                });
            };
            /**
             * 批准申请.
             */
            ManageMemberApplicationDetailsController.prototype.resolve = function () {
                var _this = this;
                if (confirm("确认要通过此项申请吗?")) {
                    var url = "/api/member-application/resolve/" + this.id;
                    this.$http.post(url, {}).then(function (rsp) {
                        var r = rsp.data;
                        if (r.success) {
                            alert("已经成功审核, 登录名/初始密码将通过短信发送给用户");
                            _this.$location.url("member-application");
                        }
                    });
                }
            };
            /**
             * 删除申请.
             */
            ManageMemberApplicationDetailsController.prototype.remove = function () {
                var _this = this;
                if (confirm("确认要删除此项申请吗? 删除之后无法还原, 请谨慎操作")) {
                    var url = "/api/member-application/" + this.id;
                    this.$http.delete(url).then(function (rsp) {
                        var r = rsp.data;
                        alert("删除成功");
                        _this.$location.url("member-application");
                    });
                }
            };
            return ManageMemberApplicationDetailsController;
        }());
        var ManageMemberApplicationIndexController = (function () {
            function ManageMemberApplicationIndexController($location, $http) {
                this.$location = $location;
                this.$http = $http;
                this.apps = [];
                this.load();
            }
            /**
             * 加载数据.
             */
            ManageMemberApplicationIndexController.prototype.load = function () {
                var _this = this;
                var url = "/api/member-application/new?t=" + Date.now();
                this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    _this.apps = r.data;
                });
            };
            return ManageMemberApplicationIndexController;
        }());
        var ManageJsonIndexController = (function () {
            function ManageJsonIndexController($location, $http) {
                this.$location = $location;
                this.$http = $http;
                this.url = $location.search().url;
            }
            ManageJsonIndexController.prototype.load = function () {
                var _this = this;
                this.$http.get(this.url + "?t=" + Date.now()).then(function (bag) {
                    _this.json = bag.data || { data: [] };
                });
            };
            ManageJsonIndexController.prototype.save = function () {
                var api = "/api/manage/savejson?url=" + encodeURIComponent(this.url);
                this.$http.post(api, this.json)
                    .then(function (bag) {
                    var r = bag.data;
                    if (r.success == true)
                        alert("保存成功!");
                });
            };
            ManageJsonIndexController.prototype.move = function (data, item, step) {
                var i = data.indexOf(item);
                var ni = i + step;
                var target = data[ni];
                if (target) {
                    data[ni] = item;
                    data[i] = target;
                }
            };
            ManageJsonIndexController.prototype.remove = function (data, item) {
                var i = data.indexOf(item);
                data.splice(i, 1);
            };
            ManageJsonIndexController.prototype.add = function (data, item, toFront) {
                toFront ? data.unshift(item) : data.push(item);
            };
            return ManageJsonIndexController;
        }());
        manage.$module.controller("ManageMemberApplicationDetailsController", ManageMemberApplicationDetailsController);
        manage.$module.controller("ManageMemberApplicationIndexController", ManageMemberApplicationIndexController);
        manage.$module.controller("ManageJsonIndexController", ManageJsonIndexController);
        manage.$module.controller("ManageJsonHomeNaviController", ManageJsonIndexController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=module.js.map