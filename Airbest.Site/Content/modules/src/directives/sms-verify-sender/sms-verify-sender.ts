
module app.directives {

    export class SmsVerifySenderController {
        public cd = 0;
        public send(phone) {
        }
    }

    $module.directive("smsVerifySender", function (
        $interval: ng.IIntervalService,
        $verify: app.services.VerifyService
    ) {
        return {
            restrict: 'A',
            scope: {
                phone: "="
            },
            link: function (scope, el, attrs) {
                var state: any = {};
                scope["state"] = state;

                if (attrs["smsVerifySender"])
                    scope.$parent[attrs["smsVerifySender"]] = state;

                var timer = $interval(() => {
                    if (state.cd)
                        --state.cd;
                }, 1000);

                scope.$on("$destroy", (e) => {
                    $interval.cancel(timer);
                });

                el.on("click", (e) => {
                    if (scope["phone"] && !state.cd) {
                        $verify.sendSms(scope["phone"]);
                        state.cd = 60;
                    }
                });
            }
        };
    });
}