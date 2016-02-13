
module app.services {

    export class MainGroupService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
        }

        /**
         * 获取商品列表
         * @param filter
         */
        public getMessageList(filter: any) {
            return this.$http.get<any>("/api/mail-group/message", { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        public postMessage(o) {
            return this.$http.post<any>("/api/mail-group/message/post", o).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public getMessage(id) {
            let url = "/api/mail-group/message/" + id;
            return this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }
    }

    $module.service("$mailGroup", MainGroupService);
}