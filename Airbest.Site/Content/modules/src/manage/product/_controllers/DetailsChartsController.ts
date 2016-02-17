
module app.manage {

    class ManageProductDetailsChartsController {
        public product = null;
        public props = null;
        public langs;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $product: app.services.ProductService
        ) {
            this.langs = [
                { name: "简体", code: "cmn-Hans" },
                { name: "繁体", code: "cmn-Hant" },
                { name: "英语", code: "eng" },
                { name: "德语", code: "deu" }
            ];

            this.product = $scope["product"];
            this.load();
        }

        public submit() {
            if (confirm("确认要保存对型号规格的修改吗?")) {
                // sort

                //_.forEach<any>(this.props, (prop, i) => {
                //    prop.index = i;
                //    _.forEach<any>(prop.items || [], (item, ii) => {
                //        item.index = ii;
                //    });
                //});

                //this.$product.updateSpecials(this.product.id, this.props).then(r => {
                //    alert("型号更新成功");
                //    this.load();
                //});
            }
        }

        public load() {
            let filter = {
                productId: this.product.id,
                includes: "res,items"
            };
            this.$product.getSpecials(filter).then(r => {
                this.props = r.data;
            });
        }

        public addSpecial() {
            this.props.push({
            });
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

    $module.directive("productDetailsCharts", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-charts.html?v=" + buildNumber,
            restrict: "E",
            replace: true,
            controller: ManageProductDetailsChartsController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}