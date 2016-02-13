var app;
(function (app) {
    var main;
    (function (main) {
        var ProductDetailsController = (function () {
            function ProductDetailsController($ui, $product, $location, $sce) {
                this.$ui = $ui;
                this.$product = $product;
                this.$location = $location;
                this.$sce = $sce;
                var id = $location.search().id;
                this.load(id);
            }
            ProductDetailsController.prototype.load = function (id) {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$product.get(id).then(function (r) {
                        _this.product = r;
                        _this.product.content = _this.$sce.trustAsHtml(_this.product.content);
                    });
                });
            };
            return ProductDetailsController;
        }());
        main.ProductDetailsController = ProductDetailsController;
        app.$module.controller("ProductDetailsController", ProductDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=ProductDetailsController.js.map