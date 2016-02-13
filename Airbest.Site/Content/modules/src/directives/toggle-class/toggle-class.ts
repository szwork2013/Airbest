

module app.directives {
    $module.directive("toggleClass", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var className = attrs["toggleClass"];
                el.on("click", (e) => {
                    el.toggleClass(className);
                });
            }
        };
    });
}