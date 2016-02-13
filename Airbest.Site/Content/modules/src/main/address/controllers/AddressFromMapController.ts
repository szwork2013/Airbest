
module app.main {

    class AddressFromMapController {

        public lastCenter: any;
        public busy = false;
        public marker = null;
        public options: any[];
        public map: any;
        public moving = false;

        constructor(
            public $bmap: app.bmap.BMapService,
            public $interval: ng.IIntervalService,
            public $scope: ng.IScope,
            public $location: ng.ILocationService,
            public $timeout: ng.ITimeoutService
        ) {
        }

        public initMap() {
            this.createMap();
            console.log("init-map");

            this.map.addEventListener("movestart", (e) => {
                this.moving = true;
            });

            this.map.addEventListener("moving", (e) => {
            });

            this.map.addEventListener("moveend", (e) => {
                let center = this.map.getCenter();
                this.moving = false;

                if (!this.busy
                    && center
                    && (!this.lastCenter || !center.equals(this.lastCenter))) {

                    this.busy = true;
                    this.lastCenter = center;
                    if (this.marker) {
                        this.marker.setPosition(center);
                    }

                    this.$bmap.geoDecode(center).then(r => {
                        this.options = r.result.pois;
                    }).finally(() => {
                        this.busy = false;
                    });
                }
            });
        }

        /**
         * 创建地图.
         * @param el
         */
        public createMap() {
            let el = document.getElementById("bmap-wrapper");
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

            this.$bmap.hereBMP().then(r => {
                let c = new BMap.Point(r.lng, r.lat);
                this.map.centerAndZoom(c, 17);
                this.marker = new BMap.Marker(c);
                this.map.addOverlay(this.marker);
                this.marker.enableDragging();
                this.marker.addEventListener("dragend", (e) => {
                    this.map.panTo(e.point);
                });
            }, () => {
                alert("定位失败!");
            });
        }

        /**
         * 提交结果.
         * @param val
         */
        public submit(val) {
            this.$location.url("address").search({ address: val });
        }
    }

    $module.controller("AddressFromMapController", AddressFromMapController);
}