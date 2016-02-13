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