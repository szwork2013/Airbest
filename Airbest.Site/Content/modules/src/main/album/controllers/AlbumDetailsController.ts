
module app.main {

    export class AlbumDetailsController {
        public photo: any;
        public id: string;
        public albumId: string;

        constructor(
            public $town: app.services.TownService,
            public $rootScope: ng.IRootScopeService,
            public $album: app.services.AlbumService,
            public $ui: app.services.UIService,
            public $location: ng.ILocationService
        ) {
            let o = $location.search();
            this.load(o);
        }

        public load(o) {
            this.$ui.acc(() => {
                var filter = { includes: "prev,next" };
                return (
                    o.albumId
                        ? this.$album.getFirstPhoto(o.albumId, filter)
                        : this.$album.getPhoto(o.id, filter)
                ).then(r => {
                    this.photo = r;

                    if (this.photo.albumId) {
                        this.$town.get(this.photo.albumId).then(r => {
                            this.$rootScope["pageTitle"] = r.name + "风貌";
                        });
                    }
                });
            });
        }
    }

    $module.controller("AlbumDetailsController", AlbumDetailsController);
}