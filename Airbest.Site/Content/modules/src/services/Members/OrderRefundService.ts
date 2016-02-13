
module app.services {

    export class OrderRefundService {
        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $identity: app.services.IdentityService
        ) {
        }

        public add(model) {
            let url = ["/api/order-refund/add"].join("/");
            return this.$http.post<any>(url, model).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        /**
         * 检查某商品是否允许零库存退货.
         * @param orderId
         * @param productId
         */
        public allowZsRefund(orderId, productId) {
            let data = { orderId: orderId, productId: productId }
            let url = "/api/order-refund/allow-zs-refund";
            return this.$http.get<any>(url, { params: data }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data as boolean);
            });
        }

        /**
         * 获取退货总金额
         * @param refund
         */
        public amount(refund) {
            let a = 0;
            if (refund && refund.items) {
                _.forEach<any>(refund.items, item => {
                    a += ((item.orderItem && item.orderItem.price) || 0);
                });
            }
            return a;
        }

        /**
         * 获取退货总金额
         * @param refund
         */
        public count(refund) {
            let a = 0;
            if (refund && refund.items) {
                _.forEach<any>(refund.items, item => {
                    a += (item.count || 0);
                });
            }
            return a;
        }

        /**
         * 获取单个退货记录.
         * @param id
         */
        public get(id) {
            let url = "/api/order-refund/" + id;
            return this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        /**
         * 同意此退货申请
         * @param id
         */
        public resolve(id, data) {
            let url = "/api/order-refund/resolve/" + id;
            return this.$http.post<any>(url, data).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        /**
         * 拒绝此退货申请
         * @param id
         */
        public reject(id, data) {
            let url = "/api/order-refund/reject/" + id;
            return this.$http.post<any>(url, data).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        /**
         * 获取退货列表.
         * @param filter
         */
        public getList(filter) {
            filter = filter || {};
            let url = ["/api/order-refund"].join("/");
            return this.$http.get<any>(url, { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        /**
         * 
         * @param s
         */
        public statusText(s) {
            switch (s) {
                case 1: return "处理中";
                case 2: return "退货成功";
                case 3: return "退货失败";
                default: return "";
            }
        }
    }

    $module.service("$orderRefund", OrderRefundService);
}