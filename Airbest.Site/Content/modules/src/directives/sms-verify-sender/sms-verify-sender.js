var app;
(function (app) {
    var directives;
    (function (directives) {
        var SmsVerifySenderController = (function () {
            function SmsVerifySenderController() {
                this.cd = 0;
            }
            SmsVerifySenderController.prototype.send = function (phone) {
            };
            return SmsVerifySenderController;
        }());
        directives.SmsVerifySenderController = SmsVerifySenderController;
        directives.$module.directive("smsVerifySender", function ($interval, $verify) {
            return {
                restrict: 'A',
                scope: {
                    phone: "="
                },
                link: function (scope, el, attrs) {
                    var state = {};
                    scope["state"] = state;
                    if (attrs["smsVerifySender"])
                        scope.$parent[attrs["smsVerifySender"]] = state;
                    var timer = $interval(function () {
                        if (state.cd)
                            --state.cd;
                    }, 1000);
                    scope.$on("$destroy", function (e) {
                        $interval.cancel(timer);
                    });
                    el.on("click", function (e) {
                        if (scope["phone"] && !state.cd) {
                            $verify.sendSms(scope["phone"]);
                            state.cd = 60;
                        }
                    });
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=sms-verify-sender.js.map