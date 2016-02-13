
module app.main {
    class TownSearchController {
        public towns: any[];
        public keywords = "";
        public searchedKw = "";
        public loading = false;
        public member = null;

        constructor(
            public $ui: app.services.UIService,
            public $town: app.services.TownService,
            public $interval: ng.IIntervalService,
            public $timeout: ng.ITimeoutService,
            public $location: ng.ILocationService,
            public $identity: app.services.IdentityService,
            public $scope: ng.IScope
        ) {
            $identity.checkout().then(r => {
                this.member = r;
            });

            var timer = $interval(() => {
                this.load();
            }, 100);

            $scope.$on("$destroy", (e) => {
                $interval.cancel(timer);
            });
        }

        public load() {
            if (this.searchedKw == this.keywords || this.loading)
                return;

            this.searchedKw = this.keywords;
            if (!this.searchedKw)
                this.towns = [];
            else {
                this.loading = true;
                let filter = { keywords: this.searchedKw, includes: "master" };

                this.$town.getList(filter).then(r => {
                    this.towns = r.data;
                }).finally(() => {
                    this.loading = false;
                });
            }
        }

        public go(item) {
            var returnUrl = this.$location.search().returnUrl;
            console.log("returnUrl");
            if (!returnUrl) {
                this.$location.url("town/private?id=" + item.id);
            } else {
                this.$location.url(returnUrl).search({ townId: item.id });
            }
        }
    }

    $module.controller("TownSearchController", TownSearchController);
}