var app;
(function (app) {
    var HomeOnlineServiceController = (function () {
        function HomeOnlineServiceController($ui, $interval, $scope) {
            var _this = this;
            this.$ui = $ui;
            this.$interval = $interval;
            this.$scope = $scope;
            this.$ui.lock("正在连接, 请稍候");
            $scope.$on("$destory", function () {
                timer && _this.$interval.cancel(timer);
            });
            var timer = $interval(function () {
                var a = document.getElementById("QIAO_ICON_CONTAINER");
                if (a && a.href) {
                    _this.$interval.cancel(timer);
                    _this.$ui.unlock();
                    timer = null;
                    var iframe = document.getElementById("iframe-online-service");
                    iframe.src = a.href;
                }
            }, 200);
        }
        return HomeOnlineServiceController;
    }());
    ;
    app.$module.controller("HomeOnlineServiceController", HomeOnlineServiceController);
})(app || (app = {}));
//# sourceMappingURL=HomeOnlineServiceController.js.map