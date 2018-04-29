import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({

    producers: [
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        { identification: "UI00000000", name: "Nome", cpf: "000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" }
    ],

    showPromptDialog: false,
    actions: {
        /* Prompt dialog */
        openPromptDialog(/* param, event */) {
            this.set('dialogOrigin', null);
            this.set('showPromptDialog', true);
        },

        closePromptDialog(object, isToSave) {
            if (object != undefined &&
                object.identification != undefined
                && object.cnpj != undefined
                && object.cpf != undefined
                && object.name != undefined
                && object.identification != ""
                && object.cnpj != ""
                && object.cpf != ""
                && object.name != "") {
                if (!CPFValidator.isValid(object.cpf)) alert('CPF Inválido');
                else if (!CNPJValidator.isValid(object.cnpj)) alert('CNPJ Inválido');
                else {
                    let newProducer = this.get('model.newProducer');
                    newProducer.set('cpf', object.cpf);
                    newProducer.set('cnpj', object.cnpj);
                    newProducer.set('name', object.name);
                    newProducer.set('identification',object.identification);
                    newProducer.save().then( saved => {
                        this.set('showPromptDialog', false);
                    }).catch( err => {
                        console.error(err);
                    })
                }

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
    }

});
