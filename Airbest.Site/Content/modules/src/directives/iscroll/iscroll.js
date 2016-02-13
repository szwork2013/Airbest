var app;
(function (app) {
    var directives;
    (function (directives) {
        var IScrollController = (function () {
            function IScrollController($scope, $timeout, $interval) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$interval = $interval;
                this.holdingGesture = null;
                this.ready = false;
                this.wrapper = null;
                this.flow = null;
                this.inst = null;
                this.gesturePullDown = null;
                this.gesturePullUp = null;
                this.scrollBottom = null;
                this.scrollTop = null;
                this.autoRefresh = false;
                this.debug = false;
                $scope.$on("$destroy", function (e) {
                    _this.inst && _this.inst.destroy();
                });
            }
            IScrollController.prototype.init = function (wrapper, attrs) {
                var _this = this;
                if (attrs["gesturePullDown"])
                    this.gesturePullDown = this.$scope["gesturePullDown"];
                if (attrs["gesturePullUp"])
                    this.gesturePullUp = this.$scope["gesturePullUp"];
                if (attrs["scrollTop"])
                    this.scrollTop = this.$scope["scrollTop"];
                if (attrs["scrollBottom"])
                    this.scrollBottom = this.$scope["scrollBottom"];
                this.autoRefresh = (attrs["autoRefresh"] != null);
                this.debug = (attrs["debug"] != null);
                this.$timeout(function () {
                    var opts = { click: true };
                    if (_this.isNeedGestures()) {
                        _this.debug && console.log("iscroll probeType", opts.probeType);
                        opts.probeType = 2;
                    }
                    if (_this.gesturePullDown || _this.gesturePullUp)
                        opts.bounce = true;
                    _this.inst = new IScroll(wrapper.get(0), opts);
                    _this.wrapper = wrapper;
                    _this.flow = angular.element(_this.inst.scroller);
                    _this.initGestures();
                    _this.initAutoRefresh();
                    _this.wrapper.toggleClass("iscroll-wrapper", true);
                    _this.flow.toggleClass("iscroll-flow", true);
                    _this.ready = true;
                    if (_this.debug) {
                        console.log("iscroll init", _this);
                    }
                }, 200);
            };
            IScrollController.prototype.refresh = function () {
                var _this = this;
                this.$timeout(function () {
                    _this.inst && _this.inst.refresh();
                });
            };
            IScrollController.prototype.isNeedGestures = function () {
                return this.gesturePullDown || this.gesturePullUp || this.scrollTop || this.scrollBottom;
            };
            IScrollController.prototype.initGestures = function () {
                var _this = this;
                var threshold = 60;
                if (!this.isNeedGestures())
                    return;
                if (this.debug) {
                    console.log("iscroll initGestures", this.gesturePullDown, this.gesturePullUp);
                }
                this.inst.on("scroll", function () {
                    if (_this.inst.y >= threshold) {
                        if (_this.holdingGesture != "pull-down") {
                            _this.holdingGesture = "pull-down";
                            _this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", true);
                            if (_this.debug) {
                                console.log("iscroll scroll", _this.holdingGesture);
                            }
                        }
                    }
                    else if ((_this.inst.maxScrollY - _this.inst.y) >= threshold) {
                        if (_this.holdingGesture != "pull-up") {
                            _this.holdingGesture = "pull-up";
                            _this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", true);
                            if (_this.debug) {
                                console.log("iscroll scroll", _this.holdingGesture);
                            }
                        }
                    }
                });
                this.inst.on("scrollEnd", function () {
                    if (_this.holdingGesture) {
                        if (_this.debug) {
                            console.log("iscroll scrollEnd", _this.holdingGesture);
                        }
                        switch (_this.holdingGesture) {
                            case "pull-down":
                                _this.gesturePullDown && _this.gesturePullDown();
                                console.log("iscroll exec", _this.gesturePullDown);
                                _this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", false);
                                break;
                            case "pull-up":
                                _this.gesturePullUp && _this.gesturePullUp();
                                _this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", false);
                                break;
                        }
                        _this.holdingGesture = null;
                    }
                    _this.triggerScrollToEdge();
                });
            };
            IScrollController.prototype.triggerScrollToEdge = function () {
                if (this.inst.y >= 0)
                    this.scrollTop && this.scrollTop();
                if (this.inst.y <= this.inst.maxScrollY)
                    this.scrollBottom && this.scrollBottom();
            };
            IScrollController.prototype.initAutoRefresh = function () {
                // TODO: 启用自动 refresh
                //if (!this.autoRefresh)
                //    return;
                var _this = this;
                var timer = this.$interval(function () {
                    var flowHeight = _this.flow.outerHeight();
                    var wrapperHeight = _this.wrapper.outerHeight();
                    if (flowHeight < wrapperHeight
                        && _this.inst.scrollerHeight == wrapperHeight)
                        return;
                    if (_this.inst.scrollerHeight != flowHeight) {
                        if (_this.debug) {
                            console.log("refresh: auto", wrapperHeight, _this.inst.scrollerHeight, _this.flow.outerHeight(), _this.flow.height());
                        }
                        _this.refresh();
                    }
                }, 1200);
                this.$scope.$on("$destroy", function (e) {
                    timer && _this.$interval.cancel(timer);
                });
            };
            return IScrollController;
        }());
        directives.IScrollController = IScrollController;
        directives.$module.directive("iscroll", function ($window, $location, $timeout, $interval) {
            return {
                restrict: 'EA',
                scope: {
                    gesturePullDown: "&",
                    gesturePullUp: "&",
                    scrollTop: "&",
                    scrollBottom: "&",
                },
                controller: IScrollController,
                link: function (scope, element, attrs, ctrl) {
                    ctrl.init(element, attrs);
                    var name = attrs["name"];
                    if (name && scope.$parent) {
                        scope.$parent[name] = ctrl;
                    }
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=iscroll.js.map