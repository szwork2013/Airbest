
module app.services {

    export class VerifyService {
        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService
        ) {
        }

        /**
         * send sms verify code
         * @param phone
         */
        public sendSms(phone: string) {
            return this.$q<any>(
                (resolve, reject) => {
                    let data = { phone: phone };
                    this.$http.post("/api/sms-verify/send", data)
                        .then(rsp => {
                            resolve(rsp.data);
                        });
                }
            );
        }

        /**
         * test sms verify code
         * @param phone
         * @param code
         */
        public testSms(phone: string, code) {
            return this.$q<any>(
                (resolve, reject) => {
                    let data = { phone: phone, code: code };
                    this.$http.post("/api/sms-verify/test", data)
                        .then(rsp => {
                            resolve(rsp.data);
                        });
                }
            );
        }
    }

    $module.service("$verify", VerifyService);
}