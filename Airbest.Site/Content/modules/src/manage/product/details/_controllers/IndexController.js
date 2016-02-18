var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsIndexController = (function () {
            function ManageProductDetailsIndexController($location) {
                this.$location = $location;
                var id = $location.search().id;
                $location.url("product/details/base?id=" + id);
            }
            return ManageProductDetailsIndexController;
        }());
        manage.$module.controller("ManageProductDetailsIndexController", ManageProductDetailsIndexController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=IndexController.js.map