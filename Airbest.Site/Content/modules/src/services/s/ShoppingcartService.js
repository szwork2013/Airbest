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
