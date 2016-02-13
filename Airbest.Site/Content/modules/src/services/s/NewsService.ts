
module app.services {

    export class NewsService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
        }

        /**
         * 获取商品列表
         * @param filter
         */
        public getList(filter: any) {
            return this.$http.get<any>("/api/news", { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        /**
         * 获取商品
         * @param id
         */
        public get(id: string) {
            if (!id) {
                return this.$q.reject(null);
            } else {
                return this.$http.get<any>("/api/news/" + id)
                    .then(rsp => {
                        let r = rsp.data;
                        return this.$q.resolve(r);
                    });
            }
        }

        public updateOrAdd(data) {
            let url = "/api/news/update-or-add";
            return this.$http.post<any>(url, data).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }
    }

    $module.service("$news", NewsService);
}