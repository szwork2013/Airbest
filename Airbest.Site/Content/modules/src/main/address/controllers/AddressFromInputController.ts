
module app.main {

    class AddressFromInputController {
        public city: string;
        public address: string;
        public options: any[];
        public lastAddress: string;
        public busy = false;
        public location: app.bmap.IPoint;

        constructor(
            public $bmap: app.bmap.BMapService,
            public $interval: ng.IIntervalService,
            public $location: ng.ILocationService,
            public $scope: ng.IScope
        ) {
            this.$bmap.herePOI().then(r => {
                let result = r.result;
                this.city = (result && result.addressComponent.city || "温州市");
                this.location = (result && result.location) || null;
            }, (r) => {
                this.city = "温州市";
            }).finally(() => {
                //alert("搜索范围已定位到" + this.city);
            });

            let timer = this.$interval(() => {
                if (!this.busy && this.lastAddress != this.address) {
                    this.busy = true;
                    this.lastAddress = this.address;
                    this.$bmap.placeSuggestion(this.lastAddress, this.city, this.location).then(r => {
                        this.options = r.result;
                    }).finally(() => {
                        this.busy = false;
                    });
                }
            }, 800);

            this.$scope.$on("$destroy", (e) => {
                timer && this.$interval.cancel(timer);
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

    $module.controller("AddressFromInputController", AddressFromInputController);
}