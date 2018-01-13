import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),
  beforeModel(/* transition */) {
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('bot-creation'); // Implicitly aborts the on-going transition.
    }
  },
});
