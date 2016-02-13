var app;
(function (app) {
    var main;
    (function (main) {
        var NewsDetailsController = (function () {
            function NewsDetailsController($ui, $news, $location, $sce) {
                this.$ui = $ui;
                this.$news = $news;
                this.$location = $location;
                this.$sce = $sce;
                this.relateds = [];
                this.id = $location.search().id;
                this.load();
            }
            NewsDetailsController.prototype.load = function () {
                var _this = this;
                this.$ui.acc(function () {
                    return _this.$news.get(_this.id).then(function (r) {
                        _this.news = r;
                        _this.news.content = _this.$sce.trustAsHtml(_this.news.content);
                        _this.loadRelateds();
                    });
                });
            };
            NewsDetailsController.prototype.loadRelateds = function () {
                var _this = this;
                var filter = {
                    townId: this.news.townId,
                    take: 3
                };
                return this.$news.getList(filter).then(function (r) {
                    _this.relateds = r.data;
                });
            };
            return NewsDetailsController;
        }());
        main.NewsDetailsController = NewsDetailsController;
        app.$module.controller("NewsDetailsController", NewsDetailsController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=NewsDetailsController.js.map