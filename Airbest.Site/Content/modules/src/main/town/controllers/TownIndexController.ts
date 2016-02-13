

module app.main {
    class TownIndexController {
        public towns: any[];

        constructor(
            public $ui: app.services.UIService,
            public $town: app.services.TownService,
            public $location: ng.ILocationService
        ) {

            this.load();
        }

        public load() {
            this.$ui.acc(() => {
                let filter = { includes: "master" };
                return this.$town.getList(filter).then(r => {
                    this.towns = r.data;
                });
            });
        }

    }

    $module.controller("TownIndexController", TownIndexController);
}