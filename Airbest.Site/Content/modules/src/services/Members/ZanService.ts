
module app.services {
    
    export class ZanService {
        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $identity: app.services.IdentityService
        ) {
        }

        /**
         * 检查收藏夹中是否包含指定的商品.
         * @param id
         */
        public contains(id: number) {
            return this.$identity.checkout().then(r => {
                let mid = this.$identity.signedMember.id;
                let url = ["/api/member", mid, "zan/contains", id].join("/");
                return this.$http.get<any>(url).then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r.data);
                });
            });
        }

        /**
         * 获取给指定商品点赞的会员列表.
         * @param id
         */
        public product(id: number) {
            let url = "/api/zan/product/" + id;
            return this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        /**
         * 添加/移除收藏夹中的商品
         * @param id
         */
        public toggle(id: number) {
            return this.$identity.checkout().then(r => {
                let mid = this.$identity.signedMember.id;
                let url = ["/api/member", mid, "zan/toggle", id].join("/");
                return this.$http.post<any>(url, {}).then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r.data);
                });
            });
        }
    }

    $module.service("$zan", ZanService);
}