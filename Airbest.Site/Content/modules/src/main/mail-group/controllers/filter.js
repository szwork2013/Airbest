var app;
(function (app) {
    var main;
    (function (main) {
        app.$module.filter("mailGroupDate", function ($filter) {
            return function (input, type) {
                var date = angular.isDate(input) ? input : new Date(input);
                var now = new Date();
                var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var before1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                var before2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
                if (date > today)
                    return $filter("date")(date, "今天 HH:mm");
                else if (date > before1)
                    return $filter("date")(date, "昨天 HH:mm");
                else if (date > before2)
                    return $filter("date")(date, "前天 HH:mm");
                return $filter("date")(date, "yyyy-MM-dd HH:mm");
            };
        });
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=filter.js.map