﻿
module app.manage {

    class ManageProductDetailsInfoController {
        public langs;
        public model = null;
        public product = null;

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
            this.$product.getRes(this.product.id).then(r => {
                this.model = r;
                _.forEach<any>(this.langs, lang => {
                    this.model[lang.code] = this.model[lang.code] || {};
                });
            });
        }

        public submit() {
            this.$product.updateRes(this.product.id, this.model).then(r => {
                alert("更新成功");
            });
        }
    }

    $module.directive("productDetailsInfo", function () {
        return {
            templateUrl: "/Content/modules/src/manage/product/details-info.html",
            restrict: "E",
            replace: true,
            controller: ManageProductDetailsInfoController,
            controllerAs: "ctrl",
            scope: {
                product: "="
            }
        };
    });
}