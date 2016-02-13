angular.module("app")
    .directive("smsVerifyTaker", function ($window, $interval, $verify, $ui) {
    return {
        restrict: 'E',
        templateUrl: "/Content/modules/src/main/directives/SmsVerifyTaker.html?v=" + buildNumber,
        scope: {
            phone: "=",
            successText: "@",
        },
        link: function (scope, el, attrs) {
            scope.tick = 0;
            var timer = $interval(function () {
                if (scope.tick > 0)
                    --scope.tick;
            }, 1000);
            scope.$on("$destroy", function () {
                timer && $interval.cancel(timer);
            });
            /**
             * get sms verify code
             */
            scope.get = function () {
                if (!scope.tick && scope.phone) {
                    $ui.lock("正在获取");
                    $verify.sendSms(scope.phone).then(function (r) {
                        $ui.unlock();
                        if (r.success) {
                            scope.tick = 45;
                            if (scope.successText)
                                alert(scope.successText);
                        }
                    }, function (r) {
                        $ui.unlock();
                    });
                }
            };
            scope.isAllowed = function () {
                return !scope.tick && /\d{11}/.test(scope.phone);
            };
        }
    };
});
//# sourceMappingURL=SmsVerifyTaker.js.map