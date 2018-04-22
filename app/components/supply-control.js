import Component from '@ember/component';

export default Component.extend({

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
                && model.unityPrice != undefined
                && model.selectScale != undefined
                && model.name != undefined
                && model.identification != ""
                && model.unityPrice != ""
                && model.selectScale != ""
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
