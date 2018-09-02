import Route from '@ember/routing/route';

export default Route.extend({

    beforeModel(/* transition */) {
        if (!this.get('session.isAuthenticated')) {
            this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
        }
    },

    afterModel(model) {
        debugger;
        if (model.currentUser
            && (
                (model.currentUser.cooperativesRoles
                    && model.currentUser.cooperativesRoles.length > 0
                    && model.currentUser.cooperativesRoles[0].userRole === "admin")
                ||
                (model.currentUser.get('cooperativesRoles')
                    && model.currentUser.get('cooperativesRoles').length > 0
                    && model.currentUser.get('cooperativesRoles')[0].userRole === "admin"))
        ) {
            if (model.cooperative &&
                (!model.cooperative.get('legalNature')
                    || !model.cooperative.get('size') || model.cooperative.get('size') === ""
                    || !model.cooperative.get('cnpj') || model.cooperative.get('cnpj') === ""
                    || !model.cooperative.get('name') || model.cooperative.get('name') === ""
                    || !model.cooperative.get('activities') || model.cooperative.get('activities') === ""
                    || !model.cooperative.get('cep') || model.cooperative.get('cep') === ""
                    || !model.cooperative.get('neighborhood') || model.cooperative.get('neighborhood') === ""
                    || !model.cooperative.get('socialReason') || model.cooperative.get('socialReason') === ""
                    || !model.cooperative.get('address') || model.cooperative.get('address') === ""
                    || !model.cooperative.get('phoneNumber') || model.cooperative.get('phoneNumber') === ""
                    || !model.cooperative.get('socialCapital') || model.cooperative.get('socialCapital') === ""
                    || !model.cooperative.get('email') || model.cooperative.get('email') === "")) {
                this.transitionTo('cooperative-edit');
                window.location.reload()
            }
        }
    }
});