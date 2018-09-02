import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
    session: Ember.inject.service('session'),
    showingLogin: true,
    actions: {
        login() {
            debugger
            let data = {
                username: this.get('username'),
                password: this.get('password')
            };
            this.get('session').authenticate('authenticator:torii', data).catch(() => {
                alert("Usuário ou senha inválido!")
            }).then(() => {
                if (this.get('session.isAuthenticated')) {
                    if (this.get('session.data.authenticated.currentUser.data.cooperativesRoles')[0] === "master") {
                        this.get('router').transitionTo('master-dashboard-overview');
                    } else if (this.get('session.data.authenticated.currentUser.data.cooperativesRoles')[0].userRole === "admin") {
                        this.get('router').transitionTo('dashboard-overview');
                    } else {
                        this.get('router').transitionTo('producer-dashboard-overview');
                    }
                }
            });
        }
    }
});
