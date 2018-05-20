import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.producer.id).then(historic => {
            var historics = [];
            debugger;
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var date = moment(historic.content[i].__data.transactionDate).format('DD/MM/YY');
                var cost = "R$ " + historic.content[i].__data.transactionCost.toFixed(2).toString().replace('.', ',');
                historics.push({
                    cost: cost,
                    productName: historic.content[i].__data.product.data.attributes.name,
                    quantity: historic.content[i].__data.productAmount + " " + historic.content[i].__data.amountScale,
                    date: date
                })
            }
            this.set('historic', historics);
        }).catch(err => console.log(err))
    },
});
