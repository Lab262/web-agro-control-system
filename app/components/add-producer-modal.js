import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    displayMode: false,
    titleModal: "Adicionar novo produtor",
    nameClassModal: "box-full large",
    model: { name: "", email: "", identification: "", cpnj: "", cpf: "" },
    closeModal(e) {
        var currEl = e.path[0].id;
        if (currEl === 'add-product-modal-overlay') {
            this.onClose();
        }
    },
    didInsertElement() {
        var displayMode = this.get('displayMode')
        if (!displayMode) {
            this.set('model', { name: "", email: "", identification: "", cpnj: "", cpf: "" });
        }else {
            this.set('titleModal', "Dados do produtor");
            this.set('nameClassModal', "box-full huge");
            var producer = this.get('producer')._internalModel.__data
            this.set('model', { name: producer.name, 
                                email: producer.email, 
                                identification: producer.identification, 
                                cnpj: producer.cnpj, 
                                cpf: producer.cpf, 
                                size: producer.size,
                                activities: producer.activities,
                                cep: producer.cep,
                                state: producer.state,
                                city: producer.city,
                                address: producer.address,
                                neighborhood: producer.neighborhood
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
