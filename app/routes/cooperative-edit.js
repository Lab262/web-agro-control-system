import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
    session: Ember.inject.service('session'),
    model() {
        let store = this.store;
        return new Ember.RSVP.hash({
            currentUser: this.get('session.data.authenticated.currentUser'),
            cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0]),
            newScale: store.createRecord('scale'),
            getScales: function (cooperativeId) {
                return store.query('scale', {
                    "where": {
                        "cooperative": {
                            "__type": "Pointer",
                            "className": "Cooperative",
                            "objectId": cooperativeId,
                        }
                    }
                });
            },
        });
    },

    beforeModel(/* transition */) {
        if (!this.get('session.isAuthenticated')) {
            this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
        }
    },
});