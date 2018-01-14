import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
    session: Ember.inject.service('session'),

    actions: {
        login() {
            let credentials = {username: this.get('username'), password:this.get('password') }
            this.get('session').authenticate('authenticator:torii',credentials).catch((message) => {
                alert(message);
            }).then(() => {
                if (this.get('session.isAuthenticated')) {
                    this.get('router').transitionTo('dashboard-overview');
                }
            });
        }
    }
});
