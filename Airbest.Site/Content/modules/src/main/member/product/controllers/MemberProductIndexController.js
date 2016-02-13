var app;
(function (app) {
    var main;
    (function (main) {
        var MemberProductIndexController = (function () {
            function MemberProductIndexController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.model = {};
                this.townId = $identity.signedMember.townId;
            }
            MemberProductIndexController.prototype.submit = function () {
                this.$ui.acc(function () {
                    return {};
                });
            };
            return MemberProductIndexController;
        }());
        ;
        app.$module.controller("MemberProductIndexController", MemberProductIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberProductIndexController.js.map