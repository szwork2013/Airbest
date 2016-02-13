
module app.services {

    export class AlbumService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
        }

        /**
         * 获取商品列表
         * @param filter
         */
        public getAlbumList(filter: any) {
            filter = filter || {};
            return this.$http.get<any>("/api/album", { params: filter }).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public getFirstPhoto(albumId: string, filter = null) {
            filter = filter || {};
            var url = "/api/album/first-photo/" + albumId;
            return this.$http.get<any>(url, { params: filter }).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public getPhoto(id: string, filter = null) {
            filter = filter || {};
            var url = "/api/album/photo/" + id;
            return this.$http.get<any>(url, { params: filter }).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public getPhotoList(filter) {
            filter = filter || {};
            var url = "/api/album/photo/";
            return this.$http.get<any>(url, { params: filter }).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public updateOrAddPhoto(data) {
            let url = "/api/album/photo/update-or-add";
            return this.$http.post<any>(url, data).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }
    }

    $module.service("$album", AlbumService);
}