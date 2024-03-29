import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0]),
      producer: store.findRecord('producer', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.producerId)[0]),
      getPurchaseTransaction: function (producerId) {
        return store.query('purchase-transaction', {
          "where": {
            "producer": {
              "__type": "Pointer",
              "className": "Producer",
              "objectId": producerId,
            }
          },
          include: ['product', 'product.scale'],

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
