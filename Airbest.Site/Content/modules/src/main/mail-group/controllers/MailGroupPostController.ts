

module app.main {

    export class MailGroupPostController {
        public model;
        public target;

        constructor(
            public $rootScope: ng.IRootScopeService,
            public $mailGroup: app.services.MainGroupService,
            public $ui: app.services.UIService,
            public $identity: app.services.IdentityService,
            public $route: ng.route.IRouteService,
            public $location: ng.ILocationService
        ) {
            this.model = {
                targetId: $location.search().reply,
                townId: $location.search().id,
                memberId: this.$identity.signedMember.id
            };

            if (this.model.targetId) {
                this.$mailGroup.getMessage(this.model.targetId).then(r => {
                    this.target = r;
                });
            }

            $rootScope["pageTitle"] = (
                this.model.targetId ? "回复" : "发言"
            );
        }

        public submit() {
            this.$ui.acc(() => {
                return this.$mailGroup.postMessage(this.model).then(r => {
                    this.$location.url("mail-group/town?id=" + r.townId).replace();
                });
            });
        }
    }

    $module.controller("MailGroupPostController", MailGroupPostController);
}