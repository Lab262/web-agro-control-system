import Component from '@ember/component';

export default Component.extend({
    actions: {
        approveCooperative(cooperative) {
            cooperative.set('isActive', true);
            cooperative.set('logo', "https://web-agro-control-system.herokuapp.com/images/web-agro-logo-3fa41e2686945f9bcf9baf08f031a22d.png");
            cooperative.set('socialCapital', "");
            cooperative.set('legalNature', "");
            cooperative.set('size', "");
            cooperative.set('activities', "");
            cooperative.set('socialReason', "");
            cooperative.set('phoneNumber', "");
            cooperative.set('cep', "");
            cooperative.set('address', "");
            cooperative.set('neighborhood', "");
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
