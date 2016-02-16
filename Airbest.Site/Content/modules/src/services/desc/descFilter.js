var app;
(function (app) {
    var services;
    (function (services) {
        services.descDict = {
            /**
             * 订单退货状态.
             */
            "orderRefundStatus": {
                "1": "审核中",
                "2": "退货成功",
                "3": "退货失败"
            },
            /**
             * 退货类型.
             */
            "orderRefundType": {
                "0": "质量问题",
                "1": "零库存退货",
                "2": "其他",
            },
            "salesmanType": {
                "0": "业务员",
                "1": "代理",
            },
        };
        services.$module.filter('desc', function () {
            return function (input, type) {
                if (!type || !services.descDict[type])
                    return "";
                var dic = services.descDict[type];
                var key = (input == null ? "" : input.toString()) || "$unknown";
                return dic[key] || dic["$unknown"];
            };
        });
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
