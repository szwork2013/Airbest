var app;
(function (app) {
    var main;
    (function (main) {
        var MemberNewsEditController = (function () {
            function MemberNewsEditController($ui, $member, $identity, $news, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$news = $news;
                this.$scope = $scope;
                this.$location = $location;
                this.townId = $identity.signedMember.townId;
                this.model = {
                    date: new Date(),
                    townId: this.townId
                };
            }
            MemberNewsEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.lockFor("正在发布", this.$news.updateOrAdd(this.model)).then(function (r) {
                    alert("发布成功!");
                    _this.$location.url("news/?townId=" + _this.townId);
                });
            };
            return MemberNewsEditController;
        }());
        ;
        app.$module.controller("MemberNewsEditController", MemberNewsEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberNewsEditController.js.map