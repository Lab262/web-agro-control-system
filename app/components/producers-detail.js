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

        closePromptDialog(model, isToSave) {
            if (model != undefined &&
                model.identification != undefined
                && model.cnpj != undefined
                && model.cpf != undefined
                && model.name != undefined
                && model.identification != ""
                && model.cnpj != ""
                && model.cpf != ""
                && model.name != "") {
                if (!CPFValidator.isValid(model.cpf)) alert('CPF Inválido');
                else if (!CNPJValidator.isValid(model.cnpj)) alert('CNPJ Inválido');
                else {
                    model.save()
                    this.set('showPromptDialog', false);
                }

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
    }

});
