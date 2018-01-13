import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    logout: function() {
      this.get('session').invalidate();
      this.get('router').transitionTo('user-connection');
    }
  }
});
