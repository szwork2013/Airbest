var app;
(function (app) {
    var main;
    (function (main) {
        var AddressIndexController = (function () {
            function AddressIndexController($location) {
                this.$location = $location;
                this.address = $location.search().address;
            }
            return AddressIndexController;
        }());
        app.$module.controller("AddressIndexController", AddressIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressIndexController.js.map