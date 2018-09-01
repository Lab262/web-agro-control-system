import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.producer.id).then(historic => {
            var historics = [];
            var productsIds = [];
            var products = [];
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var date = moment(historic.content[i].__data.transactionDate).format('DD/MM/YY');
                var cost = "R$ " + historic.content[i].__data.transactionCost.toFixed(2).toString().replace('.', ',');
                historics.push({
                    cost: cost,
                    productName: historic.content[i].__data.product.data.attributes.name,
                    quantity: historic.content[i].__data.productAmount + " " + historic.content[i].__data.amountScale,
                    date: date
                })
                var objectId = historic.content[i].__data.product.data.id
                var indexProduct = productsIds.indexOf(objectId)
                if (indexProduct < 0) {
                    productsIds.push(objectId)
                    products.push({
                        name: historic.content[i].__data.product.data.attributes.name,
                        totalQuantity: historic.content[i].__data.productAmount*historic.content[i].__data.product.data.attributes.amountScale,
                        averagePrice: historic.content[i].__data.unityPrice,
                        totalValue: historic.content[i].__data.transactionCost,
                        transactionCost: historic.content[i].__data.transactionCost,
                    })
                }else {
                    var quantityAmount = historic.content[i].__data.productAmount*historic.content[i].__data.product.data.attributes.amountScale
                    products[indexProduct].totalQuantity += quantityAmount
                    var newTransactionCost = (products[indexProduct].transactionCost+historic.content[i].__data.transactionCost)
                    products[indexProduct].averagePrice = newTransactionCost/products[indexProduct].totalQuantity
                    products[indexProduct].transactionCost = newTransactionCost,
                    products[indexProduct].totalValue = products[indexProduct].totalQuantity*products[indexProduct].averagePrice
                }
            }
            //formatArrayToPresent(products);
            this.set('products', products);
            this.set('historic', historics);
        }).catch(err => console.log(err))
    },
    formatArrayToPresent(products){
        products.array.forEach(function(element) {
            element.averagePrice = "R$ " + element.averagePrice.toFixed(2).toString().replace('.', ',');
            element.totalValue = "R$ " + element.totalValue.toFixed(2).toString().replace('.', ',');
        }, this);
        this.set('products', products);
    },
});
