import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  model(){
    return this.store.modelFor('parse-user');
  },
  beforeModel(/* transition */) {
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard-overview'); // Implicitly aborts the on-going transition.
    }
  },
});
