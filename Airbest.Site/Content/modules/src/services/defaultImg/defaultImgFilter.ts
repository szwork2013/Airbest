

module app.services {

    export let defaultImgDict = {

        /**
         * 默认会员头像
         */
        "head": "/Content/themes/res/defaultImg.head.jpg?v=" + buildNumber,

        "pic.4x3": "/Content/themes/res/pic.4x3.png?v=" + buildNumber
    };

    $module.filter('defaultImg', function () {
        return function (input, type) {
            return input || defaultImgDict[type] || type;;
        };
    });
}