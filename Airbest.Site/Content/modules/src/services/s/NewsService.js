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
