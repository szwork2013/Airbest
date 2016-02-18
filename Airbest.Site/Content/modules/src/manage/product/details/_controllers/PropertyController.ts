
module app.manage {

    class ManageProductDetailsPropertyController {
        public product;
        public props;
        public id;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $product: app.services.ProductService,
            private $ui: app.services.UIService
        ) {
            this.id = $location.search().id;
            this.$ui.lockFor("加载中", this.load());
        }

        public load() {
            let u1 = "/api/product";
            let f1 = { id: this.id };
            let p1 = this.$http.get<any>("/api/product", { params: f1 }).then(rsp => {
                this.product = rsp.data;
            });

            let u2 = "/api/product/property";
            let f2 = { productId: this.id, includes: "res,items" };
            let p2 = this.$http.get<any>(u2, { params: f2 }).then(rsp => {
                let r = rsp.data;
                this.props = r.data;
            });

            return [p1, p2];
        }

        public submit() {
            if (!confirm("确认要保存对型号规格的修改吗?"))
                return;

            this.updateIndexAndData();

            let u = "/api/product/property/replace-all";
            let f = { productId: this.id };
            let q = this.$http.post<any>(u, this.props, { params: f });

            this.$ui.lockFor("正在保存", q).then(r => {
                alert("保存成功");
            });
        }

        public initChartProp(prop) {
            prop.xData = prop.xData || "0,10,20,30,40,50,60,70,80,90";
            if (!prop._xArr)
                prop._xArr = prop.xData.split(",");
        }

        public initChartItem(item) {
            if (!item._arr)
                item._arr = item.data ? item.data.split(",") : [];
        }

        /**
         * updateIndex:
         *      更新列表的index属性
         */
        public updateIndexAndData() {
            _.forEach<any>(this.props, (prop, i) => {
                prop.index = i;
                if (prop.type == 'chart') {
                    prop.xData = prop._xArr && prop._xArr.join(',');
                }
                _.forEach<any>(prop.items || [], (item, ii) => {
                    item.index = ii;
                    if (prop.type == 'chart')
                        item.data = item._arr && item._arr.join(',');
                });
            });
        }

        public addProp() {
            this.props.push({ type: "scalar" });
        }

        public addItem(prop) {
            prop.items = prop.items || [];
            prop.items.push({});
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

    $module.controller("ManageProductDetailsPropertyController", ManageProductDetailsPropertyController);
}