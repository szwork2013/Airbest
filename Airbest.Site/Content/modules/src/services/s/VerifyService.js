var app;
(function (app) {
    var services;
    (function (services) {
        var VerifyService = (function () {
            function VerifyService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
             * send sms verify code
             * @param phone
             */
            VerifyService.prototype.sendSms = function (phone) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = { phone: phone };
                    _this.$http.post("/api/sms-verify/send", data)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            /**
             * test sms verify code
             * @param phone
             * @param code
             */
            VerifyService.prototype.testSms = function (phone, code) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var data = { phone: phone, code: code };
                    _this.$http.post("/api/sms-verify/test", data)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            return VerifyService;
        }());
        services.VerifyService = VerifyService;
        services.$module.service("$verify", VerifyService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
