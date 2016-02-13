

angular.module("app")
    .directive("smsVerifyTaker", function (
        $window: ng.IWindowService,
        $interval: ng.IIntervalService,
        $verify: app.services.VerifyService,
        $ui: app.services.IUIService
    ) {
        return {
            restrict: 'E',
            templateUrl: "/Content/modules/src/main/directives/SmsVerifyTaker.html?v=" + buildNumber,
            scope: {
                phone: "=",
                successText: "@",
            },
            link: function (scope: any, el, attrs) {
                scope.tick = 0;

                let timer = $interval(() => {
                    if (scope.tick > 0)
                        --scope.tick;
                }, 1000);

                scope.$on("$destroy", () => {
                    timer && $interval.cancel(timer);
                });

                /** 
                 * get sms verify code
                 */
                scope.get = function () {
                    if (!scope.tick && scope.phone) {
                        $ui.lock("正在获取");
                        $verify.sendSms(scope.phone).then(
                            r => {
                                $ui.unlock();
                                if (r.success) {
                                    scope.tick = 45;
                                    if (scope.successText)
                                        alert(scope.successText);
                                }
                            }, r => {
                                $ui.unlock();
                            });
                    }
                }

                scope.isAllowed = function () {
                    return !scope.tick && /\d{11}/.test(scope.phone);
                };
            }
        };
    });
