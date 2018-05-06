import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    producers: [],
    products: [],
    scales:[],
    selectedProducer: null,
    selectedProduct: null,
    selectScale: "",
    unityPrice: "0",    
    productCost: Ember.computed('amount', 'unityPrice', function() {
        if(this.get('unityPrice') > 0 && this.get('amount') > 0) {
            return ("R$ " + (this.get('unityPrice') * this.get('amount')).toFixed(2)).replace('.',',');
        } else {
            return "R$  0,00"
        }
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
            debugger;
            if (this.get('selectedProducer') != undefined && 
                this.get('transactionDate') != undefined && 
                this.get('selectedProduct') != undefined
                && this.get('selectScale') != undefined
                && this.get('unityPrice') != undefined
                && this.get('amount') != undefined
                && this.get('productCost') != undefined && 
                this.get('selectedProducer') != null
                && this.get('selectedProduct') != null
                && this.get('selectScale') != ""
                && this.get('transactionDate') != ""
                && this.get('unityPrice') != ""
                && this.get('amount') != ""
                && this.get('productCost') != "") {
                    debugger;

                let newPurchaseTransaction = this.get('model.newPurchaseTransaction');
                var transactionDate = this.get('transactionDate');
                let day = transactionDate.substr(0,2);
                let month = transactionDate.substr(2,2);
                let year = transactionDate.substr(4,4);
                transactionDate = new Date(year, month, day, 0, 0, 0, 0);
                newPurchaseTransaction.set('transactionDate', transactionDate);
                newPurchaseTransaction.set('amountScale', this.get('selectScale'));
                newPurchaseTransaction.set('unityPrice', Number(this.get('unityPrice')));
                if (this.get('discount') != undefined && this.get('discount') != ""){
                    newPurchaseTransaction.set('discount',Number(this.get('discount')));
                }
                if (this.get('impost') != undefined && this.get('impost') != ""){
                    newPurchaseTransaction.set('tax', Number(this.get('impost')));
                }
                newPurchaseTransaction.set('productAmount', Number(this.get('amount')));
                newPurchaseTransaction.set('producer',this.get('selectedProducer'));
                newPurchaseTransaction.set('product',this.get('selectedProduct'));
                newPurchaseTransaction.set('cooperative',this.get('model').cooperative);
                newPurchaseTransaction.set('transactionCost', Number((this.get('unityPrice') * this.get('amount')).toFixed(2)));

                newPurchaseTransaction.save().then( saved => {
                    window.location.reload()
                }).catch( err => {
                    console.log(err);
                })

            } else {
                alert('Entre todos os campos');
            }
        },
    }

});
