import Component from '@ember/component';

export default Component.extend({
    model: {name: "", selectedScale: ""},
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },
    didInsertElement() {
        this.set('model',{name: "",selectedScale: ""});
    }
});
