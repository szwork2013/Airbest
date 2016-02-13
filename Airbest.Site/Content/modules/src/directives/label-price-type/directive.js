var app;
(function (app) {
    var directives;
    (function (directives) {
        directives.$module.directive("labelPriceType", function ($product) {
            return {
                restrict: 'E',
                templateUrl: "/Content/modules/src/directives/label-price-type/template.html?v=" + buildNumber,
                scope: {
                    priceType: "=",
                },
                link: function (scope, el, attrs) {
                    scope.tick = 0;
                    scope.labelStyle = attrs.labelStyle || "primary";
                    scope.text = function () {
                        var v = parseInt(scope.priceType);
                        return $product.priceTypeShortText(v);
                    };
                }
            };
        });
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=directive.js.map