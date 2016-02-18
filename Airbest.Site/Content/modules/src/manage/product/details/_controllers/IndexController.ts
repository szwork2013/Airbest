
module app.manage {
    class ManageProductDetailsIndexController {
        constructor(
            private $location: ng.ILocationService
        ) {
            let id = $location.search().id;
            $location.url("product/details/base?id=" + id);
        }
    }

    $module.controller("ManageProductDetailsIndexController", ManageProductDetailsIndexController);
}