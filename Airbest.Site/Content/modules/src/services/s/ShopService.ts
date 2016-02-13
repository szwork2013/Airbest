

module app.services {


    export class ShopService {
        private _homeAds;
        private _homeBanners;
        private _homeNavis;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService) {
        }

        public homeBanners() {
            return this.$q<any>((resolve, reject) => {
                if (this._homeBanners)
                    resolve(this._homeBanners);
                else {
                    let url = "/api/poster/home-banner?v=" + Date.now();
                    this.$http.get(url).then(rsp => {
                        var r = rsp.data;
                        this._homeBanners = r;
                        resolve(this._homeBanners);
                    }, rsp => {
                        reject({});
                    });
                }
            });
        }

        public homeNavis() {
            return this.$q<any>((resolve, reject) => {
                if (this._homeAds)
                    resolve(this._homeAds);
                else {
                    let url = "/Content/data/home-navi.json?v=" + Date.now();
                    this.$http.get(url).then(rsp => {
                        var r = rsp.data;
                        this._homeAds = r;
                        resolve(this._homeAds);
                    }, rsp => {
                        reject({});
                    });
                }
            });
        }

        public homeAds() {
            return this.$q<any>((resolve, reject) => {
                if (this._homeNavis)
                    resolve(this._homeNavis);
                else {
                    let url = "/Content/data/home-ads.json?v=" + Date.now();
                    this.$http.get(url).then(rsp => {
                        var r = rsp.data;
                        this._homeNavis = r;
                        resolve(this._homeNavis);
                    }, rsp => {
                        reject({});
                    });
                }
            });
        }
    }

    $module.service("$shop", ShopService);
}
