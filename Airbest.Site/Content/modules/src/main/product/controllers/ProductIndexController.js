var app;
(function (app) {
    var main;
    (function (main) {
        var ProductIndexController = (function () {
            function ProductIndexController($town, $rootScope, $ui, $product, $location) {
                var _this = this;
                this.$town = $town;
                this.$rootScope = $rootScope;
                this.$ui = $ui;
                this.$product = $product;
                this.$location = $location;
                this.products = [];
                this.hasMore = true;
                this.filter = {};
                this.loading = false;
                this.filter.townId = $location.search().townId;
                this.load();
                if (this.filter.townId) {
                    this.$town.get(this.filter.townId).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "农产品";
                    });
                }
            }
            ProductIndexController.prototype.load = function () {
                var _this = this;
                if (this.loading || !this.hasMore)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    _this.filter.take = 40;
                    _this.filter.skip = _this.products.length;
                    _this.filter.includes = "town";
                    return _this.$product.getList(_this.filter).then(function (r) {
                        Array.prototype.push.apply(_this.products, r.data);
                        if (!r.data.length)
                            _this.hasMore = false;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return ProductIndexController;
        }());
        main.ProductIndexController = ProductIndexController;
        app.$module.controller("ProductIndexController", ProductIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=ProductIndexController.js.map