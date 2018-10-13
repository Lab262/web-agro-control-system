import Component from '@ember/component';

export default Component.extend({
    editMode: false,
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },

    didInsertElement(){
        if (this.get('model').get('tax') === undefined) {
            this.set('model.tax',0.0);
        }
    },

    actions: {
        closeModalAction() {
            this.onClose()
        },
        deleteItem(model) {
            var confirm = window.confirm('Ao deletar o produto ' + model.get('name') + ', todas as transções associadas ao mesmo serão afetadas');
            if (confirm) {
                model.destroyRecord().then(deleted => {
                    window.location.reload()
                });
            }

        }
    }
});
