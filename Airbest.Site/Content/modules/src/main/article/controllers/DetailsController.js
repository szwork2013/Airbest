var app;
(function (app) {
    var article;
    (function (article) {
        var ArticleDetailsController = (function () {
            function ArticleDetailsController($location, $http, $sce, $timeout, $ui) {
                var _this = this;
                this.$location = $location;
                this.$http = $http;
                this.$sce = $sce;
                this.$timeout = $timeout;
                this.$ui = $ui;
                this.content = null;
                this.title = $location.search().title || "";
                var id = $location.search().id;
                this.$ui.lock();
                this.$http.get("/api/article/" + id)
                    .then(function (httpRsl) {
                    _this.$ui.unlock();
                    var r = httpRsl.data;
                    _this.article = r.data;
                    _this.title = _this.article.title;
                    _this.content = _this.$sce.trustAsHtml(_this.article.content);
                }, function (httpRsl) {
                    _this.$ui.unlock();
                    alert("系统繁忙, 请稍候再试");
                });
            }
            return ArticleDetailsController;
        }());
        app.$module.controller("ArticleDetailsController", ArticleDetailsController);
    })(article = app.article || (app.article = {}));
})(app || (app = {}));
//# sourceMappingURL=DetailsController.js.map