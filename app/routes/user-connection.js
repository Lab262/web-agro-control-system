import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),

  beforeModel(/* transition */) {
    if (this.get('session.isAuthenticated')) {
      if (this.get('session.data.authenticated.currentUser.data.cooperatives')[0] === "master") {
        this.get('router').transitionTo('master-dashboard-overview');
      } else if (this.get('session.data.authenticated.currentUser.data.cooperatives')[0].userRole === "admin") {
        this.get('router').transitionTo('dashboard-overview');
      } else {
        this.get('router').transitionTo('producer-dashboard-overview');
      }
    }
  },
});
