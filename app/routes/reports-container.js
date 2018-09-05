import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated-route';

export default AuthenticatedRoute.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0]),
      getPurchaseTransaction: function (cooperativeId) {
        return store.query('purchase-transaction', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            }
          },
          include: 'product'
        })
      },
      getSaleTransaction: function (cooperativeId) {
        return store.query('sales-transaction', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            }
          },
          include: 'product'
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
