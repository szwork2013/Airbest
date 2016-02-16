var app;
(function (app) {
    var services;
    (function (services) {
        var UIService = (function () {
            function UIService($q, $window) {
                this.$q = $q;
                this.$window = $window;
                var _el = document.querySelector("#ui-lock-mask");
                var _tx = document.querySelector("#ui-lock-mask .text");
                this.el = angular.element(_el);
                this.tx = angular.element(_tx);
                this.defaultText = this.tx.text();
            }
            UIService.prototype.lockFor = function (s, p) {
                var _this = this;
                this.lock(s);
                return p.finally(function () {
                    _this.unlock();
                });
            };
            UIService.prototype.lock = function (text) {
                this.el.toggleClass("active", true);
                this.tx.text(text || this.defaultText || "");
            };
            UIService.prototype.unlock = function () {
                this.el.toggleClass("active", false);
            };
            UIService.prototype.acc = function (fn, s, errMsg) {
                var _this = this;
                if (s === void 0) { s = null; }
                if (errMsg === void 0) { errMsg = null; }
                this.lock(s);
                return fn().then(function (r) {
                    return _this.$q.resolve(r);
                }, function (r) {
                    errMsg = errMsg || (r && r.errMsg);
                    if (errMsg)
                        alert(errMsg);
                    return _this.$q.reject(r);
                }).finally(function () {
                    _this.unlock();
                });
            };
            return UIService;
        }());
        services.UIService = UIService;
        services.$module.service("$ui", UIService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
