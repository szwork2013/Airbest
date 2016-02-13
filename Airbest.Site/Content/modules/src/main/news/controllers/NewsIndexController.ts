
module app.main {

    export class NewsIndexController {
        public news: any[] = [];
        public hasMore = true;
        public filter: any = {};
        public loading = false;

        constructor(
            public $ui: app.services.UIService,
            public $news: app.services.NewsService,
            public $town: app.services.TownService,
            public $location: ng.ILocationService,
            public $rootScope: ng.IRootScopeService
        ) {
            this.filter.townId = $location.search().townId;
            this.load();

            if (this.filter.townId) {
                this.$town.get(this.filter.townId).then(r => {
                    this.$rootScope["pageTitle"] = r.name + "新闻";
                });
            }
        }

        public load() {
            if (this.loading || !this.hasMore)
                return;

            this.loading = true;
            this.$ui.acc(() => {
                this.filter.take = 40;
                this.filter.skip = this.news.length;
                this.filter.includes = "town";

                return this.$news.getList(this.filter).then(r => {
                    Array.prototype.push.apply(this.news, r.data);
                    if (!r.data.length)
                        this.hasMore = false;
                });
            }).finally(() => {
                this.loading = false;
            });
        }

    }

    $module.controller("NewsIndexController", NewsIndexController);
}