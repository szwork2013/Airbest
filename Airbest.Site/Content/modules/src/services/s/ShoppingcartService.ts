module app.services {
    export interface IShoppingcart {
        products: Array<IShoppingcartProduct>;
    }

    export interface IShoppingcartProduct {
        productId: string;
        info: any;
        items: Array<IShoppingcartItem>;
        ticket: IShoppingcartTicket;
    }

    export interface IShoppingcartItem {
        buyCount: number;
        sku: any;
        skuId: string
    }

    export interface IShoppingcartTicket {
        buyLimit: number;
        zs: IMemberZsr;
    }

    export interface IMemberZsr {
        price: number,
        count: number,
    }

    export interface IShoppingcartCheckoutOptions {
        refresh?: boolean;
    }

    export class ShoppingcartService {

        public _cart: IShoppingcart;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService) {
        }

        /**
          * 获取购物车
          * @param opts 选项
          */
        public checkout(opts: IShoppingcartCheckoutOptions) {
            let deferred = this.$q.defer<IShoppingcart>();
            opts = opts || {};

            if (!this._cart)
                this._cart = (localStorage["shoppingcart"] && angular.fromJson(localStorage["shoppingcart"])) || { products: [] };

            if (!opts.refresh)
                deferred.resolve(this._cart);
            else {
                let api = "/api/shoppingcart/refresh";
                this.$http.post<utils.IApiResult<IShoppingcart>>(api, this._cart).then(httpRsl => {
                    let r = httpRsl.data;
                    this._cart = r.data;
                    deferred.resolve(this._cart);
                });
            }

            return deferred.promise;
        }

        /**
         * 获取购物车中指定code的商品
         * @param code
         * @param opts
         */
        public findCode(code: string, opts?: IShoppingcartCheckoutOptions) {
            return this.checkout(opts).then(r => {
                let rsl = _.find(r.products, p => p.info && p.info.code == code);
                return this.$q.resolve(rsl);
            });
        }

        /**
         * 获取商品项
         * @param id 商品id
         */
        public product(id: number, opts?: IShoppingcartCheckoutOptions) {
            let deferred = this.$q.defer<IShoppingcartProduct>();
            opts = opts || {};

            this.checkout(opts).then(r => {
                let product: IShoppingcartProduct = _.find<any>(this._cart.products, it => it.productId == id);

                if (product != null)
                    deferred.resolve(product);
                else {
                    let api = "/api/shoppingcart/product/" + id;
                    this.$http.get<utils.IApiResult<IShoppingcartProduct>>(api).then(httpRsl => {
                        let r = httpRsl.data;

                        product = r.data;
                        this._cart.products.push(product);
                        this.save();
                        deferred.resolve(product);
                    });
                }
            });

            return deferred.promise;
        }

        /**
         * 保存购物车数据.
         * @param shoppingcart 要保存的实例.
         */
        public save() {
            localStorage["shoppingcart"] = angular.toJson(this._cart);
        }

        /**
         * 清空购物车
         */
        public clear() {
            var cnt = this._cart.products.length;
            this._cart.products.splice(0, cnt);
            this.save();
        }

        /**
         * 计算商品总金额
         * @param product 商品
         */
        public productPrice(product: IShoppingcartProduct) {
            var amount = this.productPriceWithOutZST(product);
            var zsr = this.zsReturn(product);

            amount = Math.max(0, amount - zsr);
            return amount;
        }

        /**
         * 获取指定商品的零库存返额.
         * @param product
         */
        public zsReturn(p: IShoppingcartProduct): number {
            if (!this.hasZsReturn(p))
                return 0;
            
            var rsl = 0;
            var zs = p.ticket.zs;
            var price = (p.items[0] && p.items[0].sku.price) || 0;

            return Math.max(0, (zs.price -  price) * zs.count);
        }

        /**
         * 计算商品总金额 (不包括零库存返额ZST)
         * @param product 商品
         */
        public productPriceWithOutZST(product: IShoppingcartProduct) {
            var sum = 0;
            if (product && product.items) {
                var useWholesalePrice = this.isUseWholesalePrice(product);
                _.forEach(product.items, it => {
                    let p = useWholesalePrice ? product.info.wholesalePrice : it.sku.price;
                    sum += (p * it.buyCount);
                });
            }
            return sum;
        }

        /**
         * 判断指定商品是否使用批发价计算金额
         * @param product 商品
         */
        public isUseWholesalePrice(product: IShoppingcartProduct) {
            var minWholesaleCount = product.info.minWholesaleCount;
            return !!(minWholesaleCount && this.productSkuCount(product) >= minWholesaleCount);
        }

        /**
         * 判断指定商品是否有零库存返额.
         * @param product 商品
         */
        public hasZsReturn(product: IShoppingcartProduct, sum?: number) {
            return !!product.ticket.zs;
        }

        /**
         * 计算商品SKU数量
         * @param product 商品
         */
        public productSkuCount(product: IShoppingcartProduct) {
            if (!product || !product.items)
                return 0;
            var sum = 0;
            _.forEach(product.items, it => { sum += (it.buyCount); });
            return sum;
        }

        /**
         * 计算购物车总金额 (所有商品的价格)
         * @param shoppingcart 购物车
         */
        public shoppingcartPrice() {
            if (!this._cart)
                return 0;
            var sum = 0;
            angular.forEach(this._cart.products, it => { sum += this.productPrice(it); });
            return sum;
        }

        public addItem(item: IShoppingcartItem, product: IShoppingcartProduct) {
            item.skuId = item.skuId || item.sku.id;
            var exi = _.find(product.items, it => it.skuId == item.skuId);
            if (exi)
                exi.buyCount += item.buyCount;
            else
                product.items.push(item);
            this.save();
        }
    }

    $module.service("$shoppingcart", ShoppingcartService);
}