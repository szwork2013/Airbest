var app;
(function (app) {
    var main;
    (function (main) {
        var AddressFromMapController = (function () {
            function AddressFromMapController($bmap, $interval, $scope, $location, $timeout) {
                this.$bmap = $bmap;
                this.$interval = $interval;
                this.$scope = $scope;
                this.$location = $location;
                this.$timeout = $timeout;
                this.busy = false;
                this.marker = null;
                this.moving = false;
            }
            AddressFromMapController.prototype.initMap = function () {
                var _this = this;
                this.createMap();
                console.log("init-map");
                this.map.addEventListener("movestart", function (e) {
                    _this.moving = true;
                });
                this.map.addEventListener("moving", function (e) {
                });
                this.map.addEventListener("moveend", function (e) {
                    var center = _this.map.getCenter();
                    _this.moving = false;
                    if (!_this.busy
                        && center
                        && (!_this.lastCenter || !center.equals(_this.lastCenter))) {
                        _this.busy = true;
                        _this.lastCenter = center;
                        if (_this.marker) {
                            _this.marker.setPosition(center);
                        }
                        _this.$bmap.geoDecode(center).then(function (r) {
                            _this.options = r.result.pois;
                        }).finally(function () {
                            _this.busy = false;
                        });
                    }
                });
            };
            /**
             * 创建地图.
             * @param el
             */
            AddressFromMapController.prototype.createMap = function () {
                var _this = this;
                var el = document.getElementById("bmap-wrapper");
                this.map = new BMap.Map(el);
                var geolocationControl = new BMap.GeolocationControl();
                var navigationControl = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                    enableGeolocation: true
                });
                this.map.addControl(navigationControl);
                this.map.addControl(geolocationControl);
                this.map.centerAndZoom(new BMap.Point(120.705869, 28.000845), 17);
                this.$bmap.hereBMP().then(function (r) {
                    var c = new BMap.Point(r.lng, r.lat);
                    _this.map.centerAndZoom(c, 17);
                    _this.marker = new BMap.Marker(c);
                    _this.map.addOverlay(_this.marker);
                    _this.marker.enableDragging();
                    _this.marker.addEventListener("dragend", function (e) {
                        _this.map.panTo(e.point);
                    });
                }, function () {
                    alert("定位失败!");
                });
            };
            /**
             * 提交结果.
             * @param val
             */
            AddressFromMapController.prototype.submit = function (val) {
                this.$location.url("address").search({ address: val });
            };
            return AddressFromMapController;
        }());
        app.$module.controller("AddressFromMapController", AddressFromMapController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressFromMapController.js.map