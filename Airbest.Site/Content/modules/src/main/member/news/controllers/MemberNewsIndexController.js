var app;
(function (app) {
    var main;
    (function (main) {
        var MemberNewsIndexController = (function () {
            function MemberNewsIndexController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberNewsIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberNewsIndexController;
        }());
        ;
        app.$module.controller("MemberNewsIndexController", MemberNewsIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberNewsIndexController.js.map