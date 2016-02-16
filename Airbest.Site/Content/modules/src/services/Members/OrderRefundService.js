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
//# sourceMappingURL=OrderRefundService.js.map