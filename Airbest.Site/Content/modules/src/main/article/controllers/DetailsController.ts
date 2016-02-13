

module app.article {

    class ArticleDetailsController {

        public title: string;
        public article: any;
        public content: any = null;

        constructor(
            private $location: ng.ILocationService,
            private $http: ng.IHttpService,
            private $sce: ng.ISCEService,
            private $timeout: ng.ITimeoutService,
            private $ui: services.IUIService
        ) { 
            this.title = $location.search().title || "";
            let id = $location.search().id;

            this.$ui.lock();
            this.$http.get<any>("/api/article/" + id)

                .then(httpRsl => {
                    this.$ui.unlock();
                    let r = httpRsl.data;
                    this.article = r.data;
                    this.title = this.article.title;
                    this.content = this.$sce.trustAsHtml(this.article.content);

                }, httpRsl => {
                    this.$ui.unlock();
                    alert("系统繁忙, 请稍候再试");
                });
        }
    }

    $module.controller("ArticleDetailsController", ArticleDetailsController);
}