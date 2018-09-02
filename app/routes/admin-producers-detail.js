import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let store = this.store;
    return new Ember.RSVP.hash({
      producers: store.query('producer', {})  
    });
  },

  beforeModel(/* transition */) {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
    }
  },
});