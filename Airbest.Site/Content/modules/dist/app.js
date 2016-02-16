
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

var app;
(function (app) {
    var services;
    (function (services) {
        services.$module = angular.module("app.services", []);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        services.defaultImgDict = {
            /**
             * 默认会员头像
             */
            "head": "/Content/themes/res/defaultImg.head.jpg?v=" + buildNumber,
            "pic.4x3": "/Content/themes/res/pic.4x3.png?v=" + buildNumber
        };
        services.$module.filter('defaultImg', function () {
            return function (input, type) {
                return input || services.defaultImgDict[type] || type;
                ;
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        services.descDict = {
            /**
             * 订单退货状态.
             */
            "orderRefundStatus": {
                "1": "审核中",
                "2": "退货成功",
                "3": "退货失败"
            },
            /**
             * 退货类型.
             */
            "orderRefundType": {
                "0": "质量问题",
                "1": "零库存退货",
                "2": "其他",
            },
            "salesmanType": {
                "0": "业务员",
                "1": "代理",
            },
        };
        services.$module.filter('desc', function () {
            return function (input, type) {
                if (!type || !services.descDict[type])
                    return "";
                var dic = services.descDict[type];
                var key = (input == null ? "" : input.toString()) || "$unknown";
                return dic[key] || dic["$unknown"];
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var FavoriteService = (function () {
            function FavoriteService($q, $http, $identity) {
                this.$q = $q;
                this.$http = $http;
                this.$identity = $identity;
            }
            /**
             * 检查收藏夹中是否包含指定的商品.
             * @param id
             */
            FavoriteService.prototype.contains = function (id) {
                var _this = this;
                return this.$identity.checkout().then(function (r) {
                    var mid = _this.$identity.signedMember.id;
                    var url = ["/api/member", mid, "favorite/contains", id].join("/");
                    return _this.$http.get(url).then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            /**
             * 添加/移除收藏夹中的商品
             * @param id
             */
            FavoriteService.prototype.toggle = function (id) {
                var _this = this;
                return this.$identity.checkout().then(function (r) {
                    var mid = _this.$identity.signedMember.id;
                    var url = ["/api/member", mid, "favorite/toggle", id].join("/");
                    return _this.$http.post(url, {}).then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            /**
             * 获取收藏夹中的商品列表
             */
            FavoriteService.prototype.products = function (filter) {
                var _this = this;
                if (filter === void 0) { filter = null; }
                filter = filter || {};
                return this.$identity.checkout().then(function (r) {
                    var mid = _this.$identity.signedMember.id;
                    var url = ["/api/member", mid, "favorite"].join("/");
                    return _this.$http.get(url, { params: filter }).then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r);
                    });
                });
            };
            return FavoriteService;
        }());
        services.FavoriteService = FavoriteService;
        services.$module.service("$favorite", FavoriteService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var OrderRefundService = (function () {
            function OrderRefundService($q, $http, $identity) {
                this.$q = $q;
                this.$http = $http;
                this.$identity = $identity;
            }
            OrderRefundService.prototype.add = function (model) {
                var _this = this;
                var url = ["/api/order-refund/add"].join("/");
                return this.$http.post(url, model).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 检查某商品是否允许零库存退货.
             * @param orderId
             * @param productId
             */
            OrderRefundService.prototype.allowZsRefund = function (orderId, productId) {
                var _this = this;
                var data = { orderId: orderId, productId: productId };
                var url = "/api/order-refund/allow-zs-refund";
                return this.$http.get(url, { params: data }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 获取退货总金额
             * @param refund
             */
            OrderRefundService.prototype.amount = function (refund) {
                var a = 0;
                if (refund && refund.items) {
                    _.forEach(refund.items, function (item) {
                        a += ((item.orderItem && item.orderItem.price) || 0);
                    });
                }
                return a;
            };
            /**
             * 获取退货总金额
             * @param refund
             */
            OrderRefundService.prototype.count = function (refund) {
                var a = 0;
                if (refund && refund.items) {
                    _.forEach(refund.items, function (item) {
                        a += (item.count || 0);
                    });
                }
                return a;
            };
            /**
             * 获取单个退货记录.
             * @param id
             */
            OrderRefundService.prototype.get = function (id) {
                var _this = this;
                var url = "/api/order-refund/" + id;
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 同意此退货申请
             * @param id
             */
            OrderRefundService.prototype.resolve = function (id, data) {
                var _this = this;
                var url = "/api/order-refund/resolve/" + id;
                return this.$http.post(url, data).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 拒绝此退货申请
             * @param id
             */
            OrderRefundService.prototype.reject = function (id, data) {
                var _this = this;
                var url = "/api/order-refund/reject/" + id;
                return this.$http.post(url, data).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 获取退货列表.
             * @param filter
             */
            OrderRefundService.prototype.getList = function (filter) {
                var _this = this;
                filter = filter || {};
                var url = ["/api/order-refund"].join("/");
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            /**
             *
             * @param s
             */
            OrderRefundService.prototype.statusText = function (s) {
                switch (s) {
                    case 1: return "处理中";
                    case 2: return "退货成功";
                    case 3: return "退货失败";
                    default: return "";
                }
            };
            return OrderRefundService;
        }());
        services.OrderRefundService = OrderRefundService;
        services.$module.service("$orderRefund", OrderRefundService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var ZanService = (function () {
            function ZanService($q, $http, $identity) {
                this.$q = $q;
                this.$http = $http;
                this.$identity = $identity;
            }
            /**
             * 检查收藏夹中是否包含指定的商品.
             * @param id
             */
            ZanService.prototype.contains = function (id) {
                var _this = this;
                return this.$identity.checkout().then(function (r) {
                    var mid = _this.$identity.signedMember.id;
                    var url = ["/api/member", mid, "zan/contains", id].join("/");
                    return _this.$http.get(url).then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            /**
             * 获取给指定商品点赞的会员列表.
             * @param id
             */
            ZanService.prototype.product = function (id) {
                var _this = this;
                var url = "/api/zan/product/" + id;
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            /**
             * 添加/移除收藏夹中的商品
             * @param id
             */
            ZanService.prototype.toggle = function (id) {
                var _this = this;
                return this.$identity.checkout().then(function (r) {
                    var mid = _this.$identity.signedMember.id;
                    var url = ["/api/member", mid, "zan/toggle", id].join("/");
                    return _this.$http.post(url, {}).then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            return ZanService;
        }());
        services.ZanService = ZanService;
        services.$module.service("$zan", ZanService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var ProductService = (function () {
            function ProductService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            /**
             * 创建商品.
             * @param m
             */
            ProductService.prototype.create = function (m) {
                var _this = this;
                var u = "/api/product/create";
                return this.$http.post(u, m).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            ProductService.prototype.getSpecials = function (filter) {
                var u = "/api/product/special";
                return this.$http.get(u, { params: filter }).then(function (rsp) {
                    return rsp.data;
                });
            };
            ProductService.prototype.updateSpecials = function (pid, data) {
                var u = "/api/product/special/update";
                var params = { productId: pid, replace: true };
                return this.$http.post(u, data, { params: params }).then(function (rsp) {
                    return rsp.data;
                });
            };
            /**
             * 获取商品列表
             * @param filter
             */
            ProductService.prototype.getList = function (filter) {
                var _this = this;
                return this.$http.get("/api/product", { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            /**
             * 获取商品
             * @param id
             */
            ProductService.prototype.get = function (id) {
                var _this = this;
                if (!id) {
                    return this.$q.reject(null);
                }
                else {
                    return this.$http.get("/api/product/" + id)
                        .then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r);
                    });
                }
            };
            ProductService.prototype.getRes = function (id) {
                var _this = this;
                var u = ["/api/product", id, "/res"].join("/");
                return this.$http.get(u).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            ProductService.prototype.update = function (id, m) {
                var _this = this;
                var u = "/api/product/" + id + "/update";
                return this.$http.post(u, m).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            ProductService.prototype.updateRes = function (id, m) {
                var _this = this;
                var u = "/api/product/" + id + "/update-res";
                return this.$http.post(u, m).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            ProductService.prototype.updateOrAdd = function (data) {
                var _this = this;
                var url = "/api/product/update-or-add";
                return this.$http.post(url, data).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            /**
             * 工厂区商品
             * @param code
             */
            ProductService.prototype.factory = function (code) {
                var _this = this;
                var url = "/api/product/factory/" + code;
                return this.$http.get(url)
                    .then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * @param v
             */
            ProductService.prototype.priceTypeText = function (v) {
                switch (v) {
                    case 4: return "爆款专区";
                    case 5: return "新品专区";
                    case 1: return "零库存区";
                    case 6: return "活动促销区";
                    case 7: return "特价折扣区";
                    case 3: return "预售区";
                    case 2: return "工厂区";
                    default: return "";
                }
            };
            /**
             * @param v
             */
            ProductService.prototype.priceTypeShortText = function (v) {
                switch (v) {
                    case 4: return "爆款";
                    case 5: return "5天左右发货";
                    case 1: return "零库存";
                    case 6: return "活动促销";
                    case 7: return "特价折扣";
                    case 3: return "预售";
                    case 2: return "工厂";
                    default: return "";
                }
            };
            /**
             *
             */
            ProductService.prototype.categoryList = function (filter) {
            };
            /**
             *
             */
            ProductService.prototype.category = function () {
            };
            return ProductService;
        }());
        services.ProductService = ProductService;
        services.$module.service("$product", ProductService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var AlbumService = (function () {
            function AlbumService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            /**
             * 获取商品列表
             * @param filter
             */
            AlbumService.prototype.getAlbumList = function (filter) {
                var _this = this;
                filter = filter || {};
                return this.$http.get("/api/album", { params: filter }).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            AlbumService.prototype.getFirstPhoto = function (albumId, filter) {
                var _this = this;
                if (filter === void 0) { filter = null; }
                filter = filter || {};
                var url = "/api/album/first-photo/" + albumId;
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            AlbumService.prototype.getPhoto = function (id, filter) {
                var _this = this;
                if (filter === void 0) { filter = null; }
                filter = filter || {};
                var url = "/api/album/photo/" + id;
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            AlbumService.prototype.getPhotoList = function (filter) {
                var _this = this;
                filter = filter || {};
                var url = "/api/album/photo/";
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            AlbumService.prototype.updateOrAddPhoto = function (data) {
                var _this = this;
                var url = "/api/album/photo/update-or-add";
                return this.$http.post(url, data).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            return AlbumService;
        }());
        services.AlbumService = AlbumService;
        services.$module.service("$album", AlbumService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var ArticleService = (function () {
            function ArticleService() {
            }
            return ArticleService;
        }());
        services.ArticleService = ArticleService;
        services.$module.controller("$article", ArticleService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var IdentityService = (function () {
            function IdentityService($window, $location, $http, $q) {
                this.$window = $window;
                this.$location = $location;
                this.$http = $http;
                this.$q = $q;
                this._has_checkout = false;
            }
            IdentityService.prototype.signIn = function (o) {
                var _this = this;
                var deferred = this.$q.defer();
                this.$http.post("/api/passport/signin", o).then(function (httpRsl) {
                    var r = httpRsl.data;
                    _this.signedMember = r.signedMember;
                    deferred.resolve(r);
                });
                return deferred.promise;
            };
            Object.defineProperty(IdentityService.prototype, "mid", {
                get: function () {
                    var m = this.signedMember;
                    return m && m.id;
                },
                enumerable: true,
                configurable: true
            });
            IdentityService.prototype.signOut = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (!_this.signedMember)
                        resolve({ success: true });
                    else {
                        _this.$http.post("/api/passport/signout", {}).then(function (rsp) {
                            var r = rsp.data;
                            _this.signedMember = null;
                            resolve(r);
                        });
                    }
                });
            };
            IdentityService.prototype.checkout = function () {
                var _this = this;
                if (this._has_checkout)
                    return this.$q.resolve(this.signedMember);
                return this.$http.post("/api/passport/checkout", {}).then(function (rsp) {
                    _this.signedMember = rsp.data;
                    _this._has_checkout = true;
                    return _this.$q.resolve(_this.signedMember);
                });
            };
            /**
             * test password
             */
            IdentityService.prototype.testPassword = function (account, password) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var params = { account: account, password: password };
                    _this.$http.post("/api/passport/test-password", params).then(function (rsp) {
                        var r = rsp.data;
                        resolve(r);
                    });
                });
            };
            IdentityService.prototype.updateApp = function (model) {
                var _this = this;
                return this.checkout().then(function (r) {
                    var url = "/api/member-application/update";
                    return _this.$http.post(url, model).then(function (rsp) {
                        var r = rsp.data;
                        _this.signedMember.app = r.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            return IdentityService;
        }());
        services.IdentityService = IdentityService;
        ;
        /** register */
        services.$module.service("$identity", IdentityService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var MainGroupService = (function () {
            function MainGroupService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            /**
             * 获取商品列表
             * @param filter
             */
            MainGroupService.prototype.getMessageList = function (filter) {
                var _this = this;
                return this.$http.get("/api/mail-group/message", { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            MainGroupService.prototype.postMessage = function (o) {
                var _this = this;
                return this.$http.post("/api/mail-group/message/post", o).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            MainGroupService.prototype.getMessage = function (id) {
                var _this = this;
                var url = "/api/mail-group/message/" + id;
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            return MainGroupService;
        }());
        services.MainGroupService = MainGroupService;
        services.$module.service("$mailGroup", MainGroupService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var MemberService = (function () {
            function MemberService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
             * is account already exists
             * @param account
             */
            MemberService.prototype.isExists = function (name) {
                var _this = this;
                return this.$http.post("/api/member/exists/" + name, {})
                    .then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            /**
             * set new password
             */
            MemberService.prototype.setPassword = function (params) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post("/api/member/set-password/", params)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            MemberService.prototype.setPasswordByVerifyCode = function (model) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post("/api/passport/set-password", model)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            MemberService.prototype.applyForMaster = function (id) {
                var _this = this;
                var url = ["/api/member", id, "apply-for-master"].join("/");
                return this.$http.post(url, {}).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            MemberService.prototype.updateProfile = function (o) {
                var _this = this;
                var url = "/api/member/update-profile";
                return this.$http.post(url, o).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            /**
             * 获取指定的 member信息
             * @param mid id
             */
            MemberService.prototype.get = function (mid) {
                var _this = this;
                var url = "/api/member/" + mid;
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 获取会员列表.
             * @param filter
             */
            MemberService.prototype.getList = function (filter) {
                var _this = this;
                filter = filter || {};
                var url = "/api/member/";
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            return MemberService;
        }());
        services.MemberService = MemberService;
        services.$module.service("$member", MemberService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var NewsService = (function () {
            function NewsService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            /**
             * 获取商品列表
             * @param filter
             */
            NewsService.prototype.getList = function (filter) {
                var _this = this;
                return this.$http.get("/api/news", { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            /**
             * 获取商品
             * @param id
             */
            NewsService.prototype.get = function (id) {
                var _this = this;
                if (!id) {
                    return this.$q.reject(null);
                }
                else {
                    return this.$http.get("/api/news/" + id)
                        .then(function (rsp) {
                        var r = rsp.data;
                        return _this.$q.resolve(r);
                    });
                }
            };
            NewsService.prototype.updateOrAdd = function (data) {
                var _this = this;
                var url = "/api/news/update-or-add";
                return this.$http.post(url, data).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            return NewsService;
        }());
        services.NewsService = NewsService;
        services.$module.service("$news", NewsService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var OrderService = (function () {
            function OrderService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            /**
             * 指定商品的预定数量.
             * @param id
             */
            OrderService.prototype.bookingCount = function (id) {
                var _this = this;
                var url = ["/api/product", id, "booking-count"].join("/");
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             *
             * @param filter
             */
            OrderService.prototype.getList = function (filter) {
                var _this = this;
                var url = "/api/order";
                filter.v = Date.now();
                var cfg = { params: filter };
                return this.$http.get(url, cfg).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            OrderService.prototype.statusText = function (status) {
                switch (status) {
                    case 6: return "申请退货";
                    case 8: return "申请换货";
                    case 7: return "申请退货";
                    case 2: return "等待发货";
                    case 4: return "已经关闭";
                    case 5: return "已经完成";
                    case 7: return "已经发货";
                    case 1: return "等待付款";
                }
                return status.toString();
            };
            OrderService.prototype.get = function (id) {
                var _this = this;
                var url = "/api/order/" + id;
                return this.$http.get(url, {}).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            OrderService.prototype.close = function (id) {
                var _this = this;
                var url = "/api/order/close/" + id;
                return this.$http.post(url, {}).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            return OrderService;
        }());
        services.OrderService = OrderService;
        services.$module.service("$order", OrderService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        services.$module.factory("sessionService", function ($q, $window, $location) {
            var clientPack = $window.clientPack || {};
            return {
                /**
                 * $window.clientPack
                 */
                clientPack: clientPack,
                /**
                 * openid: 当前微信openid
                 */
                openId: clientPack.openId,
                /**
                 * signedMember:
                 */
                signedMember: clientPack.signedMember,
                goBack: function () {
                    var returnUrl = $location.search().returnUrl;
                    if (!returnUrl) {
                        $window.history.back();
                    }
                    else {
                        $location.url(returnUrl).replace();
                    }
                }
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var ShoppingcartService = (function () {
            function ShoppingcartService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
              * 获取购物车
              * @param opts 选项
              */
            ShoppingcartService.prototype.checkout = function (opts) {
                var _this = this;
                var deferred = this.$q.defer();
                opts = opts || {};
                if (!this._cart)
                    this._cart = (localStorage["shoppingcart"] && angular.fromJson(localStorage["shoppingcart"])) || { products: [] };
                if (!opts.refresh)
                    deferred.resolve(this._cart);
                else {
                    var api = "/api/shoppingcart/refresh";
                    this.$http.post(api, this._cart).then(function (httpRsl) {
                        var r = httpRsl.data;
                        _this._cart = r.data;
                        deferred.resolve(_this._cart);
                    });
                }
                return deferred.promise;
            };
            /**
             * 获取购物车中指定code的商品
             * @param code
             * @param opts
             */
            ShoppingcartService.prototype.findCode = function (code, opts) {
                var _this = this;
                return this.checkout(opts).then(function (r) {
                    var rsl = _.find(r.products, function (p) { return p.info && p.info.code == code; });
                    return _this.$q.resolve(rsl);
                });
            };
            /**
             * 获取商品项
             * @param id 商品id
             */
            ShoppingcartService.prototype.product = function (id, opts) {
                var _this = this;
                var deferred = this.$q.defer();
                opts = opts || {};
                this.checkout(opts).then(function (r) {
                    var product = _.find(_this._cart.products, function (it) { return it.productId == id; });
                    if (product != null)
                        deferred.resolve(product);
                    else {
                        var api = "/api/shoppingcart/product/" + id;
                        _this.$http.get(api).then(function (httpRsl) {
                            var r = httpRsl.data;
                            product = r.data;
                            _this._cart.products.push(product);
                            _this.save();
                            deferred.resolve(product);
                        });
                    }
                });
                return deferred.promise;
            };
            /**
             * 保存购物车数据.
             * @param shoppingcart 要保存的实例.
             */
            ShoppingcartService.prototype.save = function () {
                localStorage["shoppingcart"] = angular.toJson(this._cart);
            };
            /**
             * 清空购物车
             */
            ShoppingcartService.prototype.clear = function () {
                var cnt = this._cart.products.length;
                this._cart.products.splice(0, cnt);
                this.save();
            };
            /**
             * 计算商品总金额
             * @param product 商品
             */
            ShoppingcartService.prototype.productPrice = function (product) {
                var amount = this.productPriceWithOutZST(product);
                var zsr = this.zsReturn(product);
                amount = Math.max(0, amount - zsr);
                return amount;
            };
            /**
             * 获取指定商品的零库存返额.
             * @param product
             */
            ShoppingcartService.prototype.zsReturn = function (p) {
                if (!this.hasZsReturn(p))
                    return 0;
                var rsl = 0;
                var zs = p.ticket.zs;
                var price = (p.items[0] && p.items[0].sku.price) || 0;
                return Math.max(0, (zs.price - price) * zs.count);
            };
            /**
             * 计算商品总金额 (不包括零库存返额ZST)
             * @param product 商品
             */
            ShoppingcartService.prototype.productPriceWithOutZST = function (product) {
                var sum = 0;
                if (product && product.items) {
                    var useWholesalePrice = this.isUseWholesalePrice(product);
                    _.forEach(product.items, function (it) {
                        var p = useWholesalePrice ? product.info.wholesalePrice : it.sku.price;
                        sum += (p * it.buyCount);
                    });
                }
                return sum;
            };
            /**
             * 判断指定商品是否使用批发价计算金额
             * @param product 商品
             */
            ShoppingcartService.prototype.isUseWholesalePrice = function (product) {
                var minWholesaleCount = product.info.minWholesaleCount;
                return !!(minWholesaleCount && this.productSkuCount(product) >= minWholesaleCount);
            };
            /**
             * 判断指定商品是否有零库存返额.
             * @param product 商品
             */
            ShoppingcartService.prototype.hasZsReturn = function (product, sum) {
                return !!product.ticket.zs;
            };
            /**
             * 计算商品SKU数量
             * @param product 商品
             */
            ShoppingcartService.prototype.productSkuCount = function (product) {
                if (!product || !product.items)
                    return 0;
                var sum = 0;
                _.forEach(product.items, function (it) { sum += (it.buyCount); });
                return sum;
            };
            /**
             * 计算购物车总金额 (所有商品的价格)
             * @param shoppingcart 购物车
             */
            ShoppingcartService.prototype.shoppingcartPrice = function () {
                var _this = this;
                if (!this._cart)
                    return 0;
                var sum = 0;
                angular.forEach(this._cart.products, function (it) { sum += _this.productPrice(it); });
                return sum;
            };
            ShoppingcartService.prototype.addItem = function (item, product) {
                item.skuId = item.skuId || item.sku.id;
                var exi = _.find(product.items, function (it) { return it.skuId == item.skuId; });
                if (exi)
                    exi.buyCount += item.buyCount;
                else
                    product.items.push(item);
                this.save();
            };
            return ShoppingcartService;
        }());
        services.ShoppingcartService = ShoppingcartService;
        services.$module.service("$shoppingcart", ShoppingcartService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var ShopService = (function () {
            function ShopService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            ShopService.prototype.homeBanners = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeBanners)
                        resolve(_this._homeBanners);
                    else {
                        var url = "/api/poster/home-banner?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeBanners = r;
                            resolve(_this._homeBanners);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            ShopService.prototype.homeNavis = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeAds)
                        resolve(_this._homeAds);
                    else {
                        var url = "/Content/data/home-navi.json?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeAds = r;
                            resolve(_this._homeAds);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            ShopService.prototype.homeAds = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeNavis)
                        resolve(_this._homeNavis);
                    else {
                        var url = "/Content/data/home-ads.json?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeNavis = r;
                            resolve(_this._homeNavis);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            return ShopService;
        }());
        services.ShopService = ShopService;
        services.$module.service("$shop", ShopService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var UIService = (function () {
            function UIService($q, $window) {
                this.$q = $q;
                this.$window = $window;
                var _el = document.querySelector("#ui-lock-mask");
                var _tx = document.querySelector("#ui-lock-mask .text");
                this.el = angular.element(_el);
                this.tx = angular.element(_tx);
                this.defaultText = this.tx.text();
            }
            UIService.prototype.lockFor = function (s, p) {
                var _this = this;
                this.lock(s);
                return p.finally(function () {
                    _this.unlock();
                });
            };
            UIService.prototype.lock = function (text) {
                this.el.toggleClass("active", true);
                this.tx.text(text || this.defaultText || "");
            };
            UIService.prototype.unlock = function () {
                this.el.toggleClass("active", false);
            };
            UIService.prototype.acc = function (fn, s, errMsg) {
                var _this = this;
                if (s === void 0) { s = null; }
                if (errMsg === void 0) { errMsg = null; }
                this.lock(s);
                return fn().then(function (r) {
                    return _this.$q.resolve(r);
                }, function (r) {
                    errMsg = errMsg || (r && r.errMsg);
                    if (errMsg)
                        alert(errMsg);
                    return _this.$q.reject(r);
                }).finally(function () {
                    _this.unlock();
                });
            };
            return UIService;
        }());
        services.UIService = UIService;
        services.$module.service("$ui", UIService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var services;
    (function (services) {
        var VerifyService = (function () {
            function VerifyService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
             * send sms verify code
             * @param phone
             */
            VerifyService.prototype.sendSms = function (phone) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = { phone: phone };
                    _this.$http.post("/api/sms-verify/send", data)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            /**
             * test sms verify code
             * @param phone
             * @param code
             */
            VerifyService.prototype.testSms = function (phone, code) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = { phone: phone, code: code };
                    _this.$http.post("/api/sms-verify/test", data)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            return VerifyService;
        }());
        services.VerifyService = VerifyService;
        services.$module.service("$verify", VerifyService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));

var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module = angular.module("app.directives", []);
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=module.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        var IScrollController = (function () {
            function IScrollController($scope, $timeout, $interval) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$interval = $interval;
                this.holdingGesture = null;
                this.ready = false;
                this.wrapper = null;
                this.flow = null;
                this.inst = null;
                this.gesturePullDown = null;
                this.gesturePullUp = null;
                this.scrollBottom = null;
                this.scrollTop = null;
                this.autoRefresh = false;
                this.debug = false;
                $scope.$on("$destroy", function (e) {
                    _this.inst && _this.inst.destroy();
                });
            }
            IScrollController.prototype.init = function (wrapper, attrs) {
                var _this = this;
                if (attrs["gesturePullDown"])
                    this.gesturePullDown = this.$scope["gesturePullDown"];
                if (attrs["gesturePullUp"])
                    this.gesturePullUp = this.$scope["gesturePullUp"];
                if (attrs["scrollTop"])
                    this.scrollTop = this.$scope["scrollTop"];
                if (attrs["scrollBottom"])
                    this.scrollBottom = this.$scope["scrollBottom"];
                this.autoRefresh = (attrs["autoRefresh"] != null);
                this.debug = (attrs["debug"] != null);
                this.$timeout(function () {
                    var opts = { click: true };
                    if (_this.isNeedGestures()) {
                        _this.debug && console.log("iscroll probeType", opts.probeType);
                        opts.probeType = 2;
                    }
                    if (_this.gesturePullDown || _this.gesturePullUp)
                        opts.bounce = true;
                    _this.inst = new IScroll(wrapper.get(0), opts);
                    _this.wrapper = wrapper;
                    _this.flow = angular.element(_this.inst.scroller);
                    _this.initGestures();
                    _this.initAutoRefresh();
                    _this.wrapper.toggleClass("iscroll-wrapper", true);
                    _this.flow.toggleClass("iscroll-flow", true);
                    _this.ready = true;
                    if (_this.debug) {
                        console.log("iscroll init", _this);
                    }
                }, 200);
            };
            IScrollController.prototype.refresh = function () {
                var _this = this;
                this.$timeout(function () {
                    _this.inst && _this.inst.refresh();
                });
            };
            IScrollController.prototype.isNeedGestures = function () {
                return this.gesturePullDown || this.gesturePullUp || this.scrollTop || this.scrollBottom;
            };
            IScrollController.prototype.initGestures = function () {
                var _this = this;
                var threshold = 60;
                if (!this.isNeedGestures())
                    return;
                if (this.debug) {
                    console.log("iscroll initGestures", this.gesturePullDown, this.gesturePullUp);
                }
                this.inst.on("scroll", function () {
                    if (_this.inst.y >= threshold) {
                        if (_this.holdingGesture != "pull-down") {
                            _this.holdingGesture = "pull-down";
                            _this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", true);
                            if (_this.debug) {
                                console.log("iscroll scroll", _this.holdingGesture);
                            }
                        }
                    }
                    else if ((_this.inst.maxScrollY - _this.inst.y) >= threshold) {
                        if (_this.holdingGesture != "pull-up") {
                            _this.holdingGesture = "pull-up";
                            _this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", true);
                            if (_this.debug) {
                                console.log("iscroll scroll", _this.holdingGesture);
                            }
                        }
                    }
                });
                this.inst.on("scrollEnd", function () {
                    if (_this.holdingGesture) {
                        if (_this.debug) {
                            console.log("iscroll scrollEnd", _this.holdingGesture);
                        }
                        switch (_this.holdingGesture) {
                            case "pull-down":
                                _this.gesturePullDown && _this.gesturePullDown();
                                console.log("iscroll exec", _this.gesturePullDown);
                                _this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", false);
                                break;
                            case "pull-up":
                                _this.gesturePullUp && _this.gesturePullUp();
                                _this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", false);
                                break;
                        }
                        _this.holdingGesture = null;
                    }
                    _this.triggerScrollToEdge();
                });
            };
            IScrollController.prototype.triggerScrollToEdge = function () {
                if (this.inst.y >= 0)
                    this.scrollTop && this.scrollTop();
                if (this.inst.y <= this.inst.maxScrollY)
                    this.scrollBottom && this.scrollBottom();
            };
            IScrollController.prototype.initAutoRefresh = function () {
                // TODO: 启用自动 refresh
                //if (!this.autoRefresh)
                //    return;
                var _this = this;
                var timer = this.$interval(function () {
                    var flowHeight = _this.flow.outerHeight();
                    var wrapperHeight = _this.wrapper.outerHeight();
                    if (flowHeight < wrapperHeight
                        && _this.inst.scrollerHeight == wrapperHeight)
                        return;
                    if (_this.inst.scrollerHeight != flowHeight) {
                        if (_this.debug) {
                            console.log("refresh: auto", wrapperHeight, _this.inst.scrollerHeight, _this.flow.outerHeight(), _this.flow.height());
                        }
                        _this.refresh();
                    }
                }, 1200);
                this.$scope.$on("$destroy", function (e) {
                    timer && _this.$interval.cancel(timer);
                });
            };
            return IScrollController;
        }());
        directives.IScrollController = IScrollController;
        directives.$module.directive("iscroll", function ($window, $location, $timeout, $interval) {
            return {
                restrict: 'EA',
                scope: {
                    gesturePullDown: "&",
                    gesturePullUp: "&",
                    scrollTop: "&",
                    scrollBottom: "&",
                },
                controller: IScrollController,
                link: function (scope, element, attrs, ctrl) {
                    ctrl.init(element, attrs);
                    var name = attrs["name"];
                    if (name && scope.$parent) {
                        scope.$parent[name] = ctrl;
                    }
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=iscroll.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("iscrollSignGesturePullDown", function () {
            return {
                restrict: "E",
                templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullDown.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                }
            };
        });
        directives.$module.directive("iscrollSignGesturePullUp", function () {
            return {
                restrict: "E",
                templateUrl: "/Content/modules/src/directives/iscroll/tpl/IScrollSignGesturePullUp.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=iscrollSign.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("labelPriceType", function ($product) {
            return {
                restrict: 'E',
                templateUrl: "/Content/modules/src/directives/label-price-type/template.html?v=" + buildNumber,
                scope: {
                    priceType: "=",
                },
                link: function (scope, el, attrs) {
                    scope.tick = 0;
                    scope.labelStyle = attrs.labelStyle || "primary";
                    scope.text = function () {
                        var v = parseInt(scope.priceType);
                        return $product.priceTypeShortText(v);
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=directive.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        var SmsVerifySenderController = (function () {
            function SmsVerifySenderController() {
                this.cd = 0;
            }
            SmsVerifySenderController.prototype.send = function (phone) {
            };
            return SmsVerifySenderController;
        }());
        directives.SmsVerifySenderController = SmsVerifySenderController;
        directives.$module.directive("smsVerifySender", function ($interval, $verify) {
            return {
                restrict: 'A',
                scope: {
                    phone: "="
                },
                link: function (scope, el, attrs) {
                    var state = {};
                    scope["state"] = state;
                    if (attrs["smsVerifySender"])
                        scope.$parent[attrs["smsVerifySender"]] = state;
                    var timer = $interval(function () {
                        if (state.cd)
                            --state.cd;
                    }, 1000);
                    scope.$on("$destroy", function (e) {
                        $interval.cancel(timer);
                    });
                    el.on("click", function (e) {
                        if (scope["phone"] && !state.cd) {
                            $verify.sendSms(scope["phone"]);
                            state.cd = 60;
                        }
                    });
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=sms-verify-sender.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorEquals", function ($http, $q) {
            return {
                require: 'ngModel',
                scope: {
                    validatorEquals: "="
                },
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$validators["equals"] = function (val, viewValue) {
                        return val == scope["validatorEquals"];
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=Equals.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorSmsVerify", function ($q, $verify) {
            return {
                require: 'ngModel',
                scope: {
                    phone: "="
                },
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators.smsVerify = function (val, viewValue) {
                        if (!scope["phone"] || !val)
                            return $q.resolve();
                        return $verify.testSms(scope["phone"], val).then(function (r) {
                            return r ? $q.resolve(r) : $q.reject(r);
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=SmsVerify.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorTownAreaNotExists", function ($http, $q, $member) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators["townAreaNotExists"] = function (val, viewValue) {
                        var url = "/api/town/exists-area/" + val;
                        return $http.post(url, {}).then(function (rsp) {
                            var r = rsp.data;
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=TownAreaNotExists.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorUserIsLiving", function ($http, $q) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators.userIsLiving = function (val, viewValue) {
                        return $q(function (resolve, reject) {
                            if (!val)
                                reject();
                            else {
                                var url = "/api/member/is-living/" + val;
                                $http.post(url, {}).then(function (rsp) {
                                    var r = rsp.data;
                                    console.log(!!r);
                                    r ? resolve() : reject();
                                });
                            }
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=UserIsLiving.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("validatorUserNameNotExists", function ($http, $q, $member) {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {
                    ngModel.$asyncValidators["userNameNotExists"] = function (val, viewValue) {
                        return $member.isExists(val).then(function (r) {
                            return !r ? $q.resolve() : $q.reject();
                        });
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=UserNameNotExists.js.map
var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("toggleClass", function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var className = attrs["toggleClass"];
                    el.on("click", function (e) {
                        el.toggleClass(className);
                    });
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=toggle-class.js.map
var app;
(function (app) {
    app.$module = angular.module("app", ["app.services", "app.bmap", "app.directives", "ngRoute", "ngMessages", "plupload.module"]);
    app.$module.config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        var table = new app.utils.RouteTable({
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
            { title: "登录", path: "/passport/login", authorize: { allowAnonymous: true } },
            { title: "会员注册", path: "/passport/register", authorize: { allowAnonymous: true } },
            { title: "会员注册", path: "/passport/register-master", authorize: { allowAnonymous: true } },
            { title: "修改密码", path: "/passport/change-password", authorize: { allowAnonymous: true } },
            { title: "忘记密码", path: "/passport/forgot-password", authorize: { allowAnonymous: true } },
            /** 村庄靓点 */
            { title: "村庄风貌", path: "/album/details", authorize: { allowAnonymous: true } },
            { title: "村庄风貌", path: "/album/", authorize: { allowAnonymous: true } },
            /** 农产品 */
            { title: "村庄农产品", path: "/product/town", authorize: { allowAnonymous: true } },
            { title: "村庄农产品", path: "/product/details", authorize: { allowAnonymous: true } },
            { title: "村庄农产品", path: "/product/", authorize: { allowAnonymous: true } },
            /** 新闻 */
            { title: "新闻快讯", path: "/news/town", authorize: { allowAnonymous: true } },
            { title: "新闻快讯", path: "/news/details", authorize: { allowAnonymous: true } },
            { title: "新闻快讯", path: "/news/", authorize: { allowAnonymous: true } },
            /** 论坛 */
            { title: "村庄论坛", path: "/mail-group/town", authorize: { allowAnonymous: true } },
            { title: "村庄论坛", path: "/mail-group/reply" },
            { title: "村庄论坛", path: "/mail-group/post" },
            { title: "村庄论坛", path: "/mail-group/" },
            /** 村庄 */
            { title: "查找村庄", path: "/town/search", authorize: { allowAnonymous: true } },
            { title: "各地村庄", path: "/town/", authorize: { allowAnonymous: true } },
            /** 村庄主页 */
            { title: "", path: "/town/private/", authorize: { allowAnonymous: true } },
            /** 会员中心 */
            { title: "修改密码", path: "/member/change-password" },
            { title: "修改资料", path: "/member/profile" },
            { title: "修改头像", path: "/member/head" },
            { title: "微信绑定", path: "/member/bindwx" },
            { title: "会员中心", path: "/member/" },
            /** 站长:新闻管理 */
            { title: "发布新闻", path: "/member/news/edit" },
            { title: "新闻管理", path: "/member/news/" },
            /** 站长:相册管理 */
            { title: "发布照片", path: "/member/album/edit" },
            { title: "照片管理", path: "/member/album/" },
            /** 站长:农产品管理 */
            { title: "发布农产品", path: "/member/product/edit" },
            { title: "农产品管理", path: "/member/product/" },
            /** 其他 */
            { title: "帮助中心", path: "/helper/details", authorize: { allowAnonymous: true } },
            { title: "选择地址", path: "/pick-area", authorize: { allowAnonymous: true } },
            { title: "客户服务", path: "/customer-service", authorize: { allowAnonymous: true } },
            { title: "在线客服", path: "/online-service", authorize: { allowAnonymous: true } },
            { title: "联系我们", path: "/contact", authorize: { allowAnonymous: true } },
            { title: "", path: "/launcher", authorize: { allowAnonymous: true } },
            { title: "下载", path: "/download-app", authorize: { allowAnonymous: true } },
            { title: "意见反馈", path: "/feedback" },
            /** 首页 */
            { path: "/", authorize: { allowAnonymous: true } },
        ];
        table.register($routeProvider);
        $routeProvider.otherwise({ redirectTo: '/' });
    });
    app.$module.filter('msdate', function () {
        return function (input) {
            if (angular.isString(input) && input.indexOf("/Date(") == 0)
                input = new Date(parseInt(input.substr(6)));
            return input;
        };
    }).run(function ($rootScope, $route, $location, $ui, $identity) {
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
})(app || (app = {}));
//# sourceMappingURL=module.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberAlbumEditController = (function () {
            function MemberAlbumEditController($ui, $member, $identity, $album, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$album = $album;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberAlbumEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.acc(function () {
                    _this.model.albumId = _this.townId;
                    _this.model.memberId = _this.$identity.signedMember.id;
                    return _this.$album.updateOrAddPhoto(_this.model).then(function (r) {
                        console.log(r.data.id);
                        _this.$location.url("album/details").search({ id: r.data.id });
                    });
                });
            };
            return MemberAlbumEditController;
        }());
        ;
        app.$module.controller("MemberAlbumEditController", MemberAlbumEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberAlbumEditController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberAlbumIndexController = (function () {
            function MemberAlbumIndexController($ui, $member, $identity, $album, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$album = $album;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberAlbumIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberAlbumIndexController;
        }());
        ;
        app.$module.controller("MemberAlbumIndexController", MemberAlbumIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberAlbumIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberNewsEditController = (function () {
            function MemberNewsEditController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.townId = $identity.signedMember.townId;
                this.model = {
                    date: new Date(),
                    townId: this.townId
                };
            }
            MemberNewsEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.lockFor("正在发布", this.$news.updateOrAdd(this.model)).then(function (r) {
                    alert("发布成功!");
                    _this.$location.url("news/?townId=" + _this.townId);
                });
            };
            return MemberNewsEditController;
        }());
        ;
        app.$module.controller("MemberNewsEditController", MemberNewsEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberNewsEditController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberNewsIndexController = (function () {
            function MemberNewsIndexController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberNewsIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberNewsIndexController;
        }());
        ;
        app.$module.controller("MemberNewsIndexController", MemberNewsIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberNewsIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberProductEditController = (function () {
            function MemberProductEditController($ui, $member, $identity, $product, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$product = $product;
                this.$scope = $scope;
                this.$location = $location;
                this.townId = $identity.signedMember.townId;
                this.model = {
                    date: new Date(),
                    townId: this.townId
                };
            }
            MemberProductEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.lockFor("正在发布", this.$product.updateOrAdd(this.model)).then(function (r) {
                    alert("发布成功!");
                    _this.$location.url("product/?townId=" + _this.townId);
                });
            };
            return MemberProductEditController;
        }());
        ;
        app.$module.controller("MemberProductEditController", MemberProductEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberProductEditController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MemberProductIndexController = (function () {
            function MemberProductIndexController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberProductIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberProductIndexController;
        }());
        ;
        app.$module.controller("MemberProductIndexController", MemberProductIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberProductIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var TownPrivateIndexController = (function () {
            function TownPrivateIndexController($ui, $town, $album, $member, $identity, $sce, $rootScope, $location) {
                var _this = this;
                this.$ui = $ui;
                this.$town = $town;
                this.$album = $album;
                this.$member = $member;
                this.$identity = $identity;
                this.$sce = $sce;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.member = null;
                var id = $location.search().id;
                this.load(id);
                this.loadPhotos(id);
                $identity.checkout().then(function (r) {
                    _this.member = $identity.signedMember;
                });
            }
            TownPrivateIndexController.prototype.load = function (id) {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = {};
                    return _this.$town.get(id).then(function (r) {
                        _this.town = r;
                        _this.town.content = _this.$sce.trustAsHtml(_this.town.content || "");
                        _this.town.desc = _this.$sce.trustAsHtml(_this.town.desc || "");
                        _this.$rootScope["pageTitle"] = _this.town.name;
                    });
                });
            };
            TownPrivateIndexController.prototype.loadPhotos = function (id) {
                var _this = this;
                var filter = { albumId: id, take: 5 };
                this.$album.getPhotoList(filter).then(function (r) {
                    _this.photos = r.data;
                    _.forEach(_this.photos, function (it) {
                        it.linkUrl = "album/details?id=" + it.id;
                    });
                    if (_this.photos.length == 0) {
                        // 使用推广图片
                        _this.photos = [
                            { imageUrl: "/Content/themes/res/t/t.1.jpg", name: "无路您身处何处，家才是温馨的港湾！" },
                            { imageUrl: "/Content/themes/res/t/t.2.jpg", name: "《天下村》全国村庄网站创始人申请报名中，详情咨询0577-26669665" },
                            { imageUrl: "/Content/themes/res/t/t.3.jpg", name: "别忘了《天下村》不仅能让您找到家的感觉，还能让游子寄托思乡情怀。" },
                            { imageUrl: "/Content/themes/res/t/t.4.jpg", name: "《天下村》记载各村庄的历史文化、村庄农产品、新闻趣事和名人事迹等" }
                        ];
                    }
                });
            };
            /**
             * 申请成为站长.
             */
            TownPrivateIndexController.prototype.applyForMaster = function () {
                this.$member.applyForMaster(this.member.id).then(function (r) {
                    alert("申请成功! 我司客服人员将会和您联系核实");
                }).catch(function (r) {
                    alert("申请失败! 您已经申请过了或者该村已有站长");
                });
            };
            return TownPrivateIndexController;
        }());
        app.$module.controller("TownPrivateIndexController", TownPrivateIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownPrivateIndexController.js.map
'use strict';
/***
     * 指令: 返回
     */
angular.module("app")
    .directive("homeSearchScroller", function ($window, $location, $interval) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var el = element[0];
            var form = el.querySelector(".form-search");
            var h = form.offsetTop;
            var wrappedForm = angular.element(form);
            var timer = $interval(function () {
                var st = el.scrollTop;
                var opacity = Math.min(1, (st / h));
                form.style.backgroundColor = "rgba(255, 60, 0, " + opacity + ")";
                wrappedForm.toggleClass("fixed", (st >= h));
            }, 300);
            scope.$on("$destroy", function () {
                timer && $interval.cancel(timer);
            });
        }
    };
});
/***
     * 指令: 返回
     */
angular.module("app")
    .directive("goBack", function ($window, $location, sessionService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (e) {
                sessionService.goBack();
                return false;
            });
        }
    };
});
angular.module("app")
    .directive("goTop", function ($window, $location, sessionService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on("click", function (e) {
                e.preventDefault();
                if (attrs["scroller"]) {
                    var scroller = angular.element(attrs["scroller"]);
                    if (scroller.length) {
                        var iscroll = scroller.data("iscroll");
                        if (iscroll)
                            iscroll.scrollTo(0, 0);
                        else {
                            scroller.scrollTop(0);
                        }
                    }
                }
            });
        }
    };
});
angular.module("app")
    .directive("collapse", function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            collapse: "=",
            expandCallback: "&",
            expandCallbackDelay: "@",
            collapseCallback: "&",
            collapseCallbackDelay: "@",
        },
        link: function (scope, element, attrs) {
            $timeout(function () {
                var mh = element.height();
                element.data("mh", mh);
                element.css("max-height", mh + "px");
                scope.$watch("collapse", function (val) {
                    if (!val) {
                        var mh = element.data("mh") || 0;
                        element.css("max-height", mh + "px");
                        if (scope.expandCallback) {
                            var delay = parseInt(scope.expandCallbackDelay) || 0;
                            $timeout(function () {
                                scope.expandCallback();
                            }, delay);
                        }
                    }
                    else {
                        element.css("max-height", "0");
                        if (scope.collapseCallback) {
                            var delay = parseInt(scope.collapseCallbackDelay) || 0;
                            $timeout(function () {
                                scope.collapseCallback();
                            }, delay);
                        }
                    }
                });
            }, 0);
        }
    };
});
/***
 * 指令: 返回
 */
angular.module("app")
    .directive("goExtern", function ($window, $location, $ui) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (e) {
                $ui.lock();
            });
        }
    };
});
/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("goReload", function ($route, $location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (e) {
                $route.reload();
            });
        }
    };
});
/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("lock", function ($ui, $route) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function (e) {
                $route.reload();
            });
        }
    };
});
angular.module("app")
    .directive("formValidate", function ($window, $location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            switch (attrs.formValidate) {
                case "group": {
                    var form = angular.element(element);
                    form.attr("novalidate", "novalidate");
                    form.prop("novalidate", true);
                    angular.forEach(form.find(".form-group"), function (group) {
                        group = angular.element(group);
                        var error = group.find(".error-block");
                        angular.forEach(group.find("input,textarea,select"), function (input) {
                            input = angular.element(input);
                            input.bind("invalid", function (e) {
                                var message = input.prop("validationMessage");
                                if (input.prop("validity").patternMismatch)
                                    message = input.data("pattern-text") || input.prop("title") || message;
                                group.toggleClass("has-error", true);
                                error.text(message);
                            });
                            input.bind("focus", function (e) {
                                group.toggleClass("has-error", false);
                                error.text("");
                            });
                        });
                    });
                    break;
                }
            }
        }
    };
});
/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("viewUnslider", function ($route, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/view-unslider.html?v=' + buildNumber,
        replace: true,
        scope: {
            source: "@",
            images: "=",
            items: "=",
            width: "@",
            height: "@",
            autoplay: "="
        },
        controller: function ($q, $scope, $http) {
            this.getItems = function () {
                return $q(function (resolve, reject) {
                    if ($scope.items) {
                        resolve({ data: $scope.items });
                    }
                    else if ($scope.images) {
                        var items = [];
                        _.forEach($scope.images, function (m) {
                            items.push({ imageUrl: m, linkUrl: "", });
                        });
                        resolve({ data: items });
                    }
                    else if ($scope.source) {
                        $http.get("/api/poster/home-banner").then(function (r) {
                            resolve(r.data);
                        });
                    }
                    else {
                        resolve({ data: [] });
                    }
                });
            };
        },
        link: function (scope, element, attrs, ctrl) {
            var w = parseInt(scope.width || 0) || 0;
            var h = parseInt(scope.height || 0) || 0;
            scope.ctrl = ctrl;
            ctrl.getItems().then(function (r) {
                ctrl.items = r.data;
                if (ctrl.items && ctrl.items.length == 1)
                    ctrl.items.push(angular.extend({}, ctrl.items[0]));
                setTimeout(function () {
                    $(element).find(".unslider-win").slidesjs({
                        width: w,
                        height: h,
                        play: {
                            interval: 3000,
                            auto: !!scope.autoplay,
                        }
                    });
                }, 0);
            });
        },
    };
});
angular.module("app")
    .directive("repairmanPicker", function ($window, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/repairman-picker.html?v=' + buildNumber,
        replace: true,
        scope: {
            ngModel: "="
        },
        link: function (scope, element, attrs) {
            // link
            scope.placeHolder = attrs.placeholder;
            scope.name = attrs.name;
        },
        controller: function ($scope, $http, repairOrderService, $ui) {
            /**
             * statusText
             */
            $scope.persons = null;
            $scope.open = function () {
                if ($scope.persons) {
                    $scope.isOpen = true;
                }
                else {
                    var params = {
                        role: "repairorder.repairman"
                    };
                    $ui.lock();
                    $http.get("/api/member", { params: params }).then(function (r) {
                        r = r.data;
                        $ui.unlock();
                        $scope.persons = r.data;
                        $scope.isOpen = true;
                    });
                }
            };
            $scope.pickedPerson = function () {
                var result = null;
                angular.forEach($scope.persons || [], function (person) {
                    if ($scope.ngModel == person.id) {
                        result = person;
                        return false;
                    }
                });
                return result;
            };
            $scope.close = function () {
                $scope.isOpen = false;
            };
            $scope.pick = function (person) {
                $scope.close();
                $scope.ngModel = person.id;
            };
        }
    };
});
angular.module("app")
    .directive("dropdownMenuMe", function ($window, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/dropdown-menu-me.html?v=' + buildNumber,
        replace: true,
        scope: {},
        link: function (scope, element, attrs) {
            // link
        },
        controller: function ($scope, $http, $ui) {
            /**
             * statusText
             */
            $scope.signOut = function () {
                if (confirm("确认要退出吗?")) {
                    $ui.lock();
                    $http.post("/api/passport/signout").then(function (r) {
                        r = r.data;
                        $ui.unlock();
                        if (r.success) {
                            $location.url("passport/login").replace();
                        }
                    });
                }
            };
        }
    };
});
angular.module("app")
    .directive("viewRepairorderList", function ($window, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/view-repairorder-list.html?v=' + buildNumber,
        replace: true,
        scope: {
            orders: '=orders',
            orderby: '=orderby'
        },
        link: function (scope, element, attrs) {
            // link
        },
        controller: function ($scope, repairOrderService) {
            /**
             * statusText
             */
            $scope.statusText = function (order) {
                return repairOrderService.statusText[order.status];
            };
        }
    };
});
angular.module("app")
    .directive("viewFooterNavi", function ($window, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/view-footer-navi.html?v=' + buildNumber,
        replace: true,
        scope: {
            active: '=active'
        },
        link: function (scope, el, attrs) {
            // link
            var active = scope.active || attrs.active;
            if (active) {
                el = angular.element(el);
                el.find("[data-var='" + active + "']").toggleClass("active", true);
            }
        },
        controller: function ($scope, sessionService) {
            $scope.signedMember = sessionService.signedMember;
            $scope.inRole = function (roleName) {
                return $scope.signedMember
                    && $scope.signedMember.roles
                    && $scope.signedMember.roles.indexOf(roleName) != -1;
            };
            $scope.showManage = ($scope.inRole('system.administrator') || $scope.inRole('repairorder.dispatcher'));
        }
    };
});
angular.module("app")
    .directive("viewTitle", function ($window, $location) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/view-title.html?v=' + buildNumber,
        replace: true,
        scope: {},
        link: function (scope, el, attrs) {
        },
        controller: function ($scope) {
        }
    };
});
angular.module("app")
    .directive("viewQrcode", function ($window, $location, $interval) {
    return {
        restrict: 'E',
        templateUrl: '/content/modules/src/main/_partials/view-qrcode.html?v=' + buildNumber,
        replace: true,
        scope: {
            value: '=',
        },
        link: function (scope, el, attrs) {
            var inner = angular.element(el).find(".inner");
            var val = scope.value;
            var qrcode = new QRCode(inner.get(0), { text: val });
            var timer = $interval(function () {
                if (val != scope.value) {
                    val = scope.value;
                    qrcode.makeCode(val);
                }
            }, 500);
            scope.$on("$destroy", function () {
                timer && $interval.cancel(timer);
                qrcode && qrcode.clear();
            });
        }
    };
});
//# sourceMappingURL=app.directives.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var AddressFromInputController = (function () {
            function AddressFromInputController($bmap, $interval, $location, $scope) {
                var _this = this;
                this.$bmap = $bmap;
                this.$interval = $interval;
                this.$location = $location;
                this.$scope = $scope;
                this.busy = false;
                this.$bmap.herePOI().then(function (r) {
                    var result = r.result;
                    _this.city = (result && result.addressComponent.city || "温州市");
                    _this.location = (result && result.location) || null;
                }, function (r) {
                    _this.city = "温州市";
                }).finally(function () {
                    //alert("搜索范围已定位到" + this.city);
                });
                var timer = this.$interval(function () {
                    if (!_this.busy && _this.lastAddress != _this.address) {
                        _this.busy = true;
                        _this.lastAddress = _this.address;
                        _this.$bmap.placeSuggestion(_this.lastAddress, _this.city, _this.location).then(function (r) {
                            _this.options = r.result;
                        }).finally(function () {
                            _this.busy = false;
                        });
                    }
                }, 800);
                this.$scope.$on("$destroy", function (e) {
                    timer && _this.$interval.cancel(timer);
                });
            }
            /**
             * 提交结果.
             * @param val
             */
            AddressFromInputController.prototype.submit = function (val) {
                this.$location.url("address").search({ address: val });
            };
            return AddressFromInputController;
        }());
        app.$module.controller("AddressFromInputController", AddressFromInputController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressFromInputController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var AddressFromMapController = (function () {
            function AddressFromMapController($bmap, $interval, $scope, $location, $timeout) {
                this.$bmap = $bmap;
                this.$interval = $interval;
                this.$scope = $scope;
                this.$location = $location;
                this.$timeout = $timeout;
                this.busy = false;
                this.marker = null;
                this.moving = false;
            }
            AddressFromMapController.prototype.initMap = function () {
                var _this = this;
                this.createMap();
                console.log("init-map");
                this.map.addEventListener("movestart", function (e) {
                    _this.moving = true;
                });
                this.map.addEventListener("moving", function (e) {
                });
                this.map.addEventListener("moveend", function (e) {
                    var center = _this.map.getCenter();
                    _this.moving = false;
                    if (!_this.busy
                        && center
                        && (!_this.lastCenter || !center.equals(_this.lastCenter))) {
                        _this.busy = true;
                        _this.lastCenter = center;
                        if (_this.marker) {
                            _this.marker.setPosition(center);
                        }
                        _this.$bmap.geoDecode(center).then(function (r) {
                            _this.options = r.result.pois;
                        }).finally(function () {
                            _this.busy = false;
                        });
                    }
                });
            };
            /**
             * 创建地图.
             * @param el
             */
            AddressFromMapController.prototype.createMap = function () {
                var _this = this;
                var el = document.getElementById("bmap-wrapper");
                this.map = new BMap.Map(el);
                var geolocationControl = new BMap.GeolocationControl();
                var navigationControl = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                    enableGeolocation: true
                });
                this.map.addControl(navigationControl);
                this.map.addControl(geolocationControl);
                this.map.centerAndZoom(new BMap.Point(120.705869, 28.000845), 17);
                this.$bmap.hereBMP().then(function (r) {
                    var c = new BMap.Point(r.lng, r.lat);
                    _this.map.centerAndZoom(c, 17);
                    _this.marker = new BMap.Marker(c);
                    _this.map.addOverlay(_this.marker);
                    _this.marker.enableDragging();
                    _this.marker.addEventListener("dragend", function (e) {
                        _this.map.panTo(e.point);
                    });
                }, function () {
                    alert("定位失败!");
                });
            };
            /**
             * 提交结果.
             * @param val
             */
            AddressFromMapController.prototype.submit = function (val) {
                this.$location.url("address").search({ address: val });
            };
            return AddressFromMapController;
        }());
        app.$module.controller("AddressFromMapController", AddressFromMapController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressFromMapController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var AddressIndexController = (function () {
            function AddressIndexController($location) {
                this.$location = $location;
                this.address = $location.search().address;
            }
            return AddressIndexController;
        }());
        app.$module.controller("AddressIndexController", AddressIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var AlbumDetailsController = (function () {
            function AlbumDetailsController($town, $rootScope, $album, $ui, $location) {
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$album = $album;
                this.$ui = $ui;
                this.$location = $location;
                var o = $location.search();
                this.load(o);
            }
            AlbumDetailsController.prototype.load = function (o) {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = { includes: "prev,next" };
                    return (o.albumId
                        ? _this.$album.getFirstPhoto(o.albumId, filter)
                        : _this.$album.getPhoto(o.id, filter)).then(function (r) {
                        _this.photo = r;
                        if (_this.photo.albumId) {
                            _this.$town.get(_this.photo.albumId).then(function (r) {
                                _this.$rootScope["pageTitle"] = r.name + "风貌";
                            });
                        }
                    });
                });
            };
            return AlbumDetailsController;
        }());
        main.AlbumDetailsController = AlbumDetailsController;
        app.$module.controller("AlbumDetailsController", AlbumDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AlbumDetailsController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var AlbumIndexController = (function () {
            function AlbumIndexController($album, $ui, $location) {
                this.$album = $album;
                this.$ui = $ui;
                this.$location = $location;
                this.load();
            }
            AlbumIndexController.prototype.load = function () {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = {
                        includes: ["photoCount"]
                    };
                    return _this.$album.getAlbumList(filter).then(function (r) {
                        _this.albums = r.data;
                    });
                });
            };
            return AlbumIndexController;
        }());
        main.AlbumIndexController = AlbumIndexController;
        app.$module.controller("AlbumIndexController", AlbumIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AlbumIndexController.js.map
var app;
(function (app) {
    var article;
    (function (article) {
        var ArticleDetailsController = (function () {
            function ArticleDetailsController($location, $http, $sce, $timeout, $ui) {
                var _this = this;
                this.$location = $location;
                this.$http = $http;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.$ui = $ui;
                this.content = null;
                this.title = $location.search().title || "";
                var id = $location.search().id;
                this.$ui.lock();
                this.$http.get("/api/article/" + id)
                    .then(function (httpRsl) {
                    _this.$ui.unlock();
                    var r = httpRsl.data;
                    _this.article = r.data;
                    _this.title = _this.article.title;
                    _this.content = _this.$sce.trustAsHtml(_this.article.content);
                }, function (httpRsl) {
                    _this.$ui.unlock();
                    alert("系统繁忙, 请稍候再试");
                });
            }
            return ArticleDetailsController;
        }());
        app.$module.controller("ArticleDetailsController", ArticleDetailsController);
    })(article = app.article || (app.article = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsController.js.map
var app;
(function (app) {
    var DiagnosisIndexController = (function () {
        function DiagnosisIndexController() {
            this.userAgent = window.navigator.userAgent;
        }
        return DiagnosisIndexController;
    }());
    app.$module.controller("DiagnosisIndexController", DiagnosisIndexController);
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map
angular.module("app")
    .directive("smsVerifyTaker", function ($window, $interval, $verify, $ui) {
    return {
        restrict: 'E',
        templateUrl: "/Content/modules/src/main/directives/SmsVerifyTaker.html?v=" + buildNumber,
        scope: {
            phone: "=",
            successText: "@",
        },
        link: function (scope, el, attrs) {
            scope.tick = 0;
            var timer = $interval(function () {
                if (scope.tick > 0)
                    --scope.tick;
            }, 1000);
            scope.$on("$destroy", function () {
                timer && $interval.cancel(timer);
            });
            /**
             * get sms verify code
             */
            scope.get = function () {
                if (!scope.tick && scope.phone) {
                    $ui.lock("正在获取");
                    $verify.sendSms(scope.phone).then(function (r) {
                        $ui.unlock();
                        if (r.success) {
                            scope.tick = 45;
                            if (scope.successText)
                                alert(scope.successText);
                        }
                    }, function (r) {
                        $ui.unlock();
                    });
                }
            };
            scope.isAllowed = function () {
                return !scope.tick && /\d{11}/.test(scope.phone);
            };
        }
    };
});
//# sourceMappingURL=SmsVerifyTaker.js.map
var app;
(function (app) {
    var HomeCustomerServiceController = (function () {
        function HomeCustomerServiceController() {
        }
        HomeCustomerServiceController.prototype.goBdsq = function () {
            var a = document.getElementById("QIAO_ICON_CONTAINER");
            location.href = a.href;
        };
        return HomeCustomerServiceController;
    }());
    ;
    app.$module.controller("HomeCustomerServiceController", HomeCustomerServiceController);
})(app || (app = {}));
//# sourceMappingURL=CustomerServiceController.js.map
var app;
(function (app) {
    var HomeContactController = (function () {
        function HomeContactController() {
        }
        return HomeContactController;
    }());
    ;
    app.$module.controller("HomeContactController", HomeContactController);
})(app || (app = {}));
//# sourceMappingURL=HomeContactController.js.map
var app;
(function (app) {
    var HomeDownloadAppController = (function () {
        function HomeDownloadAppController() {
        }
        return HomeDownloadAppController;
    }());
    ;
    app.$module.controller("HomeDownloadAppController", HomeDownloadAppController);
})(app || (app = {}));
//# sourceMappingURL=HomeDownloadAppController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var HomeFeedbackController = (function () {
            function HomeFeedbackController($ui, $http) {
                this.$ui = $ui;
                this.$http = $http;
            }
            HomeFeedbackController.prototype.submit = function () {
            };
            return HomeFeedbackController;
        }());
        main.HomeFeedbackController = HomeFeedbackController;
        app.$module.controller("HomeFeedbackController", HomeFeedbackController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeFeedbackController.js.map
var app;
(function (app) {
    var HomeOnlineServiceController = (function () {
        function HomeOnlineServiceController($ui, $interval, $scope) {
            var _this = this;
            this.$ui = $ui;
            this.$interval = $interval;
            this.$scope = $scope;
            this.$ui.lock("正在连接, 请稍候");
            $scope.$on("$destory", function () {
                timer && _this.$interval.cancel(timer);
            });
            var timer = $interval(function () {
                var a = document.getElementById("QIAO_ICON_CONTAINER");
                if (a && a.href) {
                    _this.$interval.cancel(timer);
                    _this.$ui.unlock();
                    timer = null;
                    var iframe = document.getElementById("iframe-online-service");
                    iframe.src = a.href;
                }
            }, 200);
        }
        return HomeOnlineServiceController;
    }());
    ;
    app.$module.controller("HomeOnlineServiceController", HomeOnlineServiceController);
})(app || (app = {}));
//# sourceMappingURL=HomeOnlineServiceController.js.map
var app;
(function (app) {
    var HomeOnlineServiceController = (function () {
        function HomeOnlineServiceController($ui, $interval, $scope) {
            var _this = this;
            this.$ui = $ui;
            this.$interval = $interval;
            this.$scope = $scope;
            this.$ui.lock("正在连接, 请稍候");
            $scope.$on("$destory", function () {
                timer && _this.$interval.cancel(timer);
            });
            var timer = $interval(function () {
                var a = document.getElementById("QIAO_ICON_CONTAINER");
                if (a && a.href) {
                    _this.$interval.cancel(timer);
                    _this.$ui.unlock();
                    timer = null;
                    var iframe = document.getElementById("iframe-online-service");
                    iframe.src = a.href;
                }
            }, 200);
        }
        return HomeOnlineServiceController;
    }());
    ;
    app.$module.controller("HomeOnlineServiceController", HomeOnlineServiceController);
})(app || (app = {}));
//# sourceMappingURL=HomeOnlineServiceController.js.map
var app;
(function (app) {
    var HomeIndexController = (function () {
        function HomeIndexController($location, $ui, $http, $identity, $shop) {
            var _this = this;
            this.$location = $location;
            this.$ui = $ui;
            this.$http = $http;
            this.$identity = $identity;
            this.$shop = $shop;
            $identity.checkout().then(function (r) {
                _this.member = r;
            });
        }
        return HomeIndexController;
    }());
    app.$module.controller("HomeIndexController", HomeIndexController);
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map
var app;
(function (app) {
    var HomeIndexController = (function () {
        function HomeIndexController($location, $ui, $http, $identity, $shop) {
            var _this = this;
            this.$location = $location;
            this.$ui = $ui;
            this.$http = $http;
            this.$identity = $identity;
            this.$shop = $shop;
            $identity.checkout().then(function (r) {
                _this.member = r;
            });
        }
        return HomeIndexController;
    }());
    app.$module.controller("HomeIndexController", HomeIndexController);
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map
var app;
(function (app) {
    var HomeLauncherController = (function () {
        function HomeLauncherController($location, $timeout, $ui) {
            var _this = this;
            this.$location = $location;
            this.$timeout = $timeout;
            this.$ui = $ui;
            this.images = [
                "/Content/themes/images/launchers/01.jpg?v=4",
            ];
            this.timer = this.$timeout(function () {
                _this.go();
            }, 3000);
        }
        HomeLauncherController.prototype.go = function () {
            this.$timeout.cancel(this.timer);
            this.$location.url("/");
        };
        return HomeLauncherController;
    }());
    app.$module.controller("HomeLauncherController", HomeLauncherController);
})(app || (app = {}));
//# sourceMappingURL=LauncherController.js.map
var app;
(function (app) {
    var HomePickAreaController = (function () {
        function HomePickAreaController($ui, $http, $location, $route, $q) {
            this.$ui = $ui;
            this.$http = $http;
            this.$location = $location;
            this.$route = $route;
            this.$q = $q;
            this.data = null;
            this.hasNextView = true;
            this.selected = null;
            this.returnUrl = $location.search().returnUrl;
            this.reset();
        }
        HomePickAreaController.prototype.reset = function () {
            var _this = this;
            this.selected = null;
            this.hasNextView = true;
            this.$ui.acc(function () {
                return _this.getAreas(null).then(function (r) {
                    _this.data = r;
                });
            });
        };
        HomePickAreaController.prototype.getAreas = function (parentId) {
            var _this = this;
            var filter = { parentId: parentId };
            return this.$http.get("/api/area", { params: filter }).then(function (rsp) {
                var r = rsp.data;
                return _this.$q.resolve(r.data);
            });
        };
        HomePickAreaController.prototype.return = function () {
            this.$location.url(this.returnUrl).search({ areaId: this.selected });
        };
        HomePickAreaController.prototype.pick = function (it) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.getAreas(it.id).then(function (r) {
                    if (r.length) {
                        _this.data = r;
                    }
                    else {
                        _this.hasNextView = false;
                        _this.selected = it.id;
                    }
                });
            });
        };
        return HomePickAreaController;
    }());
    app.$module.controller("HomePickAreaController", HomePickAreaController);
})(app || (app = {}));
//# sourceMappingURL=PickAreaController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        app.$module.filter("mailGroupDate", function ($filter) {
            return function (input, type) {
                var date = angular.isDate(input) ? input : new Date(input);
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var before1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                var before2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
                if (date > today)
                    return $filter("date")(date, "今天 HH:mm");
                else if (date > before1)
                    return $filter("date")(date, "昨天 HH:mm");
                else if (date > before2)
                    return $filter("date")(date, "前天 HH:mm");
                return $filter("date")(date, "yyyy-MM-dd HH:mm");
            };
        });
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=filter.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MailGroupPostController = (function () {
            function MailGroupPostController($rootScope, $mailGroup, $ui, $identity, $route, $location) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$mailGroup = $mailGroup;
                this.$ui = $ui;
                this.$identity = $identity;
                this.$route = $route;
                this.$location = $location;
                this.model = {
                    targetId: $location.search().reply,
                    townId: $location.search().id,
                    memberId: this.$identity.signedMember.id
                };
                if (this.model.targetId) {
                    this.$mailGroup.getMessage(this.model.targetId).then(function (r) {
                        _this.target = r;
                    });
                }
                $rootScope["pageTitle"] = (this.model.targetId ? "回复" : "发言");
            }
            MailGroupPostController.prototype.submit = function () {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$mailGroup.postMessage(_this.model).then(function (r) {
                        _this.$location.url("mail-group/town?id=" + r.townId).replace();
                    });
                });
            };
            return MailGroupPostController;
        }());
        main.MailGroupPostController = MailGroupPostController;
        app.$module.controller("MailGroupPostController", MailGroupPostController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MailGroupPostController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var MailGroupTownController = (function () {
            function MailGroupTownController($town, $rootScope, $mailGroup, $ui, $identity, $location) {
                var _this = this;
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$mailGroup = $mailGroup;
                this.$ui = $ui;
                this.$identity = $identity;
                this.$location = $location;
                this.messages = [];
                this.member = null;
                this.loading = false;
                this.noMore = false;
                this.id = $location.search().id;
                this.replyStatus = $location.search().replyStatus;
                this.load();
                this.$identity.checkout().then(function (r) {
                    _this.member = r;
                });
                if (this.id) {
                    this.$town.get(this.id).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "论坛";
                    });
                }
            }
            MailGroupTownController.prototype.load = function () {
                var _this = this;
                if (this.noMore || this.loading)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    var filter = {
                        townId: _this.id,
                        take: 30,
                        skip: _this.messages.length,
                        replyStatus: _this.replyStatus
                    };
                    return _this.$mailGroup.getMessageList(filter).then(function (r) {
                        Array.prototype.push.apply(_this.messages, r.data);
                        if (!r.data.length)
                            _this.noMore = true;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return MailGroupTownController;
        }());
        main.MailGroupTownController = MailGroupTownController;
        app.$module.controller("MailGroupTownController", MailGroupTownController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MailGroupTownController.js.map
var app;
(function (app) {
    var MemberChangePasswordController = (function () {
        function MemberChangePasswordController($location, $ui, $member, $identity) {
            this.$location = $location;
            this.$ui = $ui;
            this.$member = $member;
            this.$identity = $identity;
            this.model = {
                tel: this.$identity.signedMember.userName
            };
        }
        MemberChangePasswordController.prototype.checkPassword = function (input) {
            var _this = this;
            input.$setDirty();
            var password = this.model.oldPassword;
            var account = this.$identity.signedMember.name;
            if (password) {
                this.$ui.lock("正在验证");
                this.$identity.testPassword(account, password)
                    .then(function (r) {
                    _this.$ui.unlock();
                    console.log(r);
                    input.$setValidity("test", r);
                });
            }
        };
        MemberChangePasswordController.prototype.submit = function () {
            var _this = this;
            this.$ui.lock("正在保存");
            this.model.id = this.$identity.signedMember.id;
            this.$member.setPassword(this.model).then(function (r) {
                _this.$ui.unlock();
                if (r.success) {
                    alert("新密码已经保存");
                    _this.$location.url("member");
                }
            });
        };
        return MemberChangePasswordController;
    }());
    app.$module.controller("MemberChangePasswordController", MemberChangePasswordController);
})(app || (app = {}));
//# sourceMappingURL=ChangePasswordController.js.map
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
var app;
(function (app) {
    var MemberFavoriteController = (function () {
        function MemberFavoriteController($ui, $favorite) {
            var _this = this;
            this.$ui = $ui;
            this.$favorite = $favorite;
            $ui.lock("正在获取收藏夹");
            $favorite.products().then(function (r) {
                $ui.unlock();
                _this.products = r.data;
            });
        }
        /**
         * 移除收藏
         * @param product
         */
        MemberFavoriteController.prototype.remove = function (it) {
            var i = this.products.indexOf(it);
            this.products.splice(i, 1);
            this.$favorite.toggle(it.id).then(function (r) {
                /** 删除成功 */
            });
        };
        return MemberFavoriteController;
    }());
    app.$module.controller("MemberFavoriteController", MemberFavoriteController);
})(app || (app = {}));
//# sourceMappingURL=MemberFavoriteController.js.map
var app;
(function (app) {
    var MemberProfileController = (function () {
        function MemberProfileController($ui, $identity, $member, $scope, $location) {
            this.$ui = $ui;
            this.$identity = $identity;
            this.$member = $member;
            this.$scope = $scope;
            this.$location = $location;
            this.model = angular.extend({}, $identity.signedMember);
            this.genderOptions = [
                { id: 1, name: "男" },
                { id: 2, name: "女" },
            ];
        }
        MemberProfileController.prototype.submit = function () {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$member.updateProfile(_this.model).then(function (r) {
                    _this.model = r;
                    angular.extend(_this.model, r);
                    angular.extend(_this.$identity.signedMember, r);
                    alert("保存成功");
                });
            });
        };
        return MemberProfileController;
    }());
    ;
    app.$module.controller("MemberProfileController", MemberProfileController);
})(app || (app = {}));
//# sourceMappingURL=MemberProfileController.js.map
var app;
(function (app) {
    var MemberShoppingcartController = (function () {
        function MemberShoppingcartController($shoppingcart, $ui, $location, $http) {
            this.$shoppingcart = $shoppingcart;
            this.$ui = $ui;
            this.$location = $location;
            this.$http = $http;
            this.init();
        }
        MemberShoppingcartController.prototype.init = function () {
            var _this = this;
            console.log("init");
            this.$ui.lock("正在更新订货单");
            this.$shoppingcart.checkout({ refresh: true }).then(function (r) {
                _this.$ui.unlock();
                _this.shoppingcart = r;
            });
        };
        MemberShoppingcartController.prototype.productPrice = function (product) {
            return this.$shoppingcart.productPrice(product);
        };
        MemberShoppingcartController.prototype.shoppingcartPrice = function () {
            return this.$shoppingcart.shoppingcartPrice();
        };
        ;
        MemberShoppingcartController.prototype.clearShoppingcart = function () {
            if (confirm("您确认要清空进货单吗?"))
                this.$shoppingcart.clear();
        };
        ;
        MemberShoppingcartController.prototype.isAllowSubmit = function () {
            return this.shoppingcartPrice() > 0;
        };
        ;
        /**
         * qian
         */
        MemberShoppingcartController.prototype.gotoSubmit = function () {
            var _this = this;
            this.$ui.lock("正在保存进货单");
            var clientPack = window["clientPack"];
            this.$http.post("/api/shoppingcart/save-to-old", this.shoppingcart)
                .then(function (httpRsl) {
                _this.$ui.unlock();
                _this.$ui.lock("正在准备订单");
                var r = httpRsl.data;
                if (r.success) {
                    location.href = "/Vshop/SubmmitOrder.aspx";
                }
            });
        };
        ;
        return MemberShoppingcartController;
    }());
    app.$module.controller("MemberShoppingcartController", MemberShoppingcartController);
})(app || (app = {}));
//# sourceMappingURL=ShoppingcartController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var NewsDetailsController = (function () {
            function NewsDetailsController($ui, $news, $location, $sce) {
                this.$ui = $ui;
                this.$news = $news;
                this.$location = $location;
                this.$sce = $sce;
                this.relateds = [];
                this.id = $location.search().id;
                this.load();
            }
            NewsDetailsController.prototype.load = function () {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$news.get(_this.id).then(function (r) {
                        _this.news = r;
                        _this.news.content = _this.$sce.trustAsHtml(_this.news.content);
                        _this.loadRelateds();
                    });
                });
            };
            NewsDetailsController.prototype.loadRelateds = function () {
                var _this = this;
                var filter = {
                    townId: this.news.townId,
                    take: 3
                };
                return this.$news.getList(filter).then(function (r) {
                    _this.relateds = r.data;
                });
            };
            return NewsDetailsController;
        }());
        main.NewsDetailsController = NewsDetailsController;
        app.$module.controller("NewsDetailsController", NewsDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=NewsDetailsController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var NewsIndexController = (function () {
            function NewsIndexController($ui, $news, $town, $location, $rootScope) {
                var _this = this;
                this.$ui = $ui;
                this.$news = $news;
                this.$town = $town;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.news = [];
                this.hasMore = true;
                this.filter = {};
                this.loading = false;
                this.filter.townId = $location.search().townId;
                this.load();
                if (this.filter.townId) {
                    this.$town.get(this.filter.townId).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "新闻";
                    });
                }
            }
            NewsIndexController.prototype.load = function () {
                var _this = this;
                if (this.loading || !this.hasMore)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    _this.filter.take = 40;
                    _this.filter.skip = _this.news.length;
                    _this.filter.includes = "town";
                    return _this.$news.getList(_this.filter).then(function (r) {
                        Array.prototype.push.apply(_this.news, r.data);
                        if (!r.data.length)
                            _this.hasMore = false;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return NewsIndexController;
        }());
        main.NewsIndexController = NewsIndexController;
        app.$module.controller("NewsIndexController", NewsIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=NewsIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var NewsTownController = (function () {
            function NewsTownController() {
            }
            return NewsTownController;
        }());
        main.NewsTownController = NewsTownController;
        app.$module.controller("NewsTownController", NewsTownController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=NewsTownController.js.map
var app;
(function (app) {
    var PassportForgotPasswordController = (function () {
        /**
         * constructor
         * @param $location
         * @param $ui
         * @param $member
         */
        function PassportForgotPasswordController($location, $ui, $member, $verify) {
            this.$location = $location;
            this.$ui = $ui;
            this.$member = $member;
            this.$verify = $verify;
            this.model = {};
        }
        /**
         * submit form
         */
        PassportForgotPasswordController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.lock("正在验证, 请稍候");
            this.$member.setPasswordByVerifyCode(this.model)
                .then(function (r) {
                if (r.success) {
                    alert("新密码已经设置成功!");
                    _this.$location.url("passport/login");
                }
            });
        };
        return PassportForgotPasswordController;
    }());
    angular.module("app").controller("PassportForgotPasswordController", PassportForgotPasswordController);
})(app || (app = {}));
//# sourceMappingURL=PassportForgotPasswordContrroller.js.map
var app;
(function (app) {
    var PassportLoginController = (function () {
        function PassportLoginController($location, $identity, $ui) {
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.returnUrl = this.$location.search().returnUrl;
            this.returnUrl = this.returnUrl || "/";
            this.encodedRegisterUrl = encodeURIComponent("passport/register");
        }
        PassportLoginController.prototype.submit = function (evt) {
            var _this = this;
            var form = evt.target;
            if (!form.checkValidity())
                return;
            this.$ui.lock("正在验证, 请稍候");
            this.$identity.signIn(this.model).then(function (r) {
                _this.$ui.unlock();
                if (!r.success)
                    alert("登录失败, 账号或者密码错误");
                else {
                    _this.$location.url(_this.returnUrl);
                }
            });
        };
        return PassportLoginController;
    }());
    app.$module.controller("PassportLoginController", PassportLoginController);
})(app || (app = {}));
//# sourceMappingURL=PassportLoginController.js.map
var app;
(function (app) {
    var PassportRegisterController = (function () {
        function PassportRegisterController($scope, $http, $location, $identity, $ui, $town) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.$town = $town;
            this.model = {};
            this.nosms = null;
            this.nosms = $location.search().nosms;
            this.$ui.acc(function () {
                return _this.$town.getList({}).then(function (r) {
                    _this.towns = r.data;
                    _this.model.townId = _this.$location.search().townId || _this.towns[0].id;
                });
            }, "正在获取村庄");
        }
        PassportRegisterController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$http.post("/api/passport/register", _this.model).then(function (rsp) {
                    var r = rsp.data;
                    alert("注册成功");
                    _this.$location.url("passport/login").replace();
                });
            }, "正在提交");
        };
        return PassportRegisterController;
    }());
    angular.module("app").controller("PassportRegisterController", PassportRegisterController);
})(app || (app = {}));
//# sourceMappingURL=PassportRegisterController.js.map
var app;
(function (app) {
    var PassportRegisterMasterController = (function () {
        function PassportRegisterMasterController($scope, $http, $location, $identity, $ui, $town) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$location = $location;
            this.$identity = $identity;
            this.$ui = $ui;
            this.$town = $town;
            this.model = {};
            this.savedKey = "PassportRegisterMasterController.model";
            this.nosms = null;
            this.encodedUrl = encodeURIComponent($location.url());
            this.model.townAreaId = this.$location.search().id;
            this.nosms = $location.search().nosms;
            var savedJson = sessionStorage.getItem(this.savedKey);
            savedJson && angular.extend(this.model, angular.fromJson(savedJson));
            $scope.$on("$destroy", function (e) {
                sessionStorage.setItem(_this.savedKey, angular.toJson(_this.model));
            });
            this.model.townAreaId = this.$location.search().areaId;
            if (this.model.townAreaId)
                this.$http.get("/api/area/" + this.model.townAreaId).then(function (rsp) {
                    _this.townAreaName = rsp.data.name;
                });
        }
        PassportRegisterMasterController.prototype.submit = function (form) {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$http.post("/api/passport/register-master", _this.model).then(function (rsp) {
                    var r = rsp.data;
                    alert("注册成功");
                    _this.$location.url("passport/login").replace();
                }, function () {
                    alert("系统繁忙, 请稍候再试");
                });
            }, "正在提交");
        };
        return PassportRegisterMasterController;
    }());
    angular.module("app").controller("PassportRegisterMasterController", PassportRegisterMasterController);
})(app || (app = {}));
//# sourceMappingURL=PassportRegisterMasterController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var ProductDetailsController = (function () {
            function ProductDetailsController($ui, $product, $location, $sce) {
                this.$ui = $ui;
                this.$product = $product;
                this.$location = $location;
                this.$sce = $sce;
                var id = $location.search().id;
                this.load(id);
            }
            ProductDetailsController.prototype.load = function (id) {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$product.get(id).then(function (r) {
                        _this.product = r;
                        _this.product.content = _this.$sce.trustAsHtml(_this.product.content);
                    });
                });
            };
            return ProductDetailsController;
        }());
        main.ProductDetailsController = ProductDetailsController;
        app.$module.controller("ProductDetailsController", ProductDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=ProductDetailsController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var ProductIndexController = (function () {
            function ProductIndexController($town, $rootScope, $ui, $product, $location) {
                var _this = this;
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$ui = $ui;
                this.$product = $product;
                this.$location = $location;
                this.products = [];
                this.hasMore = true;
                this.filter = {};
                this.loading = false;
                this.filter.townId = $location.search().townId;
                this.load();
                if (this.filter.townId) {
                    this.$town.get(this.filter.townId).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "农产品";
                    });
                }
            }
            ProductIndexController.prototype.load = function () {
                var _this = this;
                if (this.loading || !this.hasMore)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    _this.filter.take = 40;
                    _this.filter.skip = _this.products.length;
                    _this.filter.includes = "town";
                    return _this.$product.getList(_this.filter).then(function (r) {
                        Array.prototype.push.apply(_this.products, r.data);
                        if (!r.data.length)
                            _this.hasMore = false;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return ProductIndexController;
        }());
        main.ProductIndexController = ProductIndexController;
        app.$module.controller("ProductIndexController", ProductIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=ProductIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var ProductTownController = (function () {
            function ProductTownController() {
            }
            return ProductTownController;
        }());
        main.ProductTownController = ProductTownController;
        app.$module.controller("ProductTownController", ProductTownController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=ProductTownController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var TownIndexController = (function () {
            function TownIndexController($ui, $town, $location) {
                this.$ui = $ui;
                this.$town = $town;
                this.$location = $location;
                this.load();
            }
            TownIndexController.prototype.load = function () {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = { includes: "master" };
                    return _this.$town.getList(filter).then(function (r) {
                        _this.towns = r.data;
                    });
                });
            };
            return TownIndexController;
        }());
        app.$module.controller("TownIndexController", TownIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownIndexController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var TownSearchController = (function () {
            function TownSearchController($ui, $town, $interval, $timeout, $location, $identity, $scope) {
                var _this = this;
                this.$ui = $ui;
                this.$town = $town;
                this.$interval = $interval;
                this.$timeout = $timeout;
                this.$location = $location;
                this.$identity = $identity;
                this.$scope = $scope;
                this.keywords = "";
                this.searchedKw = "";
                this.loading = false;
                this.member = null;
                $identity.checkout().then(function (r) {
                    _this.member = r;
                });
                var timer = $interval(function () {
                    _this.load();
                }, 100);
                $scope.$on("$destroy", function (e) {
                    $interval.cancel(timer);
                });
            }
            TownSearchController.prototype.load = function () {
                var _this = this;
                if (this.searchedKw == this.keywords || this.loading)
                    return;
                this.searchedKw = this.keywords;
                if (!this.searchedKw)
                    this.towns = [];
                else {
                    this.loading = true;
                    var filter = { keywords: this.searchedKw, includes: "master" };
                    this.$town.getList(filter).then(function (r) {
                        _this.towns = r.data;
                    }).finally(function () {
                        _this.loading = false;
                    });
                }
            };
            TownSearchController.prototype.go = function (item) {
                var returnUrl = this.$location.search().returnUrl;
                console.log("returnUrl");
                if (!returnUrl) {
                    this.$location.url("town/private?id=" + item.id);
                }
                else {
                    this.$location.url(returnUrl).search({ townId: item.id });
                }
            };
            return TownSearchController;
        }());
        app.$module.controller("TownSearchController", TownSearchController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownSearchController.js.map
var app;
(function (app) {
    var main;
    (function (main) {
        var SlidingMenuController = (function () {
            function SlidingMenuController($location, $identity, $town, $mailGroup) {
                var _this = this;
                this.$location = $location;
                this.$identity = $identity;
                this.$town = $town;
                this.$mailGroup = $mailGroup;
                this.unreplyMessage = 0;
                this.isMaster = false;
                this.$identity.checkout().then(function (r) {
                    _this.member = r;
                    if (r) {
                        _this.isMaster = _this.member.roles.indexOf('village-master') != -1;
                        _this.$town.get(r.townId).then(function (r) {
                            _this.town = r;
                            _this.loadUnreplyMessage();
                        });
                    }
                });
            }
            SlidingMenuController.prototype.signOut = function () {
                var _this = this;
                if (confirm("确认退出吗?")) {
                    this.$identity.signOut().then(function (r) {
                        _this.$location.url("passport/login");
                    });
                }
            };
            /**
             * 加载未回复的消息数目.
             */
            SlidingMenuController.prototype.loadUnreplyMessage = function () {
                var _this = this;
                if (this.town && this.isMaster) {
                    var filter = { options: "count", replyStatus: "unreply", townId: this.member.townId };
                    this.$mailGroup.getMessageList(filter).then(function (r) {
                        _this.unreplyMessage = r.count;
                    });
                }
            };
            return SlidingMenuController;
        }());
        main.SlidingMenuController = SlidingMenuController;
        app.$module.directive("slidingMenu", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                },
                controllerAs: "ctrl",
                controller: SlidingMenuController
            };
        });
        app.$module.directive("slidingMenuToucher", function ($identity) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu-toucher.html?v=" + buildNumber,
                link: function (scope, el, attrs, ctrl) {
                },
            };
        });
        app.$module.directive("toggleSlidingMenu", function ($identity, $location) {
            return {
                restrict: "A",
                link: function (scope, el, attrs, ctrl) {
                    var view = angular.element("#app-view");
                    scope["position"] = attrs["position"];
                    el.on("click", function (e) {
                        e.preventDefault();
                        $identity.checkout().then(function (r) {
                            if (r) {
                                view.children().toggleClass("open-sliding-menu");
                            }
                            else {
                                var returnUrl = encodeURIComponent($location.url());
                                $location.url("passport/login?returnUrl=" + returnUrl);
                            }
                        });
                    });
                }
            };
        });
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=sliding-menu.js.map
var app;
(function (app) {
    app.$module.directive("viewFixedSidebar", function () {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-fixed-sidebar/template.html?v=' + buildNumber,
            replace: true,
            scope: {},
            link: function (scope, el, attrs) {
            },
            controllerAs: "ctrl",
            controller: function ($scope, sessionService) {
                var ctrl = this;
                ctrl.goSQ = function () {
                };
                ctrl.goTop = function () {
                };
            }
        };
    });
})(app || (app = {}));
//# sourceMappingURL=directive.js.map
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
                { title: "添加产品", path: "/product/create" },
                { title: "产品中心", path: "/product/details" },
                { title: "产品中心", path: "/product/" },
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


var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductCreateController = (function () {
            function ManageProductCreateController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.model = {};
            }
            ManageProductCreateController.prototype.submit = function () {
                var _this = this;
                this.$product.create(this.model).then(function (r) {
                    var u = "product/details?id=" + r.id;
                    _this.$location.url(u).replace();
                });
            };
            return ManageProductCreateController;
        }());
        manage.$module.controller("ManageProductCreateController", ManageProductCreateController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsBaseController = (function () {
            function ManageProductDetailsBaseController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.model = null;
                this.product = $scope["product"];
                this.model = this.product;
                //this.model = {
                //    name: this.product.name,
                //};
            }
            ManageProductDetailsBaseController.prototype.submit = function () {
                this.$product.update(this.product.id, this.model).then(function (r) {
                    alert("更新成功");
                    //angular.extend(this.product, this.model);
                });
            };
            return ManageProductDetailsBaseController;
        }());
        manage.$module.directive("productDetailsBase", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-base.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsBaseController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsChartsController = (function () {
            function ManageProductDetailsChartsController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.props = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.load();
            }
            ManageProductDetailsChartsController.prototype.submit = function () {
                if (confirm("确认要保存对型号规格的修改吗?")) {
                }
            };
            ManageProductDetailsChartsController.prototype.load = function () {
                var _this = this;
                var filter = {
                    productId: this.product.id,
                    includes: "res,items"
                };
                this.$product.getSpecials(filter).then(function (r) {
                    _this.props = r.data;
                });
            };
            ManageProductDetailsChartsController.prototype.addSpecial = function () {
                this.props.push({});
            };
            ManageProductDetailsChartsController.prototype.addItem = function (prop) {
                prop.items = prop.items || [];
                prop.items.push({});
            };
            ManageProductDetailsChartsController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductDetailsChartsController.prototype.swipe = function (it, arr, step) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    var ii = i + step;
                    if (ii >= 0 && ii < arr.length) {
                        var tmp = arr[ii];
                        arr[ii] = arr[i];
                        arr[i] = tmp;
                    }
                }
            };
            return ManageProductDetailsChartsController;
        }());
        manage.$module.directive("productDetailsCharts", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-charts.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsChartsController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsController = (function () {
            function ManageProductDetailsController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.product = null;
                this.id = null;
                this.tab = null;
                this.id = $location.search().id;
                this.tab = "properties";
                this.load();
            }
            ManageProductDetailsController.prototype.load = function () {
                var _this = this;
                this.$product.get(this.id).then(function (r) {
                    _this.product = r;
                });
            };
            return ManageProductDetailsController;
        }());
        manage.$module.controller("ManageProductDetailsController", ManageProductDetailsController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsInfoController = (function () {
            function ManageProductDetailsInfoController($location, $scope, $product) {
                var _this = this;
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.model = null;
                this.product = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.$product.getRes(this.product.id).then(function (r) {
                    _this.model = r;
                    _.forEach(_this.langs, function (lang) {
                        _this.model[lang.code] = _this.model[lang.code] || {};
                    });
                });
            }
            ManageProductDetailsInfoController.prototype.submit = function () {
                this.$product.updateRes(this.product.id, this.model).then(function (r) {
                    alert("更新成功");
                });
            };
            return ManageProductDetailsInfoController;
        }());
        manage.$module.directive("productDetailsInfo", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-info.html",
                restrict: "E",
                replace: true,
                controller: ManageProductDetailsInfoController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductPropertiesInfoController = (function () {
            function ManageProductPropertiesInfoController($location, $scope, $http, $product, $ui) {
                this.$location = $location;
                this.$scope = $scope;
                this.$http = $http;
                this.$product = $product;
                this.$ui = $ui;
                this.product = null;
                this.props = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.load();
            }
            /**
             * submit:
             *      提交
             */
            ManageProductPropertiesInfoController.prototype.submit = function () {
                var _this = this;
                if (!confirm("确认要保存对型号规格的修改吗?"))
                    return;
                this.updateIndex();
                var u = "/api/product/property/replace-all";
                var f = { productId: this.product.id };
                var q = this.$http.post(u, this.props, { params: f }).then(function (rsp) {
                    return _this.load();
                });
                this.$ui.lockFor("正在保存", q);
            };
            /**
             * updateIndex:
             *      更新列表的index属性
             */
            ManageProductPropertiesInfoController.prototype.updateIndex = function () {
                // props
                _.forEach(this.props, function (prop, i) {
                    prop.index = i;
                    // items
                    _.forEach(prop.items || [], function (item, ii) {
                        item.index = ii;
                    });
                });
            };
            /**
             * load:
             *      加载数据
             */
            ManageProductPropertiesInfoController.prototype.load = function () {
                var _this = this;
                var pid = this.product.id;
                var u = "/api/product/property";
                var f = {
                    productId: pid,
                    includes: "res,items"
                };
                this.props = null;
                return this.$http.get(u, { params: f }).then(function (rsp) {
                    var r = rsp.data;
                    _this.props = r.data;
                });
            };
            ManageProductPropertiesInfoController.prototype.addProp = function () {
                this.props.push({
                    type: "scalar"
                });
            };
            ManageProductPropertiesInfoController.prototype.addItem = function (prop) {
                prop.items = prop.items || [];
                prop.items.push({});
            };
            ManageProductPropertiesInfoController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductPropertiesInfoController.prototype.swipe = function (it, arr, step) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    var ii = i + step;
                    if (ii >= 0 && ii < arr.length) {
                        var tmp = arr[ii];
                        arr[ii] = arr[i];
                        arr[i] = tmp;
                    }
                }
            };
            return ManageProductPropertiesInfoController;
        }());
        manage.$module.directive("productDetailsProperties", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-properties.html",
                restrict: "E",
                replace: true,
                controller: ManageProductPropertiesInfoController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductSkusInfoController = (function () {
            function ManageProductSkusInfoController($location, $scope, $product) {
                this.$location = $location;
                this.$scope = $scope;
                this.$product = $product;
                this.product = null;
                this.specials = null;
                this.langs = [
                    { name: "简体", code: "cmn-Hans" },
                    { name: "繁体", code: "cmn-Hant" },
                    { name: "英语", code: "eng" },
                    { name: "德语", code: "deu" }
                ];
                this.product = $scope["product"];
                this.load();
            }
            ManageProductSkusInfoController.prototype.submit = function () {
                var _this = this;
                if (confirm("确认要保存对型号规格的修改吗?")) {
                    // sort
                    _.forEach(this.specials, function (special, i) {
                        special.index = i;
                        _.forEach(special.items || [], function (item, ii) {
                            item.index = ii;
                        });
                    });
                    this.$product.updateSpecials(this.product.id, this.specials).then(function (r) {
                        alert("型号更新成功");
                        _this.load();
                    });
                }
            };
            ManageProductSkusInfoController.prototype.load = function () {
                var _this = this;
                var filter = {
                    productId: this.product.id,
                    includes: "res,items"
                };
                this.$product.getSpecials(filter).then(function (r) {
                    _this.specials = r.data;
                });
            };
            ManageProductSkusInfoController.prototype.addSpecial = function () {
                this.specials.push({});
            };
            ManageProductSkusInfoController.prototype.addItem = function (special) {
                special.items = special.items || [];
                special.items.push({});
            };
            ManageProductSkusInfoController.prototype.remove = function (it, arr) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    arr.splice(i, 1);
                }
            };
            ManageProductSkusInfoController.prototype.swipe = function (it, arr, step) {
                var i = arr.indexOf(it);
                if (i != -1) {
                    var ii = i + step;
                    if (ii >= 0 && ii < arr.length) {
                        var tmp = arr[ii];
                        arr[ii] = arr[i];
                        arr[i] = tmp;
                    }
                }
            };
            return ManageProductSkusInfoController;
        }());
        manage.$module.directive("productDetailsSkus", function () {
            return {
                templateUrl: "/Content/modules/src/manage/product/details-skus.html",
                restrict: "E",
                replace: true,
                controller: ManageProductSkusInfoController,
                controllerAs: "ctrl",
                scope: {
                    product: "="
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductIndexController = (function () {
            function ManageProductIndexController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.products = null;
                this.load();
            }
            ManageProductIndexController.prototype.load = function () {
                var _this = this;
                this.$product.getList({}).then(function (r) {
                    _this.products = r.data;
                });
            };
            return ManageProductIndexController;
        }());
        manage.$module.controller("ManageProductIndexController", ManageProductIndexController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageAppNaviController = (function () {
            function ManageAppNaviController() {
            }
            return ManageAppNaviController;
        }());
        manage.ManageAppNaviController = ManageAppNaviController;
        manage.$module.directive("appNavi", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/manage/_partials/app-navi/app-navi.html?v=" + buildNumber,
                scope: {},
                controller: ManageAppNaviController,
                controllerAs: "ctrl"
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));

var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageResGroupController = (function () {
            function ManageResGroupController($scope) {
                this.model = null;
                this.langs = [
                    { name: "简", code: "cmn-Hans" },
                    { name: "繁", code: "cmn-Hant" },
                    { name: "英", code: "eng" },
                    { name: "德", code: "deu" }
                ];
                this.name = $scope["name"];
                this.model = $scope["model"];
                this.placeholder = $scope["placeholder"];
            }
            return ManageResGroupController;
        }());
        manage.ManageResGroupController = ManageResGroupController;
        manage.$module.directive("resGroup", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/manage/_partials/res-group/res-group.html?v=" + buildNumber,
                scope: {
                    name: "@",
                    placeholder: "@",
                    model: "=",
                },
                controller: ManageResGroupController,
                controllerAs: "ctrl"
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
