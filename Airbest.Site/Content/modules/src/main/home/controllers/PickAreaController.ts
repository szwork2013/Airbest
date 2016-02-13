
module app {

    class HomePickAreaController {
        public data: any[] = null;
        public returnUrl: string;
        public hasNextView = true;
        public selected: string = null;

        constructor(
            private $ui: app.services.UIService,
            private $http: ng.IHttpService,
            private $location: ng.ILocationService,
            private $route: ng.route.IRouteService,
            private $q: ng.IQService
        ) {
            this.returnUrl = $location.search().returnUrl;
            this.reset();
        }

        public reset() {
            this.selected = null;
            this.hasNextView = true;
            this.$ui.acc(() => {
                return this.getAreas(null).then(r => {
                    this.data = r;
                });
            });
        }

        public getAreas(parentId: string) {
            var filter = { parentId: parentId };
            return this.$http.get<any>("/api/area", { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data as any[]);
            });
        }

        public return() {
            this.$location.url(this.returnUrl).search({ areaId: this.selected });
        }

        public pick(it) {
            this.$ui.acc(() => {
                return this.getAreas(it.id).then(r => {
                    if (r.length) {
                        this.data = r;
                    } else {
                        this.hasNextView = false;
                        this.selected = it.id;
                    }
                });
            });
        }
    }

    $module.controller("HomePickAreaController", HomePickAreaController);
}