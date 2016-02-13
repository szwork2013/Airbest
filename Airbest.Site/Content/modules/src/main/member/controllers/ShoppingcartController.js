var app;
(function (app) {
    var MemberShoppingcartController = (function () {
        function MemberShoppingcartController($shoppingcart, $ui, $location, $http) {
            this.$shoppingcart = $shoppingcart;
            this.$ui = $ui;
            this.$location = $location;
            this.$http = $http;
            this.init();
        }
        MemberShoppingcartController.prototype.init = function () {
            var _this = this;
            console.log("init");
            this.$ui.lock("正在更新订货单");
            this.$shoppingcart.checkout({ refresh: true }).then(function (r) {
                _this.$ui.unlock();
                _this.shoppingcart = r;
            });
        };
        MemberShoppingcartController.prototype.productPrice = function (product) {
            return this.$shoppingcart.productPrice(product);
        };
        MemberShoppingcartController.prototype.shoppingcartPrice = function () {
            return this.$shoppingcart.shoppingcartPrice();
        };
        ;
        MemberShoppingcartController.prototype.clearShoppingcart = function () {
            if (confirm("您确认要清空进货单吗?"))
                this.$shoppingcart.clear();
        };
        ;
        MemberShoppingcartController.prototype.isAllowSubmit = function () {
            return this.shoppingcartPrice() > 0;
        };
        ;
        /**
         * qian
         */
        MemberShoppingcartController.prototype.gotoSubmit = function () {
            var _this = this;
            this.$ui.lock("正在保存进货单");
            var clientPack = window["clientPack"];
            this.$http.post("/api/shoppingcart/save-to-old", this.shoppingcart)
                .then(function (httpRsl) {
                _this.$ui.unlock();
                _this.$ui.lock("正在准备订单");
                var r = httpRsl.data;
                if (r.success) {
                    location.href = "/Vshop/SubmmitOrder.aspx";
                }
            });
        };
        ;
        return MemberShoppingcartController;
    }());
    app.$module.controller("MemberShoppingcartController", MemberShoppingcartController);
})(app || (app = {}));
//# sourceMappingURL=ShoppingcartController.js.map