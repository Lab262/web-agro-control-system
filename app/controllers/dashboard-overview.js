import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
    session: Ember.inject.service('session'),
    actions: {
        logout() {
            this.get('session').invalidate().then(() => {
                if (!this.get('session.isAuthenticated')) {
                    this.transitionToRoute('user-connection');
                }
            });
        }
    }
});
