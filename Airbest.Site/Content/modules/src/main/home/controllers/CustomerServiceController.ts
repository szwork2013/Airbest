
module app {
    class HomeCustomerServiceController {
        public goBdsq() {
            let a = document.getElementById("QIAO_ICON_CONTAINER") as HTMLAnchorElement;
            location.href = a.href;
        }
    };

    $module.controller("HomeCustomerServiceController", HomeCustomerServiceController);
}