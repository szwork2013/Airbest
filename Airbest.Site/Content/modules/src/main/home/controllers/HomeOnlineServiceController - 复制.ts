
module app {

    class HomeOnlineServiceController {

        constructor(
            private $ui: app.services.IUIService,
            private $interval: ng.IIntervalService,
            private $scope: ng.IScope
        ) {
            this.$ui.lock("正在连接, 请稍候");

            $scope.$on("$destory", () => {
                timer && this.$interval.cancel(timer);
            });

            let timer = $interval(() => {
                let a = document.getElementById("QIAO_ICON_CONTAINER") as HTMLAnchorElement;
                if (a && a.href) {
                    this.$interval.cancel(timer);
                    this.$ui.unlock();
                    timer = null;
                    var iframe = document.getElementById("iframe-online-service") as HTMLIFrameElement;
                    iframe.src = a.href;
                }
            }, 200);
        }
    };

    $module.controller("HomeOnlineServiceController", HomeOnlineServiceController);
}