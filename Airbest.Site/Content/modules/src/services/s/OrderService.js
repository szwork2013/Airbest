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
//# sourceMappingURL=OrderService.js.map