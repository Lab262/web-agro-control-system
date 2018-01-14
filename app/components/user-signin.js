import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
    session: Ember.inject.service('session'),
    actions: {
        login() {
            let data = {
                username: this.get('username'),
                password: this.get('password')
            };
            this.get('session').authenticate('authenticator:torii', data).catch(error => {
                alert(error)
            }).then(() => {
                if (this.get('session.isAuthenticated')) {
                    this.get('router').transitionTo('dashboard-overview');
                }
            });
        }
    }
});
