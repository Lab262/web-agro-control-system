import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    showPromptDialog: false,
    cooperatives: [],

    didInsertElement() {
        let model = this.get('model').cooperatives;
        this.set('cooperatives', model);
    },

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
                    let newCooperative = this.get('model.newCooperative');
                    newCooperative.set('cpf', CPFValidator.format(object.cpf));
                    newCooperative.set('cnpj', CNPJValidator.format(object.cnpj));
                    newCooperative.set('name', object.name);
                    newCooperative.set('identification', object.identification);
                    newCooperative.set('cooperative', this.get('model').cooperative);

                    newCooperative.save().then(saved => {
                        window.location.reload()
                    }).catch(err => {
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
