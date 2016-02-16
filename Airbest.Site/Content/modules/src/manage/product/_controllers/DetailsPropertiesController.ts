
module app.manage {

    class ManageProductPropertiesInfoController {
        public product = null;
        public props = null;
        public langs;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private $product: app.services.ProductService,
            private $ui: app.services.UIService
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


        /**
         * submit:
         *      提交
         */
        public submit() {
            if (!confirm("确认要保存对型号规格的修改吗?"))
                return;

            this.updateIndex();

            let u = "/api/product/property/replace-all";
            let f = { productId: this.product.id };
            let q = this.$http.post<any>(u, this.props, { params: f }).then(rsp => {
                return this.load();
            });

            this.$ui.lockFor("正在保存", q);
        }

        /**
         * updateIndex:
         *      更新列表的index属性
         */
        public updateIndex() {
            // props
            _.forEach<any>(this.props, (prop, i) => {
                prop.index = i;

                // items
                _.forEach<any>(prop.items || [], (item, ii) => {
                    item.index = ii;
                });
            });
        }

        /**
         * load:
         *      加载数据
         */
        public load() {
            let pid = this.product.id;
            let u = "/api/product/property";
            let f = {
                productId: pid,
                includes: "res,items"
            };

            this.props = null;
            return this.$http.get<any>(u, { params: f }).then(rsp => {
                let r = rsp.data;
                this.props = r.data;
            });
        }

        public addProp() {
            this.props.push({
                type: "scalar"
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

    $module.directive("productDetailsProperties", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-properties.html",
            restrict: "E",
            replace: true,
            controller: ManageProductPropertiesInfoController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}