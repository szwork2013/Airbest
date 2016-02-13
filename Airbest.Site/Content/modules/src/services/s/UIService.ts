
module app.services {

    export interface IUIService {
        lock(s?: string);
        unlock();
    }

    export class UIService {
        private el: any;
        private tx: any;
        private defaultText: any;

        constructor(
            private $q: ng.IQService,
            private $window: ng.IWindowService
        ) {
            let _el = document.querySelector("#ui-lock-mask");
            let _tx = document.querySelector("#ui-lock-mask .text");

            this.el = angular.element(_el);
            this.tx = angular.element(_tx);
            this.defaultText = this.tx.text();
        }

        public lockFor<T>(s: string, p: ng.IPromise<T>) {
            this.lock(s);
            return p.finally(() => {
                this.unlock();
            });
        }

        public lock(text) {
            this.el.toggleClass("active", true);
            this.tx.text(text || this.defaultText || "");
        }

        public unlock() {
            this.el.toggleClass("active", false);
        }

        public acc<T>(fn: () => ng.IPromise<T>, s: string = null, errMsg: string = null) {
            this.lock(s);
            return fn().then(r => {
                return this.$q.resolve(r);
            }, r => {
                errMsg = errMsg || (r && r.errMsg);
                if (errMsg)
                    alert(errMsg);
                return this.$q.reject(r);
            }).finally(() => {
                this.unlock();
            });
        }
    }

    $module.service("$ui", UIService);
}