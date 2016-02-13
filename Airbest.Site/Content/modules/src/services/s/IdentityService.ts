
module app.services {
    export class IdentityService {
        public signedMember: any;
        public _has_checkout = false;

        constructor(
            private $window,
            private $location,
            private $http: ng.IHttpService,
            private $q: ng.IQService) {
        }

        public signIn(o) {
            let deferred = this.$q.defer<utils.IApiResult<any>>();

            this.$http.post<any>("/api/passport/signin", o).then(httpRsl => {
                var r = httpRsl.data;
                this.signedMember = r.signedMember;
                deferred.resolve(r);
            });

            return deferred.promise;
        }

        public get mid() {
            let m = this.signedMember;
            return m && m.id;
        }

        public signOut() {
            return this.$q<any>((resolve, reject) => {
                if (!this.signedMember)
                    resolve({ success: true });
                else {
                    this.$http.post<any>("/api/passport/signout", {}).then(rsp => {
                        let r = rsp.data;
                        this.signedMember = null;
                        resolve(r);
                    });
                }
            });
        }

        public checkout() {
            if (this._has_checkout)
                return this.$q.resolve<any>(this.signedMember);

            return this.$http.post<any>("/api/passport/checkout", {}).then(rsp => {
                this.signedMember = rsp.data;
                this._has_checkout = true;
                return this.$q.resolve<any>(this.signedMember);
            });
        }

        /**
         * test password 
         */
        public testPassword(account: string, password: string) {
            return this.$q<any>((resolve, reject) => {
                let params = { account: account, password: password };
                this.$http.post<any>("/api/passport/test-password", params).then(rsp => {
                    let r = rsp.data;
                    resolve(r);
                });
            });
        }

        public updateApp(model) {
            return this.checkout().then(r => {
                let url = "/api/member-application/update";
                return this.$http.post<any>(url, model).then(rsp => {
                    let r = rsp.data;
                    this.signedMember.app = r.data;
                    return this.$q.resolve(r.data);
                });
            });
        }
    };
    
    /** register */
    $module.service("$identity", IdentityService);
}