var app;
(function (app) {
    var main;
    (function (main) {
        var MemberAlbumEditController = (function () {
            function MemberAlbumEditController($ui, $member, $identity, $album, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$album = $album;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberAlbumEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.acc(function () {
                    _this.model.albumId = _this.townId;
                    _this.model.memberId = _this.$identity.signedMember.id;
                    return _this.$album.updateOrAddPhoto(_this.model).then(function (r) {
                        console.log(r.data.id);
                        _this.$location.url("album/details").search({ id: r.data.id });
                    });
                });
            };
            return MemberAlbumEditController;
        }());
        ;
        app.$module.controller("MemberAlbumEditController", MemberAlbumEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberAlbumEditController.js.map