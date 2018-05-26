import Component from '@ember/component';

export default Component.extend({
    graphsData: [{
        data: [[1, 5, 4, 6, 8, 3, 5, 4]],
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
    }, {
        data: [[1, 5, 4, 6, 8, 3, 5, 4]],
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
    }, {
        data: [[1, 5, 4, 6, 8, 3, 5, 4]],
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
    }, {
        data: [[1, 5, 4, 6, 8, 3, 5, 4]],
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
    }],

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
