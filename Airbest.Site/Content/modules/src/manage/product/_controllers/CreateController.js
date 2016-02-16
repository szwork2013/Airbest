var app;
(function (app) {
    var manage;
    (function (manage) {
        var ManageProductCreateController = (function () {
            function ManageProductCreateController($location, $product) {
                this.$location = $location;
                this.$product = $product;
                this.model = {};
            }
            ManageProductCreateController.prototype.submit = function () {
                var _this = this;
                this.$product.create(this.model).then(function (r) {
                    var u = "product/details?id=" + r.id;
                    _this.$location.url(u).replace();
                });
            };
            return ManageProductCreateController;
        }());
        manage.$module.controller("ManageProductCreateController", ManageProductCreateController);
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=CreateController.js.map