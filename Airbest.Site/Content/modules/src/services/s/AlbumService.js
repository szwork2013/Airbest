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
