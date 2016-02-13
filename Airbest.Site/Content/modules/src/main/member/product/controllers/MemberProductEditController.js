var app;
(function (app) {
    var main;
    (function (main) {
        var MemberProductEditController = (function () {
            function MemberProductEditController($ui, $member, $identity, $product, $scope, $location) {
                this.$ui = $ui;
                this.$member = $member;
                this.$identity = $identity;
                this.$product = $product;
                this.$scope = $scope;
                this.$location = $location;
                this.townId = $identity.signedMember.townId;
                this.model = {
                    date: new Date(),
                    townId: this.townId
                };
            }
            MemberProductEditController.prototype.submit = function () {
                var _this = this;
                this.$ui.lockFor("正在发布", this.$product.updateOrAdd(this.model)).then(function (r) {
                    alert("发布成功!");
                    _this.$location.url("product/?townId=" + _this.townId);
                });
            };
            return MemberProductEditController;
        }());
        ;
        app.$module.controller("MemberProductEditController", MemberProductEditController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberProductEditController.js.map