import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated-route';
import ParseCloudRequest from '../utils/parse-cloud-request';

export default AuthenticatedRoute.extend({
    session: Ember.inject.service('session'),
    model() {
        let store = this.store;
        let cooperativeId = this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0]
        return new Ember.RSVP.hash({
            currentUser: this.get('session.data.authenticated.currentUser'),
            cooperative: store.findRecord('cooperative', cooperativeId),
            newProduct: store.createRecord('product'),
            getProducts: function (cooperativeId) {
                return store.query('product', {
                    "where": {
                        "cooperative": {
                            "__type": "Pointer",
                            "className": "Cooperative",
                            "objectId": cooperativeId,
                        }
                    }
                });
            },
            getSupplyStatistics: function (products) {
                return ParseCloudRequest('getCurrentSupplyStatistics', {
                    cooperativeId: cooperativeId,
                    products: products,
                })
            },
        });
    },

    beforeModel(/* transition */) {
        if (!this.get('session.isAuthenticated')) {
            this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
        }
    },

});
