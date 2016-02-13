var app;
(function (app) {
    var main;
    (function (main) {
        var MailGroupTownController = (function () {
            function MailGroupTownController($town, $rootScope, $mailGroup, $ui, $identity, $location) {
                var _this = this;
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$mailGroup = $mailGroup;
                this.$ui = $ui;
                this.$identity = $identity;
                this.$location = $location;
                this.messages = [];
                this.member = null;
                this.loading = false;
                this.noMore = false;
                this.id = $location.search().id;
                this.replyStatus = $location.search().replyStatus;
                this.load();
                this.$identity.checkout().then(function (r) {
                    _this.member = r;
                });
                if (this.id) {
                    this.$town.get(this.id).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "论坛";
                    });
                }
            }
            MailGroupTownController.prototype.load = function () {
                var _this = this;
                if (this.noMore || this.loading)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    var filter = {
                        townId: _this.id,
                        take: 30,
                        skip: _this.messages.length,
                        replyStatus: _this.replyStatus
                    };
                    return _this.$mailGroup.getMessageList(filter).then(function (r) {
                        Array.prototype.push.apply(_this.messages, r.data);
                        if (!r.data.length)
                            _this.noMore = true;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return MailGroupTownController;
        }());
        main.MailGroupTownController = MailGroupTownController;
        app.$module.controller("MailGroupTownController", MailGroupTownController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=MailGroupTownController.js.map