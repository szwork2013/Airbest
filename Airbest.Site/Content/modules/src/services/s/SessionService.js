var app;
(function (app) {
    var services;
    (function (services) {
        services.$module.factory("sessionService", function ($q, $window, $location) {
            var clientPack = $window.clientPack || {};
            return {
                /**
                 * $window.clientPack
                 */
                clientPack: clientPack,
                /**
                 * openid: 当前微信openid
                 */
                openId: clientPack.openId,
                /**
                 * signedMember:
                 */
                signedMember: clientPack.signedMember,
                goBack: function () {
                    var returnUrl = $location.search().returnUrl;
                    if (!returnUrl) {
                        $window.history.back();
                    }
                    else {
                        $location.url(returnUrl).replace();
                    }
                }
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=SessionService.js.map