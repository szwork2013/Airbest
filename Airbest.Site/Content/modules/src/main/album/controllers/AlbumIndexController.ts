
module app.main {

    export class AlbumIndexController {

        public albums: any[];

        constructor(
            public $album: app.services.AlbumService,
            public $ui: app.services.UIService,
            public $location: ng.ILocationService
        ) {
            this.load();
        }

        public load() {
            this.$ui.acc(() => {
                var filter = {
                    includes : ["photoCount"]
                };
                return this.$album.getAlbumList(filter).then(r => {
                    this.albums = r.data;
                });
            });
        }
    }

    $module.controller("AlbumIndexController", AlbumIndexController);
}