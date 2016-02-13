var app;
(function (app) {
    var MemberFavoriteController = (function () {
        function MemberFavoriteController($ui, $favorite) {
            var _this = this;
            this.$ui = $ui;
            this.$favorite = $favorite;
            $ui.lock("正在获取收藏夹");
            $favorite.products().then(function (r) {
                $ui.unlock();
                _this.products = r.data;
            });
        }
        /**
         * 移除收藏
         * @param product
         */
        MemberFavoriteController.prototype.remove = function (it) {
            var i = this.products.indexOf(it);
            this.products.splice(i, 1);
            this.$favorite.toggle(it.id).then(function (r) {
                /** 删除成功 */
            });
        };
        return MemberFavoriteController;
    }());
    app.$module.controller("MemberFavoriteController", MemberFavoriteController);
})(app || (app = {}));
//# sourceMappingURL=MemberFavoriteController.js.map