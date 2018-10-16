import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated-route';
import Moment from 'npm:moment';

export default AuthenticatedRoute.extend({
  session: Ember.inject.service('session'),

  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0]),
      newPurchaseTransaction: store.createRecord('purchase-transaction'),
      getProducers: function (cooperativeId) {
        return store.query('producer', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            },
            isRetailer: false,
          }
        })
      },

      getProducts: function (cooperativeId) {
        return store.query('product', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            }
          },
          include: 'scale'
        })
      },

      getPurchaseTransaction: function (cooperativeId) {
        return store.query('purchase-transaction', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            }
          },
          include: ['product', 'producer']
        })
      }
    });
  },

  beforeModel(/* transition */) {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
    }
  },

});
