var app;
(function (app) {
    var HomeCustomerServiceController = (function () {
        function HomeCustomerServiceController() {
        }
        HomeCustomerServiceController.prototype.goBdsq = function () {
            var a = document.getElementById("QIAO_ICON_CONTAINER");
            location.href = a.href;
        };
        return HomeCustomerServiceController;
    }());
    ;
    app.$module.controller("HomeCustomerServiceController", HomeCustomerServiceController);
})(app || (app = {}));
//# sourceMappingURL=CustomerServiceController.js.map