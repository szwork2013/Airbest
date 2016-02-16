var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductDetailsController = (function () {
            function ManageProductDetailsController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.product = null;
                this.id = null;
                this.tab = null;
                this.id = $location.search().id;
                this.tab = "properties";
                this.load();
            }
            ManageProductDetailsController.prototype.load = function () {
                var _this = this;
                this.$product.get(this.id).then(function (r) {
                    _this.product = r;
                });
            };
            return ManageProductDetailsController;
        }());
        manage.$module.controller("ManageProductDetailsController", ManageProductDetailsController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsController.js.map