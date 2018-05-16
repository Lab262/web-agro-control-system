import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    producers: [],
    products: [],
    scales: [],
    selectedProducer: null,
    selectedProduct: null,
    selectScale: "",
    impost: "0",
    discount: "0",
    unityPrice: "0",
    productCost: Ember.computed('amount', 'unityPrice', function () {
        if (this.get('unityPrice').replace(',', '.') > 0 && this.get('amount').replace(',', '.') > 0) {
            return ("R$ " + (this.get('unityPrice').replace(',', '.') * this.get('amount').replace(',', '.')).toFixed(2)).replace('.', ',');
        } else {
            return "R$  0,00"
        }
    }),

    historic: [
        { cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        { cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        { cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        { cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
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

                let newSaleTransaction = this.get('model.newSaleTransaction');
                var transactionDate = this.get('transactionDate');
                let day = transactionDate.substr(0, 2);
                let month = transactionDate.substr(2, 2);
                let year = transactionDate.substr(4, 4);
                transactionDate = new Date(year, month, day, 0, 0, 0, 0);
                newSaleTransaction.set('transactionDate', transactionDate);
                newSaleTransaction.set('amountScale', this.get('selectScale'));
                newSaleTransaction.set('unityPrice', Number(this.get('unityPrice').replace(',', '.')));
                if (this.get('discount') != undefined && this.get('discount') != "") {
                    newSaleTransaction.set('discount', Number(this.get('discount').replace(',', '.')));
                }
                if (this.get('impost') != undefined && this.get('impost') != "") {
                    newSaleTransaction.set('tax', Number(this.get('impost').replace(',', '.')));
                }
                newSaleTransaction.set('productAmount', Number(this.get('amount')));
                newSaleTransaction.set('producer', this.get('selectedProducer'));
                newSaleTransaction.set('product', this.get('selectedProduct'));
                newSaleTransaction.set('cooperative', this.get('model').cooperative);
                newSaleTransaction.set('transactionCost', Number((this.get('unityPrice').replace(',', '.') * this.get('amount').replace(',', '.')).toFixed(2)));

                newSaleTransaction.save().then(saved => {
                    window.location.reload()
                }).catch(err => {
                    console.log(err);
                })

            } else {
                alert('Entre todos os campos');
            }
        },
    }
});
