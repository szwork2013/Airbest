var app;
(function (app) {
    var services;
    (function (services) {
        var IdentityService = (function () {
            function IdentityService($window, $location, $http, $q) {
                this.$window = $window;
                this.$location = $location;
                this.$http = $http;
                this.$q = $q;
                this._has_checkout = false;
            }
            IdentityService.prototype.signIn = function (o) {
                var _this = this;
                var deferred = this.$q.defer();
                this.$http.post("/api/passport/signin", o).then(function (httpRsl) {
                    var r = httpRsl.data;
                    _this.signedMember = r.signedMember;
                    deferred.resolve(r);
                });
                return deferred.promise;
            };
            Object.defineProperty(IdentityService.prototype, "mid", {
                get: function () {
                    var m = this.signedMember;
                    return m && m.id;
                },
                enumerable: true,
                configurable: true
            });
            IdentityService.prototype.signOut = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (!_this.signedMember)
                        resolve({ success: true });
                    else {
                        _this.$http.post("/api/passport/signout", {}).then(function (rsp) {
                            var r = rsp.data;
                            _this.signedMember = null;
                            resolve(r);
                        });
                    }
                });
            };
            IdentityService.prototype.checkout = function () {
                var _this = this;
                if (this._has_checkout)
                    return this.$q.resolve(this.signedMember);
                return this.$http.post("/api/passport/checkout", {}).then(function (rsp) {
                    _this.signedMember = rsp.data;
                    _this._has_checkout = true;
                    return _this.$q.resolve(_this.signedMember);
                });
            };
            /**
             * test password
             */
            IdentityService.prototype.testPassword = function (account, password) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    var params = { account: account, password: password };
                    _this.$http.post("/api/passport/test-password", params).then(function (rsp) {
                        var r = rsp.data;
                        resolve(r);
                    });
                });
            };
            IdentityService.prototype.updateApp = function (model) {
                var _this = this;
                return this.checkout().then(function (r) {
                    var url = "/api/member-application/update";
                    return _this.$http.post(url, model).then(function (rsp) {
                        var r = rsp.data;
                        _this.signedMember.app = r.data;
                        return _this.$q.resolve(r.data);
                    });
                });
            };
            return IdentityService;
        }());
        services.IdentityService = IdentityService;
        ;
        /** register */
        services.$module.service("$identity", IdentityService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
