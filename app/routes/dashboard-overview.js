import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),

  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: this.store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperatives').map(item => item.cooperativeId)[0])
    });
  },

  beforeModel(/* transition */) {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
    }
  },
});
