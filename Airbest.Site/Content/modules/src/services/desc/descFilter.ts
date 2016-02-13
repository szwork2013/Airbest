
module app.services {

    export let descDict = {

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

    $module.filter('desc', function () {
        return function (input, type) {
            if (!type || !descDict[type])
                return "";

            let dic = descDict[type];
            let key = (input == null ? "" : input.toString()) || "$unknown";
            return dic[key] || dic["$unknown"];
        };
    });
}