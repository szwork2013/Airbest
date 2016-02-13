
module app.main {
    $module.filter("mailGroupDate", function ($filter: ng.IFilterService) {

        return function (input, type) {
            let date = angular.isDate(input) ? input : new Date(input);
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let before1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            let before2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);

            if (date > today)
                return $filter("date")(date, "今天 HH:mm");

            else if (date > before1)
                return $filter("date")(date, "昨天 HH:mm");

            else if (date > before2)
                return $filter("date")(date, "前天 HH:mm");

            return $filter("date")(date, "yyyy-MM-dd HH:mm");
        };
    });
}