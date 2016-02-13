module app {
    class MemberShoppingcartController {

        public shoppingcart: services.IShoppingcart;

        constructor(
            public $shoppingcart: services.ShoppingcartService,
            public $ui: services.IUIService,
            public $location: ng.ILocationService,
            public $http: ng.IHttpService) {

            this.init();
        }

        public init() {
            console.log("init");
            this.$ui.lock("正在更新订货单");
            this.$shoppingcart.checkout({ refresh: true }).then(r => {
                this.$ui.unlock();
                this.shoppingcart = r;
            });
        }

        public productPrice(product: services.IShoppingcartProduct) {
            return this.$shoppingcart.productPrice(product);
        }

        public shoppingcartPrice() {
            return this.$shoppingcart.shoppingcartPrice();
        };

        public clearShoppingcart() {
            if (confirm("您确认要清空进货单吗?"))
                this.$shoppingcart.clear();
        };

        public isAllowSubmit() {
            return this.shoppingcartPrice() > 0;
        };

        /**
         * qian
         */
        public gotoSubmit() {
            this.$ui.lock("正在保存进货单");
            var clientPack = window["clientPack"];
            this.$http.post<any>("/api/shoppingcart/save-to-old", this.shoppingcart)
                .then(httpRsl => {
                    this.$ui.unlock();
                    this.$ui.lock("正在准备订单");
                    let r = httpRsl.data;
                    if (r.success) {
                        location.href = "/Vshop/SubmmitOrder.aspx";
                    }
                })
        };
    }
    $module.controller("MemberShoppingcartController", MemberShoppingcartController);
}
