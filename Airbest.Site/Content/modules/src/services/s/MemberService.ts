

module app.services {

    export class MemberService {
        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService) {
        }

        /**
         * is account already exists
         * @param account
         */
        public isExists(name: string) {
            return this.$http.post<any>("/api/member/exists/" + name, {})
                .then(rsp => {
                    return this.$q.resolve(rsp.data as boolean);
                });
        }

        /**
         * set new password
         */
        public setPassword(params: any) {
            return this.$q<any>(
                (resolve, reject) => {
                    this.$http.post<any>(
                        "/api/member/set-password/", params)
                        .then(rsp => {
                            resolve(rsp.data);
                        });
                });
        }

        public setPasswordByVerifyCode(model) {
            return this.$q<any>(
                (resolve, reject) => {
                    this.$http.post<any>(
                        "/api/passport/set-password", model)
                        .then(rsp => {
                            resolve(rsp.data);
                        });
                });
        }

        public applyForMaster(id) {
            let url = ["/api/member", id, "apply-for-master"].join("/")
            return this.$http.post<any>(url, {}).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public updateProfile(o) {
            let url = "/api/member/update-profile";
            return this.$http.post<any>(url, o).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        /**
         * 获取指定的 member信息
         * @param mid id
         */
        public get(mid: number) {
            let url = "/api/member/" + mid;
            return this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        /**
         * 获取会员列表.
         * @param filter
         */
        public getList(filter) {
            filter = filter || {};
            let url = "/api/member/"
            return this.$http.get<any>(url, { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }
    }

    $module.service("$member", MemberService);
}