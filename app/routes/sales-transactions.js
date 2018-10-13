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
      newSaleTransaction: store.createRecord('sales-transaction'),

      getRetailers: function (cooperativeId) {
        return store.query('producer', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            },
            isRetailer: true,
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
        return store.query('sales-transaction', {
          "where": {
            "cooperative": {
              "__type": "Pointer",
              "className": "Cooperative",
              "objectId": cooperativeId,
            },
            "transactionDate": {
              "$gte":
              {
                "__type": "Date",
                "iso": Moment().startOf('day')
              },
              "$lte":
              {
                "__type": "Date",
                "iso": Moment().endOf('day')
              }
            }
          },
          // limit: 4,
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
