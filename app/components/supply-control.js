import Component from '@ember/component';

export default Component.extend({

    showPromptDialog: false,
    products: [],

    didInsertElement() {
        let model = this.get('model');
        model.getProducts(model.cooperative.id)
        .then(products => {
            this.set('products', products);
        }).catch(err => console.log(err))
    },

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

                let newProduct = this.get('model.newProduct');
                newProduct.set('identification', model.identification);
                newProduct.set('unityPrice', model.unityPrice);
                newProduct.set('amountScale', model.selectScale);
                newProduct.set('name', model.name);
                newProduct.set('cooperative',this.get('model').cooperative);

                newProduct.save().then( saved => {
                    window.location.reload()
                }).catch( err => {
                    console.error(err);
                })

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
    }
});
