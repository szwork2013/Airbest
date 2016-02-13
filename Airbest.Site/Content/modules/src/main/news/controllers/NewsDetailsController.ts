
module app.main {

    export class NewsDetailsController {
        public news: any;
        public id: string;
        public relateds = [];

        constructor(
            public $ui: app.services.UIService,
            public $news: app.services.NewsService,
            public $location: ng.ILocationService,
            public $sce: ng.ISCEService
        ) {
            this.id = $location.search().id;
            this.load();
        }

        public load() {
            this.$ui.acc(() => {
                return this.$news.get(this.id).then(r => {
                    this.news = r;
                    this.news.content = this.$sce.trustAsHtml(this.news.content);

                    this.loadRelateds();
                });
            });
        }

        public loadRelateds() {
            var filter = {
                townId: this.news.townId,
                take: 3
            };

            return this.$news.getList(filter).then(r => {
                this.relateds = r.data;
            });
        }
    }

    $module.controller("NewsDetailsController", NewsDetailsController);
}