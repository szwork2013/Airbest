
'use strict';

/***
     * 指令: 返回
     */
angular.module("app")
    .directive("homeSearchScroller", function ($window, $location, $interval) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var el = element[0];
                var form = el.querySelector(".form-search") as HTMLElement;
                var h = form.offsetTop;
                var wrappedForm = angular.element(form); 

                var timer = $interval(function () {
                    var st = el.scrollTop;
                    var opacity = Math.min(1, (st / h));
                    form.style.backgroundColor = "rgba(255, 60, 0, " + opacity + ")";
                    wrappedForm.toggleClass("fixed", (st >= h));
                }, 300);

                scope.$on("$destroy", function () {
                    timer && $interval.cancel(timer);
                });
            }
        }
    });

/***
     * 指令: 返回
     */
angular.module("app")
    .directive("goBack", function ($window, $location, sessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    sessionService.goBack();
                    return false;
                });
            }
        }
    });

angular.module("app")
    .directive("goTop", function ($window, $location, sessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on("click", e => {
                    e.preventDefault();
                    if (attrs["scroller"]) {
                        let scroller = angular.element(attrs["scroller"]);
                        if (scroller.length) {
                            let iscroll = scroller.data("iscroll");
                            if (iscroll)
                                iscroll.scrollTo(0, 0);
                            else {
                                scroller.scrollTop(0);
                            }
                        }
                    }
                });
            }
        }
    });

angular.module("app")
    .directive("collapse", function ($timeout) {
        return {
            restrict: 'A',
            scope:{
                collapse: "=",
                expandCallback: "&",
                expandCallbackDelay: "@",
                collapseCallback: "&",
                collapseCallbackDelay: "@",
            },
            link: function (scope: any, element, attrs) {

                $timeout(function () {
                    var mh = element.height();
                    element.data("mh", mh);
                    element.css("max-height", mh + "px");

                    scope.$watch("collapse", function (val) {
                        if (!val) {
                            var mh = element.data("mh") || 0;
                            element.css("max-height", mh + "px");

                            if (scope.expandCallback) {
                                var delay = parseInt(scope.expandCallbackDelay) || 0;
                                $timeout(function () {
                                    scope.expandCallback();
                                }, delay);
                            }
                        } else {
                            element.css("max-height", "0");

                            if (scope.collapseCallback) {
                                var delay = parseInt(scope.collapseCallbackDelay) || 0;
                                $timeout(function () {
                                    scope.collapseCallback();
                                }, delay);
                            }
                        }
                    });
                }, 0);
            }
        }
    });

/***
 * 指令: 返回
 */
angular.module("app")
    .directive("goExtern", function ($window, $location, $ui) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    $ui.lock();
                });
            }
        }
    });

/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("goReload", function ($route, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    $route.reload();
                });
            }
        }
    });

/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("lock", function ($ui, $route) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    $route.reload();
                });
            }
        }
    });


angular.module("app")
    .directive("formValidate", function ($window, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs: any) {
                switch (attrs.formValidate) {
                    case "group": {
                        var form = angular.element(element);
                        form.attr("novalidate", "novalidate");
                        form.prop("novalidate", true);

                        angular.forEach(form.find(".form-group"), function (group) {
                            group = angular.element(group);
                            var error = group.find(".error-block");

                            angular.forEach(group.find("input,textarea,select"), function (input) {
                                input = angular.element(input);

                                input.bind("invalid", function (e) {
                                    var message = input.prop("validationMessage");
                                    if (input.prop("validity").patternMismatch)
                                        message = input.data("pattern-text") || input.prop("title") || message;

                                    group.toggleClass("has-error", true);
                                    error.text(message);
                                });

                                input.bind("focus", function (e) {
                                    group.toggleClass("has-error", false);
                                    error.text("");
                                });
                            });
                        });
                        break;
                    }
                }
            }
        }
    });

/***
 * 指令: 刷新
 */
angular.module("app")
    .directive("viewUnslider", function ($route, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-unslider.html?v=' + buildNumber,
            replace: true,
            scope: {
                source: "@",
                images: "=",
                items: "=",
                width: "@",
                height: "@",
                autoplay: "="
            },
            controller: function ($q, $scope, $http) {
                this.getItems = function () {
                    return $q(function (resolve, reject) {
                        if ($scope.items) {
                            resolve({ data: $scope.items });
                        } else if ($scope.images) {
                            var items = [];
                            _.forEach($scope.images, function (m) {
                                items.push({ imageUrl: m, linkUrl: "", });
                            });
                            resolve({ data: items });
                        } else if ($scope.source) {
                            $http.get("/api/poster/home-banner").then(function(r) {
                                resolve(r.data);
                            });
                        } else {
                            resolve({ data: [] });
                        }
                    });
                };
            },
            link: function (scope:any, element, attrs, ctrl) {
                var w = parseInt(scope.width || 0) || 0;
                var h = parseInt(scope.height || 0) || 0;

                scope.ctrl = ctrl;
                ctrl.getItems().then(function (r) {
                    ctrl.items = r.data;
                    if (ctrl.items && ctrl.items.length == 1)
                        ctrl.items.push(angular.extend({}, ctrl.items[0]));

                    setTimeout(function () {
                        ($(element).find(".unslider-win") as any).slidesjs({
                            width: w,
                            height: h,
                            play: {
                                interval: 3000,
                                auto: !!scope.autoplay,
                            }
                        });
                    }, 0);
                });
            },
        }
    });

angular.module("app")
    .directive("repairmanPicker", function ($window, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/repairman-picker.html?v=' + buildNumber,
            replace: true,
            scope: {
                ngModel: "="
            },
            link: function (scope: any, element, attrs: any) {
                // link
                scope.placeHolder = attrs.placeholder;
                scope.name = attrs.name;
            },
            controller: function ($scope, $http, repairOrderService, $ui) {
                /**
                 * statusText
                 */
                $scope.persons = null;

                $scope.open = function () {
                    if ($scope.persons) {
                        $scope.isOpen = true;
                    }else{
                        var params = {
                            role: "repairorder.repairman"
                        };
                        $ui.lock();
                        $http.get("/api/member", { params: params }).then(function (r) {
                            r = r.data;
                            $ui.unlock();
                            $scope.persons = r.data;
                            $scope.isOpen = true;
                        });
                    }
                }

                $scope.pickedPerson = function () {
                    var result = null;
                    angular.forEach($scope.persons || [], function (person) {
                        if ($scope.ngModel == person.id) {
                            result = person;
                            return false;
                        }
                    });
                    return result;
                };

                $scope.close = function () {
                    $scope.isOpen = false;
                }

                $scope.pick = function (person) {
                    $scope.close();
                    $scope.ngModel = person.id;
                }
            }
        };
    });

angular.module("app")
    .directive("dropdownMenuMe", function ($window, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/dropdown-menu-me.html?v=' + buildNumber,
            replace: true,
            scope: {
            },
            link: function (scope, element, attrs) {
                // link
            },
            controller: function ($scope, $http, $ui) {
                /**
                 * statusText
                 */
                $scope.signOut = function () {
                    if (confirm("确认要退出吗?")) {
                        $ui.lock();
                        $http.post("/api/passport/signout").then(function (r) {
                            r = r.data;
                            $ui.unlock();
                            if (r.success) {
                                $location.url("passport/login").replace();
                            }
                        });
                    }
                };
            }
        };
    });

angular.module("app")
    .directive("viewRepairorderList", function ($window, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-repairorder-list.html?v=' + buildNumber,
            replace: true,
            scope: {
                orders: '=orders',
                orderby: '=orderby'
            },
            link: function (scope, element, attrs) {
                // link
            },
            controller: function ($scope, repairOrderService) {
                /**
                 * statusText
                 */
                $scope.statusText = function (order) {
                    return repairOrderService.statusText[order.status];
                }
            }
        };
    });

angular.module("app")
    .directive("viewFooterNavi", function ($window, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-footer-navi.html?v=' + buildNumber,
            replace: true,
            scope: {
                active: '=active'
            },
            link: function (scope: any, el, attrs: any) {
                // link
                var active = scope.active || attrs.active;
                if (active) {
                    el = angular.element(el)
                    el.find("[data-var='" + active + "']").toggleClass("active", true);
                }
            },
            controller: function ($scope, sessionService) {

                $scope.signedMember = sessionService.signedMember;

                $scope.inRole = function (roleName) {
                    return $scope.signedMember
                        && $scope.signedMember.roles
                        && $scope.signedMember.roles.indexOf(roleName) != -1;
                }

                $scope.showManage = (
                    $scope.inRole('system.administrator') || $scope.inRole('repairorder.dispatcher')
                    );
            }
        };
    });

angular.module("app")
    .directive("viewTitle", function ($window, $location) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-title.html?v=' + buildNumber,
            replace: true,
            scope: {
            },
            link: function (scope, el, attrs) {

            },
            controller: function ($scope) {
            }
        };
    });

angular.module("app")
    .directive("viewQrcode", function ($window, $location, $interval) {
        return {
            restrict: 'E',
            templateUrl: '/content/modules/src/main/_partials/view-qrcode.html?v=' + buildNumber,
            replace: true,
            scope: {
                value: '=',
            },
            link: function (scope: any, el, attrs) {
                var inner = angular.element(el).find(".inner");
                var val = scope.value;
                var qrcode = new QRCode(inner.get(0), { text: val });
                var timer = $interval(function () {
                    if (val != scope.value) {
                        val = scope.value;
                        qrcode.makeCode(val);
                    }
                }, 500);

                scope.$on("$destroy", function () {
                    timer && $interval.cancel(timer);
                    qrcode && qrcode.clear();
                });
            }
        };
    });