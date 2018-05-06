import Component from '@ember/component';

export default Component.extend({
    producers: [],
    products: [],
    scales:[],
    selectedProducer: null,
    selectedProduct: null,
    selectScale: "",
    unityPrice: "0",    
    productCost: Ember.computed('unityPrice', 'amount', function() {
        //debugger
        return String(this.get('unityPrice') * this.get('amount'));
    }),

    historic: [
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
    ], 

    didInsertElement() {
        let model = this.get('model');
        model.getProducers(model.cooperative.id)
        .then(producers => {
            this.set('producers', producers);
        }).catch(err => console.log(err));

        model.getProducts(model.cooperative.id).then(products => {
            this.set('products', products);
        }).catch(err => console.log(err))

    },



    actions: {

        saveTransaction() {
            if (this.get('selectedProducer') != undefined && 
                this.get('selectedProduct') != undefined
                && this.get('selectScale') != undefined
                && this.get('unityPrice') != undefined
                && this.get('productCost') != undefined && 
                this.get('selectedProducer') != null
                && this.get('selectedProduct') != null
                && this.get('selectScale') != ""
                && this.get('unityPrice') != ""
                && this.get('productCost') != "") {
                
    

                let newPurchaseTransaction = this.get('model.newPurchaseTransaction');
                newPurchaseTransaction.set('identification', model.identification);
                newPurchaseTransaction.set('unityPrice', model.unityPrice);
                newPurchaseTransaction.set('amountScale', model.selectScale);
                newPurchaseTransaction.set('productCost', this.get('productCost'));
                if (this.get('discount') != undefined && this.get('discount') != ""){
                    newPurchaseTransaction.set('discount',this.get('discount'));
                }
                if (this.get('impost') != undefined && this.get('impost') != ""){
                    newPurchaseTransaction.set('tax',this.get('impost'));
                }
                newPurchaseTransaction.set('product',this.get('selectedProduct'));
                newPurchaseTransaction.set('producer',this.get('selectedProducer'));
                newPurchaseTransaction.set('name', model.name);
                newPurchaseTransaction.set('cooperative',this.get('model').cooperative);
                newPurchaseTransaction.save().then( saved => {
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
