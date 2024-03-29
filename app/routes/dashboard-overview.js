import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated-route';

export default AuthenticatedRoute.extend({
  session: Ember.inject.service('session'),

  model() {
    let store = this.store;
    ;
    return new Ember.RSVP.hash({
      currentUser: this.get('session.data.authenticated.currentUser'),
      cooperative: store.findRecord('cooperative', this.get('session.data.authenticated.currentUser.data.cooperativesRoles').map(item => item.cooperativeId)[0])
    });
  },

  beforeModel(/* transition */) {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('user-connection'); // Implicitly aborts the on-going transition.
    }
  },
});
