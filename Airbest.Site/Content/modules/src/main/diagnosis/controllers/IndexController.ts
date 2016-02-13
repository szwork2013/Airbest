

module app {

    class DiagnosisIndexController {

        public userAgent;

        constructor() {
            this.userAgent = window.navigator.userAgent;
        }
    }

    $module.controller("DiagnosisIndexController", DiagnosisIndexController);
} 