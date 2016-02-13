

module app.directives {

    $module.directive("labelPriceType", function ($product: app.services.ProductService) {
        return {
            restrict: 'E',
            templateUrl: "/Content/modules/src/directives/label-price-type/template.html?v=" + buildNumber,
            scope: {
                priceType: "=",
            },
            link: function (scope: any, el, attrs) {
                scope.tick = 0;
                scope.labelStyle = attrs.labelStyle || "primary";
                scope.text = function () {
                    let v = parseInt(scope.priceType);
                    return $product.priceTypeShortText(v);
                }
            }
        }
    });
}