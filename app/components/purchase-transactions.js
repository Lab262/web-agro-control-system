import Component from '@ember/component';

export default Component.extend({
    producers: [],
    productsIds: ["UC00098","UC00099"],
    productsNames: ["Tomate Italiano", "Abaxaxi Mexicano", "Arroz Chines", "Madioca Brasileira"],
    scales:["cx: 19 a 22kg", "cx grande: 30 a 50kg"],
    selectedProducer: "",
    selectedProductId: "",
    selectedProductName: "",
    selectScale: "",
    unityPrice: "0",
    productCost: "0",
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
    },

    actions: {

        saveTransaction() {
            if (this.get('selectedProducer') != undefined && 
                this.get('selectedProductId') != undefined
                && this.get('selectedProductName') != undefined
                && this.get('selectScale') != undefined
                && this.get('unityPrice') != undefined
                && this.get('productCost') != undefined && 
                this.get('selectedProducer') != "" 
                && this.get('selectedProductId') != ""
                && this.get('selectedProductName') != ""
                && this.get('selectScale') != ""
                && this.get('unityPrice') != ""
                && this.get('productCost') != "") {

                let newPurchaseTransaction = this.get('model.newPurchaseTransaction');
                newPurchaseTransaction.set('identification', model.identification);
                newPurchaseTransaction.set('unityPrice', model.unityPrice);
                newPurchaseTransaction.set('amountScale', model.selectScale);
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
