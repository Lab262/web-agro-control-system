import Component from '@ember/component';

export default Component.extend({
    model: {name: "", identification:"", selectedScale: "", unityPrice: ""},
    scales:["cx: 19 a 22kg", "cx grande: 30 a 50kg"],
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },
    didInsertElement() {
        this.set('model',{name: "", identification:"", selectedScale: "", unityPrice: "0"});
    }
});
