import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    model: { name: "", identification: "", cpnj: "", cpf: "" },
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },
    didInsertElement() {
        this.set('model', { name: "", identification: "", cpnj: "", cpf: "" });

    },

    actions: {
        maskCpf(input) {
            if (input.length < 15) {
                // this.set('model.cpf', CPFValidator.format(input));
                this.set('model.cpf', input);
            }
        },

        maskCNPJ(input) {

            if (input.length < 19) {
                this.set('model.cnpj', input);
                // this.set('model.cnpj', CNPJValidator.format(input));
            }
        }
    }
});
