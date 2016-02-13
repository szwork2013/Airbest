var app;
(function (app) {
    var main;
    (function (main) {
        var AddressFromInputController = (function () {
            function AddressFromInputController($bmap, $interval, $location, $scope) {
                var _this = this;
                this.$bmap = $bmap;
                this.$interval = $interval;
                this.$location = $location;
                this.$scope = $scope;
                this.busy = false;
                this.$bmap.herePOI().then(function (r) {
                    var result = r.result;
                    _this.city = (result && result.addressComponent.city || "温州市");
                    _this.location = (result && result.location) || null;
                }, function (r) {
                    _this.city = "温州市";
                }).finally(function () {
                    //alert("搜索范围已定位到" + this.city);
                });
                var timer = this.$interval(function () {
                    if (!_this.busy && _this.lastAddress != _this.address) {
                        _this.busy = true;
                        _this.lastAddress = _this.address;
                        _this.$bmap.placeSuggestion(_this.lastAddress, _this.city, _this.location).then(function (r) {
                            _this.options = r.result;
                        }).finally(function () {
                            _this.busy = false;
                        });
                    }
                }, 800);
                this.$scope.$on("$destroy", function (e) {
                    timer && _this.$interval.cancel(timer);
                });
            }
            /**
             * 提交结果.
             * @param val
             */
            AddressFromInputController.prototype.submit = function (val) {
                this.$location.url("address").search({ address: val });
            };
            return AddressFromInputController;
        }());
        app.$module.controller("AddressFromInputController", AddressFromInputController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=AddressFromInputController.js.map