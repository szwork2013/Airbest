var app;
(function (app) {
    var main;
    (function (main) {
        var TownPrivateIndexController = (function () {
            function TownPrivateIndexController($ui, $town, $album, $member, $identity, $sce, $rootScope, $location) {
                var _this = this;
                this.$ui = $ui;
                this.$town = $town;
                this.$album = $album;
                this.$member = $member;
                this.$identity = $identity;
                this.$sce = $sce;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.member = null;
                var id = $location.search().id;
                this.load(id);
                this.loadPhotos(id);
                $identity.checkout().then(function (r) {
                    _this.member = $identity.signedMember;
                });
            }
            TownPrivateIndexController.prototype.load = function (id) {
                var _this = this;
                this.$ui.acc(function () {
                    var filter = {};
                    return _this.$town.get(id).then(function (r) {
                        _this.town = r;
                        _this.town.content = _this.$sce.trustAsHtml(_this.town.content || "");
                        _this.town.desc = _this.$sce.trustAsHtml(_this.town.desc || "");
                        _this.$rootScope["pageTitle"] = _this.town.name;
                    });
                });
            };
            TownPrivateIndexController.prototype.loadPhotos = function (id) {
                var _this = this;
                var filter = { albumId: id, take: 5 };
                this.$album.getPhotoList(filter).then(function (r) {
                    _this.photos = r.data;
                    _.forEach(_this.photos, function (it) {
                        it.linkUrl = "album/details?id=" + it.id;
                    });
                    if (_this.photos.length == 0) {
                        // 使用推广图片
                        _this.photos = [
                            { imageUrl: "/Content/themes/res/t/t.1.jpg", name: "无路您身处何处，家才是温馨的港湾！" },
                            { imageUrl: "/Content/themes/res/t/t.2.jpg", name: "《天下村》全国村庄网站创始人申请报名中，详情咨询0577-26669665" },
                            { imageUrl: "/Content/themes/res/t/t.3.jpg", name: "别忘了《天下村》不仅能让您找到家的感觉，还能让游子寄托思乡情怀。" },
                            { imageUrl: "/Content/themes/res/t/t.4.jpg", name: "《天下村》记载各村庄的历史文化、村庄农产品、新闻趣事和名人事迹等" }
                        ];
                    }
                });
            };
            /**
             * 申请成为站长.
             */
            TownPrivateIndexController.prototype.applyForMaster = function () {
                this.$member.applyForMaster(this.member.id).then(function (r) {
                    alert("申请成功! 我司客服人员将会和您联系核实");
                }).catch(function (r) {
                    alert("申请失败! 您已经申请过了或者该村已有站长");
                });
            };
            return TownPrivateIndexController;
        }());
        app.$module.controller("TownPrivateIndexController", TownPrivateIndexController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
//# sourceMappingURL=TownPrivateIndexController.js.map