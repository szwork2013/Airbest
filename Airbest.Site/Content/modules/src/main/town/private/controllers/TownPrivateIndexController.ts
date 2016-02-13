

module app.main {
    class TownPrivateIndexController {
        public town: any;
        public photos: any[];
        public member = null;

        constructor(
            public $ui: app.services.UIService,
            public $town: app.services.TownService,
            public $album: app.services.AlbumService,
            public $member: app.services.MemberService,
            public $identity: app.services.IdentityService,
            public $sce: ng.ISCEService,
            public $rootScope: ng.IRootScopeService,
            public $location: ng.ILocationService
        ) {
            let id = $location.search().id;
            this.load(id);
            this.loadPhotos(id);

            $identity.checkout().then(r => {
                this.member = $identity.signedMember;
            });
        }

        public load(id) {
            this.$ui.acc(() => {
                let filter = {};
                return this.$town.get(id).then(r => {
                    this.town = r;
                    this.town.content = this.$sce.trustAsHtml(this.town.content || "");
                    this.town.desc = this.$sce.trustAsHtml(this.town.desc || "");
                    this.$rootScope["pageTitle"] = this.town.name;
                });
            });
        }

        public loadPhotos(id) {
            let filter = { albumId: id, take: 5 };
            this.$album.getPhotoList(filter).then(r => {
                this.photos = r.data;
                _.forEach(this.photos, (it) => {
                    it.linkUrl = "album/details?id=" + it.id;
                });

                if (this.photos.length == 0) {
                    // 使用推广图片

                    this.photos = [
                        { imageUrl: "/Content/themes/res/t/t.1.jpg", name: "无路您身处何处，家才是温馨的港湾！" },
                        { imageUrl: "/Content/themes/res/t/t.2.jpg", name: "《天下村》全国村庄网站创始人申请报名中，详情咨询0577-26669665" },
                        { imageUrl: "/Content/themes/res/t/t.3.jpg", name: "别忘了《天下村》不仅能让您找到家的感觉，还能让游子寄托思乡情怀。" },
                        { imageUrl: "/Content/themes/res/t/t.4.jpg", name: "《天下村》记载各村庄的历史文化、村庄农产品、新闻趣事和名人事迹等" }
                    ];
                }
            });
        }

        /**
         * 申请成为站长.
         */
        public applyForMaster() {
            this.$member.applyForMaster(this.member.id).then(r => {
                alert("申请成功! 我司客服人员将会和您联系核实");
            }).catch((r) => {
                alert("申请失败! 您已经申请过了或者该村已有站长");
            });
        }
    }

    $module.controller("TownPrivateIndexController", TownPrivateIndexController);
}