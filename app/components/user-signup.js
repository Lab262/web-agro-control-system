import Component from '@ember/component';

export default Component.extend({

    viewShowing: "instructions",

    actions: {
        register() {
            this.showLogin()
        },
        show(itemToShow) {
            this.set('viewShowing', itemToShow);
        }
    }
});
