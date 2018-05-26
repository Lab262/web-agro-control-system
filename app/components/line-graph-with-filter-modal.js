import Component from '@ember/component';

export default Component.extend({
    chartData: [],

    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },

    actions: {
        closeModal(e) {

            // var currEl = e.path[0].id;
            // if (currEl === 'add-product-modal-overlay') {
                this.onClose();
            // }
        },
    }
});
