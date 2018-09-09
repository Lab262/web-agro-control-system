import Component from '@ember/component';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    showPromptDialog: false,
    cooperatives: [],

    didInsertElement() {
        this.loadData();
    },

    loadData() {
        var _this = this;
        this.get('model').getCooperatives().then(cooperativesArray => {
            this.set('cooperatives', cooperativesArray);
            let cooperativesToApprove = cooperativesArray.content.filter(item => !item.__data.isActive).map(item => item.getRecord());
            this.set('cooperativesToApproveAmount', cooperativesToApprove.length);
            this.set('cooperativesToApprove', cooperativesToApprove);
        }).catch(error => {
            console.log(error);
            _this.loadData();
        });
    },

    actions: {
        /* Prompt dialog */
        openPromptDialog(cooperative) {
            if (cooperative.data) {
                this.set('displayMode', true);
                this.set('cooperative', cooperative);
            }else {
                this.set('displayMode', false);
            }
            this.set('dialogOrigin', null);
            this.set('showPromptDialog', true);
        },

        closePromptDialog(object, isToSave) {
            if (object != undefined
                && object.cnpj != undefined
                && object.email != undefined
                && object.name != undefined
                && object.cnpj != ""
                && object.email != ""
                && object.name != "") {
                if (!CNPJValidator.isValid(object.cnpj)) alert('CNPJ Inválido');
                else {
                    let newCooperative = this.get('model.newCooperative');
                    newCooperative.set('email', object.email);
                    newCooperative.set('cnpj', CNPJValidator.format(object.cnpj));
                    newCooperative.set('name', object.name);
                    newCooperative.set('logo', "");
                    newCooperative.set('isActive', true);
                    newCooperative.set('productScales', []);

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
