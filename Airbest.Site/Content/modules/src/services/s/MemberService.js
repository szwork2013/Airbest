var app;
(function (app) {
    var services;
    (function (services) {
        var MemberService = (function () {
            function MemberService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
             * is account already exists
             * @param account
             */
            MemberService.prototype.isExists = function (name) {
                var _this = this;
                return this.$http.post("/api/member/exists/" + name, {})
                    .then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            /**
             * set new password
             */
            MemberService.prototype.setPassword = function (params) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post("/api/member/set-password/", params)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            MemberService.prototype.setPasswordByVerifyCode = function (model) {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    _this.$http.post("/api/passport/set-password", model)
                        .then(function (rsp) {
                        resolve(rsp.data);
                    });
                });
            };
            MemberService.prototype.applyForMaster = function (id) {
                var _this = this;
                var url = ["/api/member", id, "apply-for-master"].join("/");
                return this.$http.post(url, {}).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            MemberService.prototype.updateProfile = function (o) {
                var _this = this;
                var url = "/api/member/update-profile";
                return this.$http.post(url, o).then(function (rsp) {
                    return _this.$q.resolve(rsp.data);
                });
            };
            /**
             * 获取指定的 member信息
             * @param mid id
             */
            MemberService.prototype.get = function (mid) {
                var _this = this;
                var url = "/api/member/" + mid;
                return this.$http.get(url).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r.data);
                });
            };
            /**
             * 获取会员列表.
             * @param filter
             */
            MemberService.prototype.getList = function (filter) {
                var _this = this;
                filter = filter || {};
                var url = "/api/member/";
                return this.$http.get(url, { params: filter }).then(function (rsp) {
                    var r = rsp.data;
                    return _this.$q.resolve(r);
                });
            };
            return MemberService;
        }());
        services.MemberService = MemberService;
        services.$module.service("$member", MemberService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=MemberService.js.map