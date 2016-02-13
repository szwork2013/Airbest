
module app.main {

    export class SlidingMenuController {
        public member: any;
        public town: any;
        public unreplyMessage = 0;
        public isMaster = false;

        constructor(
            private $location: ng.ILocationService,
            private $identity: app.services.IdentityService,
            private $town: app.services.TownService,
            private $mailGroup: app.services.MainGroupService
        ) {
            this.$identity.checkout().then(r => {
                this.member = r;
                if (r) {
                    this.isMaster = this.member.roles.indexOf('village-master') != -1;
                    this.$town.get(r.townId).then(r => {
                        this.town = r;
                        this.loadUnreplyMessage();
                    });
                }
            });
        }

        public signOut() {
            if (confirm("确认退出吗?")) {
                this.$identity.signOut().then(r => {
                    this.$location.url("passport/login");
                });
            }
        }

        /**
         * 加载未回复的消息数目.
         */
        public loadUnreplyMessage() {
            if (this.town && this.isMaster) {
                let filter = { options: "count", replyStatus: "unreply", townId: this.member.townId };
                this.$mailGroup.getMessageList(filter).then(r => {
                    this.unreplyMessage = r.count;
                });
            }
        }
    }

    $module.directive("slidingMenu", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu.html?v=" + buildNumber,
            scope: {
            },
            link: function (scope, el, attrs, ctrl) {
            },
            controllerAs: "ctrl",
            controller: SlidingMenuController
        };
    });

    $module.directive("slidingMenuToucher", function (
        $identity: app.services.IdentityService
    ) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/Content/modules/src/main/_partials/sliding-menu/sliding-menu-toucher.html?v=" + buildNumber,
            link: function (scope, el, attrs, ctrl) {
            },
        };
    });

    $module.directive("toggleSlidingMenu", function (
        $identity: app.services.IdentityService,
        $location: ng.ILocationService
    ) {
        return {
            restrict: "A",
            link: function (scope, el, attrs, ctrl) {
                let view = angular.element("#app-view");
                scope["position"] = attrs["position"];
                el.on("click", function (e) {
                    e.preventDefault();
                    $identity.checkout().then(r => {
                        if (r) {
                            view.children().toggleClass("open-sliding-menu")
                        } else {
                            var returnUrl = encodeURIComponent($location.url());
                            $location.url("passport/login?returnUrl=" + returnUrl);
                        }
                    });
                });
            }
        };
    });
}