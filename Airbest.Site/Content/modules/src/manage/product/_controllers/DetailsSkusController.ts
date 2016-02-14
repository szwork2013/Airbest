
module app.manage {

    class ManageProductSkusInfoController {
        public product = null;
        public specials = null;
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
            this.$product.updateSpecials(this.product.id, this.specials).then(r => {
                this.specials = r;
                alert("型号更新成功");
            });
        }

        public load() {
            this.specials = [];
        }

        public addProp() {
            this.specials.push({
            });
        }

        public addValue(prop) {
            prop.values = prop.values || [];
            prop.values.push({});
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

    $module.directive("productDetailsSkus", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-skus.html",
            restrict: "E",
            replace: true,
            controller: ManageProductSkusInfoController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}