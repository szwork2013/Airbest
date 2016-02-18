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
//# sourceMappingURL=FavoriteService.js.map