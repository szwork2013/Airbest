var app;
(function (app) {
    var main;
    (function (main) {
        var AlbumDetailsController = (function () {
            function AlbumDetailsController($town, $rootScope, $album, $ui, $location) {
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$album = $album;
                this.$ui = $ui;
                this.$location = $location;
                var o = $location.search();
                this.load(o);
            }
            AlbumDetailsController.prototype.load = function (o) {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = { includes: "prev,next" };
                    return (o.albumId
                        ? _this.$album.getFirstPhoto(o.albumId, filter)
                        : _this.$album.getPhoto(o.id, filter)).then(function (r) {
                        _this.photo = r;
                        if (_this.photo.albumId) {
                            _this.$town.get(_this.photo.albumId).then(function (r) {
                                _this.$rootScope["pageTitle"] = r.name + "风貌";
                            });
                        }
                    });
                });
            };
            return AlbumDetailsController;
        }());
        main.AlbumDetailsController = AlbumDetailsController;
        app.$module.controller("AlbumDetailsController", AlbumDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AlbumDetailsController.js.map