var app;
(function (app) {
    var services;
    (function (services) {
        var ShopService = (function () {
            function ShopService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            ShopService.prototype.homeBanners = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeBanners)
                        resolve(_this._homeBanners);
                    else {
                        var url = "/api/poster/home-banner?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeBanners = r;
                            resolve(_this._homeBanners);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            ShopService.prototype.homeNavis = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeAds)
                        resolve(_this._homeAds);
                    else {
                        var url = "/Content/data/home-navi.json?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeAds = r;
                            resolve(_this._homeAds);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            ShopService.prototype.homeAds = function () {
                var _this = this;
                return this.$q(function (resolve, reject) {
                    if (_this._homeNavis)
                        resolve(_this._homeNavis);
                    else {
                        var url = "/Content/data/home-ads.json?v=" + Date.now();
                        _this.$http.get(url).then(function (rsp) {
                            var r = rsp.data;
                            _this._homeNavis = r;
                            resolve(_this._homeNavis);
                        }, function (rsp) {
                            reject({});
                        });
                    }
                });
            };
            return ShopService;
        }());
        services.ShopService = ShopService;
        services.$module.service("$shop", ShopService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
