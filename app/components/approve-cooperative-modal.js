import Component from '@ember/component';

export default Component.extend({
    actions: {
        approveCooperative(cooperative) {
            cooperative.set('isActive', true);
            cooperative.save().then(saved => {
                window.location.reload()
            });
        },
        deleteCooperative(cooperative) {
            cooperative.destroyRecord().then(deleted => {
                window.location.reload()
            });
        }
    }
});
