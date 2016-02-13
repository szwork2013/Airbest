
module app.services {

    export class OrderService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
        }

        /**
         * 指定商品的预定数量.
         * @param id
         */
        public bookingCount(id: number) {
            let url = ["/api/product", id, "booking-count"].join("/");
            return this.$http.get<any>(url).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r.data as number);
            });
        }

        /**
         * 
         * @param filter
         */
        public getList(filter) {
            let url = "/api/order";
            filter.v = Date.now();
            let cfg = { params: filter };
            return this.$http.get<any>(url, cfg).then(rsp=> {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        public statusText(status) {
            switch (status) {
                case 6: return "申请退货";
                case 8: return "申请换货";
                case 7: return "申请退货";
                case 2: return "等待发货";
                case 4: return "已经关闭";
                case 5: return "已经完成";
                case 7: return "已经发货";
                case 1: return "等待付款";
            }
            return status.toString();
        }

        public get(id: string) {
            let url = "/api/order/" + id;
            return this.$http.get<any>(url, {}).then(rsp=> {
                let r = rsp.data;
                return this.$q.resolve(r.data);
            });
        }

        public close(id) {
            let url = "/api/order/close/" + id;
            return this.$http.post<any>(url, {}).then(rsp=> {
                let r = rsp.data;
                return this.$q.resolve(r.data as boolean);
            });
        }
    }

    $module.service("$order", OrderService);
}