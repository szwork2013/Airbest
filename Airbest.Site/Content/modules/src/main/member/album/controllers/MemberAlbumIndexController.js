var app;
(function (app) {
    var main;
    (function (main) {
        var MemberAlbumIndexController = (function () {
            function MemberAlbumIndexController($ui, $member, $identity, $album, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$album = $album;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberAlbumIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberAlbumIndexController;
        }());
        ;
        app.$module.controller("MemberAlbumIndexController", MemberAlbumIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberAlbumIndexController.js.map