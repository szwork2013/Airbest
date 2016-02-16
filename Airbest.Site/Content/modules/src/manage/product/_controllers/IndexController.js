var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductIndexController = (function () {
            function ManageProductIndexController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.products = null;
                this.load();
            }
            ManageProductIndexController.prototype.load = function () {
                var _this = this;
                this.$product.getList({}).then(function (r) {
                    _this.products = r.data;
                });
            };
            return ManageProductIndexController;
        }());
        manage.$module.controller("ManageProductIndexController", ManageProductIndexController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
