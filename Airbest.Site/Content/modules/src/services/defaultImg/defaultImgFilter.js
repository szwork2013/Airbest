var app;
(function (app) {
    var services;
    (function (services) {
        services.defaultImgDict = {
            /**
             * 默认会员头像
             */
            "head": "/Content/themes/res/defaultImg.head.jpg?v=" + buildNumber,
            "pic.4x3": "/Content/themes/res/pic.4x3.png?v=" + buildNumber
        };
        services.$module.filter('defaultImg', function () {
            return function (input, type) {
                return input || services.defaultImgDict[type] || type;
                ;
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
