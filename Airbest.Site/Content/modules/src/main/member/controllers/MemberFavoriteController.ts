
module app {

    class MemberFavoriteController{

        constructor(
            public $ui: app.services.IUIService,
            public $favorite: app.services.FavoriteService
        ) {
            $ui.lock("正在获取收藏夹");
            $favorite.products().then(r => {
                $ui.unlock();
                this.products = r.data;
            });
        }

        public products: any[];

        /**
         * 移除收藏
         * @param product
         */
        public remove(it) {
            let i = this.products.indexOf(it);
            this.products.splice(i, 1);

            this.$favorite.toggle(it.id).then(r => {
                /** 删除成功 */
            });
        }
    }

    $module.controller("MemberFavoriteController", MemberFavoriteController);
}