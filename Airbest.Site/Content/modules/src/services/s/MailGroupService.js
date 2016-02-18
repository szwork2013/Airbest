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
//# sourceMappingURL=MailGroupService.js.map