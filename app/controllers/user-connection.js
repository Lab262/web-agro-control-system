import Controller from '@ember/controller';

export default Controller.extend({
    loginRaised: true,

    actions: {
        showLogin() {
            this.set('loginRaised', true);
        },
        showRegister() {
            this.set('loginRaised', false);
        }
      }
});
