var app;
(function (app) {
    var manage;
    (function (manage) {
        manage.$module.directive("productDetailsViewAside", function ($location, $http) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/Content/modules/src/manage/product/details/_partials/view-aside/view-aside.html?v=" + buildNumber,
                scope: {
                    title: "@",
                },
                link: function (scope, el, attrs) {
                    var id = $location.search().id;
                    scope["id"] = id;
                    var items = [
                        { active: false, name: "基本信息", path: "/product/details/base", href: "product/details/base?id=" + id },
                        { active: false, name: "型号规格", path: "/product/details/special", href: "product/details/special?id=" + id },
                        { active: false, name: "技术规格", path: "/product/details/property", href: "product/details/property?id=" + id },
                    ];
                    _.forEach(items, function (it) {
                        if (it.path == $location.path())
                            it.active = true;
                    });
                    scope["items"] = items;
                }
            };
        });
    })(manage = app.manage || (app.manage = {}));
})(app || (app = {}));
//# sourceMappingURL=view-aside.js.map