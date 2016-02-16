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
//# sourceMappingURL=ZanService.js.map