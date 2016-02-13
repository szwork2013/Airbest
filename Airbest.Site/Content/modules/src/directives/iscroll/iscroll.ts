
module app.directives {

    export class IScrollController{
        public holdingGesture: string = null;
        public ready = false;

        public wrapper: ng.IAugmentedJQuery = null;
        public flow: ng.IAugmentedJQuery = null;
        public inst: IScroll = null;

        public gesturePullDown: Function = null;
        public gesturePullUp: Function = null;
        public scrollBottom: Function = null;
        public scrollTop: Function = null;

        public autoRefresh = false;
        public debug = false;

        constructor(
            private $scope: ng.IScope,
            private $timeout: ng.ITimeoutService,
            private $interval: ng.IIntervalService
        ) {
            $scope.$on("$destroy", (e) => {
                this.inst && this.inst.destroy();
            });
        }

        public init(wrapper: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
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

            this.$timeout(() => {
                var opts = { click: true } as IScrollOptions;
                if (this.isNeedGestures()) {
                    this.debug && console.log("iscroll probeType", opts.probeType);
                    opts.probeType = 2;
                }

                if (this.gesturePullDown || this.gesturePullUp)
                    opts.bounce = true;

                this.inst = new IScroll(wrapper.get(0), opts);
                this.wrapper = wrapper;
                this.flow = angular.element(this.inst.scroller);

                this.initGestures();
                this.initAutoRefresh();

                this.wrapper.toggleClass("iscroll-wrapper", true);
                this.flow.toggleClass("iscroll-flow", true);
                this.ready = true;
                
                if (this.debug) {
                    console.log("iscroll init", this);
                }
            }, 200);
        }

        public refresh() {
            this.$timeout(() => {
                this.inst && this.inst.refresh();
            });
        }

        public isNeedGestures() {
            return this.gesturePullDown || this.gesturePullUp || this.scrollTop || this.scrollBottom;
        }

        public initGestures() {
            let threshold = 60;

            if (!this.isNeedGestures())
                return;

            if (this.debug) {
                console.log("iscroll initGestures", this.gesturePullDown, this.gesturePullUp);
            }

            this.inst.on("scroll", () => {
                if (this.inst.y >= threshold) {
                    if (this.holdingGesture != "pull-down") {
                        this.holdingGesture = "pull-down";
                        this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", true);
                        if (this.debug) {
                            console.log("iscroll scroll", this.holdingGesture);
                        }
                    }
                }
                else if ((this.inst.maxScrollY - this.inst.y) >= threshold) {
                    if (this.holdingGesture != "pull-up") {
                        this.holdingGesture = "pull-up";
                        this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", true);
                        if (this.debug) {
                            console.log("iscroll scroll", this.holdingGesture);
                        }
                    }
                }
            });

            this.inst.on("scrollEnd", () => {
                if (this.holdingGesture) {
                    if (this.debug) {
                        console.log("iscroll scrollEnd", this.holdingGesture);
                    }
                    switch (this.holdingGesture) {
                        case "pull-down":
                            this.gesturePullDown && this.gesturePullDown();
                            console.log("iscroll exec", this.gesturePullDown);
                            this.wrapper.toggleClass("iscroll-holding-gesture-pull-down", false);
                            break;
                        case "pull-up":
                            this.gesturePullUp && this.gesturePullUp();
                            this.wrapper.toggleClass("iscroll-holding-gesture-pull-up", false);
                            break;
                    }
                    this.holdingGesture = null;
                }

                this.triggerScrollToEdge();
            });
        }

        public triggerScrollToEdge() {
            if (this.inst.y >= 0)
                this.scrollTop && this.scrollTop();

            if (this.inst.y <= this.inst.maxScrollY)
                this.scrollBottom && this.scrollBottom();
        }

        public initAutoRefresh() {
            // TODO: 启用自动 refresh
            //if (!this.autoRefresh)
            //    return;

            let timer = this.$interval(() => {
                var flowHeight = this.flow.outerHeight();
                var wrapperHeight = this.wrapper.outerHeight();

                if (flowHeight < wrapperHeight
                    && this.inst.scrollerHeight == wrapperHeight)
                    return;

                if (this.inst.scrollerHeight != flowHeight) {
                    if (this.debug) {
                        console.log("refresh: auto", wrapperHeight, this.inst.scrollerHeight, this.flow.outerHeight(), this.flow.height());
                    }
                    this.refresh();
                }
            }, 1200);

            this.$scope.$on("$destroy", (e) => {
                timer && this.$interval.cancel(timer);
            });
        }
    }

    $module.directive("iscroll", function ($window, $location, $timeout, $interval) {
        return {
            restrict: 'EA',
            scope: {
                gesturePullDown: "&",
                gesturePullUp: "&",
                scrollTop: "&",
                scrollBottom: "&",
            },

            controller: IScrollController,
            link: function (
                scope: ng.IScope,
                element: ng.IAugmentedJQuery,
                attrs: ng.IAttributes,
                ctrl: IScrollController) {

                ctrl.init(element, attrs);

                let name = attrs["name"];
                if (name && scope.$parent) {
                    scope.$parent[name] = ctrl;
                }
            }
        }
    });
}