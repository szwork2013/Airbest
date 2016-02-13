var app;
(function (app) {
    var main;
    (function (main) {
        var TownIndexController = (function () {
            function TownIndexController($ui, $town, $location) {
                this.$ui = $ui;
                this.$town = $town;
                this.$location = $location;
                this.load();
            }
            TownIndexController.prototype.load = function () {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = { includes: "master" };
                    return _this.$town.getList(filter).then(function (r) {
                        _this.towns = r.data;
                    });
                });
            };
            return TownIndexController;
        }());
        app.$module.controller("TownIndexController", TownIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownIndexController.js.map