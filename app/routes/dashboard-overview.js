import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      newProducer: store.createRecord('producer'),
      newProduct: store.createRecord('product'),
      newSalesTransaction: store.createRecord('sales-transaction'),
      newPurchaseTransaction: store.createRecord('purchase-transaction')
    });
  },

  beforeModel(/* transition */) {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
    }
  },

});
