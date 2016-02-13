
module app.services {
    
    export class FavoriteService {
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
                let url = ["/api/member", mid, "favorite/contains", id].join("/");
                return this.$http.get<any>(url).then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r.data);
                });
            });
        }

        /**
         * 添加/移除收藏夹中的商品
         * @param id
         */
        public toggle(id: number) {
            return this.$identity.checkout().then(r => {
                let mid = this.$identity.signedMember.id;
                let url = ["/api/member", mid, "favorite/toggle", id].join("/");
                return this.$http.post<any>(url, {}).then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r.data);
                });
            });
        }

        /**
         * 获取收藏夹中的商品列表
         */
        public products(filter = null) {
            filter = filter || {};
            return this.$identity.checkout().then(r => {
                let mid = this.$identity.signedMember.id;
                let url = ["/api/member", mid, "favorite"].join("/");
                return this.$http.get<any>(url, { params: filter }).then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r);
                });
            });
        }
    }

    $module.service("$favorite", FavoriteService);
}