var app;
(function (app) {
    var main;
    (function (main) {
        var NewsIndexController = (function () {
            function NewsIndexController($ui, $news, $town, $location, $rootScope) {
                var _this = this;
                this.$ui = $ui;
                this.$news = $news;
                this.$town = $town;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.news = [];
                this.hasMore = true;
                this.filter = {};
                this.loading = false;
                this.filter.townId = $location.search().townId;
                this.load();
                if (this.filter.townId) {
                    this.$town.get(this.filter.townId).then(function (r) {
                        _this.$rootScope["pageTitle"] = r.name + "新闻";
                    });
                }
            }
            NewsIndexController.prototype.load = function () {
                var _this = this;
                if (this.loading || !this.hasMore)
                    return;
                this.loading = true;
                this.$ui.acc(function () {
                    _this.filter.take = 40;
                    _this.filter.skip = _this.news.length;
                    _this.filter.includes = "town";
                    return _this.$news.getList(_this.filter).then(function (r) {
                        Array.prototype.push.apply(_this.news, r.data);
                        if (!r.data.length)
                            _this.hasMore = false;
                    });
                }).finally(function () {
                    _this.loading = false;
                });
            };
            return NewsIndexController;
        }());
        main.NewsIndexController = NewsIndexController;
        app.$module.controller("NewsIndexController", NewsIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=NewsIndexController.js.map