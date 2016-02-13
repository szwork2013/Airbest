var app;
(function (app) {
    var main;
    (function (main) {
        var SlidingMenuController = (function () {
            function SlidingMenuController($location, $identity, $town, $mailGroup) {
                var _this = this;
                this.$location = $location;
                this.$identity = $identity;
                this.$town = $town;
                this.$mailGroup = $mailGroup;
                this.unreplyMessage = 0;
                this.isMaster = false;
                this.$identity.checkout().then(function (r) {
                    _this.member = r;
                    if (r) {
                        _this.isMaster = _this.member.roles.indexOf('village-master') != -1;
                        _this.$town.get(r.townId).then(function (r) {
                            _this.town = r;
                            _this.loadUnreplyMessage();
                        });
                    }
                });
            }
            SlidingMenuController.prototype.signOut = function () {
                var _this = this;
                if (confirm("确认退出吗?")) {
                    this.$identity.signOut().then(function (r) {
                        _this.$location.url("passport/login");
                    });
                }
            };
            /**
             * 加载未回复的消息数目.
             */
            SlidingMenuController.prototype.loadUnreplyMessage = function () {
                var _this = this;
                if (this.town && this.isMaster) {
                    var filter = { options: "count", replyStatus: "unreply", townId: this.member.townId };
                    this.$mailGroup.getMessageList(filter).then(function (r) {
                        _this.unreplyMessage = r.count;
                    });
                }
            };
            return SlidingMenuController;
        }());
        main.SlidingMenuController = SlidingMenuController;
        app.$module.directive("slidingMenu", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu.html?v=" + buildNumber,
                scope: {},
                link: function (scope, el, attrs, ctrl) {
                },
                controllerAs: "ctrl",
                controller: SlidingMenuController
            };
        });
        app.$module.directive("slidingMenuToucher", function ($identity) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu-toucher.html?v=" + buildNumber,
                link: function (scope, el, attrs, ctrl) {
                },
            };
        });
        app.$module.directive("toggleSlidingMenu", function ($identity, $location) {
            return {
                restrict: "A",
                link: function (scope, el, attrs, ctrl) {
                    var view = angular.element("#app-view");
                    scope["position"] = attrs["position"];
                    el.on("click", function (e) {
                        e.preventDefault();
                        $identity.checkout().then(function (r) {
                            if (r) {
                                view.children().toggleClass("open-sliding-menu");
                            }
                            else {
                                var returnUrl = encodeURIComponent($location.url());
                                $location.url("passport/login?returnUrl=" + returnUrl);
                            }
                        });
                    });
                }
            };
        });
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=sliding-menu.js.map