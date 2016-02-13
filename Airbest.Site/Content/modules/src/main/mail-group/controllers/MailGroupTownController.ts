
module app.main {

    export class MailGroupTownController {
        public messages: any[] = [];
        public id;
        public member = null;
        public loading = false;
        public replyStatus;
        public noMore = false;

        constructor(
            public $town: app.services.TownService,
            public $rootScope: ng.IRootScopeService,
            public $mailGroup: app.services.MainGroupService,
            public $ui: app.services.UIService,
            public $identity: app.services.IdentityService,
            public $location: ng.ILocationService
        ) {
            this.id = $location.search().id;
            this.replyStatus = $location.search().replyStatus;
            this.load();

            this.$identity.checkout().then(r => {
                this.member = r;
            });

            if (this.id) {
                this.$town.get(this.id).then(r => {
                    this.$rootScope["pageTitle"] = r.name + "论坛";
                });
            }
        }

        public load() {
            if (this.noMore || this.loading)
                return;

            this.loading = true;
            this.$ui.acc(() => {
                let filter = {
                    townId: this.id,
                    take: 30,
                    skip: this.messages.length,
                    replyStatus: this.replyStatus
                };

                return this.$mailGroup.getMessageList(filter).then(r => {
                    Array.prototype.push.apply(this.messages, r.data);
                    if (!r.data.length)
                        this.noMore = true;
                });
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    $module.controller("MailGroupTownController", MailGroupTownController);
}