
module app.main {

    class AddressIndexController {

        public options: any[];
        public herePOI: any;
        public address: string;

        constructor(
            public $location: ng.ILocationService
        ) {
            this.address = $location.search().address;
        }
    }

    $module.controller("AddressIndexController", AddressIndexController);
}