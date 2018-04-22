import Component from '@ember/component';

export default Component.extend({

    producers: [
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" },
        {identification: "UI00000000", name: "Nome", cpf:"000.000.000-00", cnpj: "000.000.000-00", lastTransaction: "00/00/00" }
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
                debugger;
                console.log("save model");
                this.set('showPromptDialog', false);
            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
    }

});
