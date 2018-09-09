import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    displayMode: false,
    titleModal: "Adicionar nova cooperativa",
    nameClassModal: "box-full",
    model: { name: "", cpnj: "", email: "" },
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },
    didInsertElement() {
        var displayMode = this.get('displayMode')
        if (!displayMode) {
            this.set('model', { name: "", cpnj: "", email: "" });
        }else {
            this.set('titleModal', "Dados da Cooperativa");
            this.set('nameClassModal', "box-full huge");
            var cooperative = this.get('cooperative')._internalModel.__data
            this.set('model', { name: cooperative.name, 
                                email: cooperative.email, 
                                socialCapital: cooperative.socialCapital, 
                                cnpj: cooperative.cnpj, 
                                legalNature: cooperative.legalNature, 
                                size: cooperative.size,
                                activities: cooperative.activities,
                                cep: cooperative.cep,
                                socialReason: cooperative.socialReason,
                                phoneNumber: cooperative.phoneNumber,
                                address: cooperative.address,
                                neighborhood: cooperative.neighborhood,
                            });
        } 
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
