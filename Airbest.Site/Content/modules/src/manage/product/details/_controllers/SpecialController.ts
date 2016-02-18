
module app.manage {

    class ManageProductDetailsSpecialController {
        public product;
        public specials;
        public id;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $product: app.services.ProductService,
            private $http: ng.IHttpService,
            private $ui: app.services.UIService
        ) {
            this.id = $location.search().id;
            this.$ui.lockFor("加载中", this.load());
        }

        public submit() {
            if (confirm("确认要保存对型号规格的修改吗?")) {
                // sort
                _.forEach<any>(this.specials, (special, i) => {
                    special.index = i;
                    _.forEach<any>(special.items || [], (item, ii) => {
                        item.index = ii;
                    });
                });

                var q = this.$product.updateSpecials(this.product.id, this.specials).then(r => {
                    return this.load();
                });

                this.$ui.lockFor("正在保存", q).then(r => {
                    alert("保存成功");
                });
            }
        }

        public load() {
            let u1 = "/api/product";
            let f1 = { id: this.id };
            let p1 = this.$http.get<any>(u1, { params: f1 }).then(rsp => {
                this.product = rsp.data;
            });

            let u2 = "/api/product/special";
            let f2 = { productId: this.id, includes: "res,items" };
            let p2 = this.$http.get<any>(u2, { params: f2 }).then(rsp => {
                let r = rsp.data;
                this.specials = r.data;
            });

            return [p1, p2];
        }

        public addSpecial() {
            this.specials.push({
            });
        }

        public addItem(special) {
            special.items = special.items || [];
            special.items.push({});
        }

        public remove(it, arr: any[]) {
            let i = arr.indexOf(it);
            if (i != -1) {
                arr.splice(i, 1);
            }
        }

        public swipe(it, arr: any[], step: number) {
            let i = arr.indexOf(it);
            if (i != -1) {
                let ii = i + step;
                if (ii >= 0 && ii < arr.length) {
                    let tmp = arr[ii];
                    arr[ii] = arr[i];
                    arr[i] = tmp;
                }
            }
        }
    }

    $module.controller("ManageProductDetailsSpecialController", ManageProductDetailsSpecialController);
}