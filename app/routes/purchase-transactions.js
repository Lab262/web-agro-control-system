import Ember from 'ember';
import Route from '@ember/routing/route';
import { debug } from '@ember/debug';

export default Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperatives').map(item => item.cooperativeId)[0]),
      newPurchaseTransaction: store.createRecord('purchase-transaction'),
      getProducers: function (cooperativeId) {
        return store.query('producer', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            }
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
          }
        })
      },

     getPurchaseTransaction: function(cooperativeId) {
       return store.query('purchase-transaction', {
         "where": {
           "cooperative": {
             "__type": "Pointer",
             "className": "Cooperative",
             "objectId": cooperativeId,
           }
         },
         limit: 4,
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
