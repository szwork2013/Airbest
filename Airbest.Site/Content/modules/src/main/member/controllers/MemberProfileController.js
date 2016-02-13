var app;
(function (app) {
    var MemberProfileController = (function () {
        function MemberProfileController($ui, $identity, $member, $scope, $location) {
            this.$ui = $ui;
            this.$identity = $identity;
            this.$member = $member;
            this.$scope = $scope;
            this.$location = $location;
            this.model = angular.extend({}, $identity.signedMember);
            this.genderOptions = [
                { id: 1, name: "男" },
                { id: 2, name: "女" },
            ];
        }
        MemberProfileController.prototype.submit = function () {
            var _this = this;
            this.$ui.acc(function () {
                return _this.$member.updateProfile(_this.model).then(function (r) {
                    _this.model = r;
                    angular.extend(_this.model, r);
                    angular.extend(_this.$identity.signedMember, r);
                    alert("保存成功");
                });
            });
        };
        return MemberProfileController;
    }());
    ;
    app.$module.controller("MemberProfileController", MemberProfileController);
})(app || (app = {}));
//# sourceMappingURL=MemberProfileController.js.map