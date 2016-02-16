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
