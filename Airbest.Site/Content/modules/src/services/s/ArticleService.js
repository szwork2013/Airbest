var app;
(function (app) {
    var services;
    (function (services) {
        var ArticleService = (function () {
            function ArticleService() {
            }
            return ArticleService;
        }());
        services.ArticleService = ArticleService;
        services.$module.controller("$article", ArticleService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=ArticleService.js.map