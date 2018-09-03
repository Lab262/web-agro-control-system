import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      getCooperativeByCNPJ: function (cnpj) {
        return store.query('cooperative', {
          "where": {
            'cnpj': cnpj
          }
        });
      },
      newCooperative: store.createRecord('cooperative')
    })
  },

  beforeModel(/* transition */) {
    if (this.get('session.isAuthenticated')) {
      if (this.get('session.data.authenticated.currentUser.data.cooperativesRoles')[0] === "master") {
        this.get('router').transitionTo('master-dashboard-overview');
      } else if (this.get('session.data.authenticated.currentUser.data.cooperativesRoles')[0].userRole === "admin") {
        this.get('router').transitionTo('dashboard-overview');
      } else {
        this.get('router').transitionTo('producer-dashboard-overview');
      }
    }
  },
});
