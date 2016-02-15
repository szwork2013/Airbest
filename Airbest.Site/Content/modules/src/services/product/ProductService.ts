
module app.services {

    export interface IProduct {
        id: string;
        name: string;
    }

    export class ProductService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {
        }

        /**
         * 创建商品.
         * @param m
         */
        public create(m: Object) {
            let u = "/api/product/create";
            return this.$http.post<IProduct>(u, m).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public getSpecials(filter) {
            let u = "/api/product/special";
            return this.$http.get<any>(u, { params: filter }).then(rsp => {
                return rsp.data;
            });
        }

        public updateSpecials(pid: string, data: any[]) {
            let u = "/api/product/special/update";
            let params = { productId: pid, replace: true };
            return this.$http.post<any>(u, data, { params: params }).then(rsp => {
                return rsp.data;
            });
        }

        /**
         * 获取商品列表
         * @param filter
         */
        public getList(filter: any) {
            return this.$http.get<any>("/api/product", { params: filter }).then(rsp => {
                let r = rsp.data;
                return this.$q.resolve(r);
            });
        }

        /**
         * 获取商品
         * @param id
         */
        public get(id: number) {
            if (!id) {
                return this.$q.reject(null);
            } else {
                return this.$http.get<any>("/api/product/" + id)
                    .then(rsp => {
                        let r = rsp.data;
                        return this.$q.resolve(r);
                    });
            }
        }

        public getRes(id: string) {
            let u = ["/api/product", id, "/res"].join("/");
            return this.$http.get<any>(u).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public update(id: string, m) {
            let u = "/api/product/" + id + "/update";
            return this.$http.post<any>(u, m).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public updateRes(id: string, m) {
            let u = "/api/product/" + id + "/update-res";
            return this.$http.post<any>(u, m).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        public updateOrAdd(data) {
            let url = "/api/product/update-or-add";
            return this.$http.post<any>(url, data).then(rsp => {
                return this.$q.resolve(rsp.data);
            });
        }

        /**
         * 工厂区商品
         * @param code
         */
        public factory(code: string) {
            let url = "/api/product/factory/" + code;
            return this.$http.get<any>(url)
                .then(rsp => {
                    let r = rsp.data;
                    return this.$q.resolve(r.data);
                });
        }

        /**
         * @param v
         */
        public priceTypeText(v) {
            switch (v) {
                case 4: return "爆款专区";
                case 5: return "新品专区";
                case 1: return "零库存区";
                case 6: return "活动促销区";
                case 7: return "特价折扣区";
                case 3: return "预售区";
                case 2: return "工厂区";
                default: return "";
            }
        }

        /**
         * @param v
         */
        public priceTypeShortText(v) {
            switch (v) {
                case 4: return "爆款";
                case 5: return "5天左右发货";
                case 1: return "零库存";
                case 6: return "活动促销";
                case 7: return "特价折扣";
                case 3: return "预售";
                case 2: return "工厂";
                default: return "";
            }
        }

        /**
         * 
         */
        public categoryList(filter) : any {
        }

        /**
         * 
         */
        public category(): any {
        }
    }

    $module.service("$product", ProductService);
}