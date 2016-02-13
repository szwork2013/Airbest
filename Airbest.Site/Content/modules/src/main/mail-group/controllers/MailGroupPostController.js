var app;
(function (app) {
    var main;
    (function (main) {
        var MailGroupPostController = (function () {
            function MailGroupPostController($rootScope, $mailGroup, $ui, $identity, $route, $location) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$mailGroup = $mailGroup;
                this.$ui = $ui;
                this.$identity = $identity;
                this.$route = $route;
                this.$location = $location;
                this.model = {
                    targetId: $location.search().reply,
                    townId: $location.search().id,
                    memberId: this.$identity.signedMember.id
                };
                if (this.model.targetId) {
                    this.$mailGroup.getMessage(this.model.targetId).then(function (r) {
                        _this.target = r;
                    });
                }
                $rootScope["pageTitle"] = (this.model.targetId ? "回复" : "发言");
            }
            MailGroupPostController.prototype.submit = function () {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$mailGroup.postMessage(_this.model).then(function (r) {
                        _this.$location.url("mail-group/town?id=" + r.townId).replace();
                    });
                });
            };
            return MailGroupPostController;
        }());
        main.MailGroupPostController = MailGroupPostController;
        app.$module.controller("MailGroupPostController", MailGroupPostController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MailGroupPostController.js.map