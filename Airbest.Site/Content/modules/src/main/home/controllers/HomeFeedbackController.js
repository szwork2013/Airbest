var app;
(function (app) {
    var main;
    (function (main) {
        var HomeFeedbackController = (function () {
            function HomeFeedbackController($ui, $http) {
                this.$ui = $ui;
                this.$http = $http;
            }
            HomeFeedbackController.prototype.submit = function () {
            };
            return HomeFeedbackController;
        }());
        main.HomeFeedbackController = HomeFeedbackController;
        app.$module.controller("HomeFeedbackController", HomeFeedbackController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeFeedbackController.js.map