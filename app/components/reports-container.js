import Component from '@ember/component';

export default Component.extend({
    grossSales: { title: "Faturamento Bruto", amount: "1.000.000,00", unity: "R$" },
    purchases: { title: "Compras", amount: "500.000,00", unity: "R$" },
    contributionMargin: {
        unitary: { title: "Unitário", amount: "500.000,00", unity: "R$" },
        total: { title: "Total", amount: "500.000,00", unity: "R$" }
    },
    stockDrive: {
        output: {
            title: "Saída(vendas)",
            amount: "42.890",
            unity: "R$"
        },
        input: { title: "Entrada(compras)", amount: "51.987", unity: "R$" },
        initialStock: { title: "Estoque Inicial", amount: "53.076", unity: "Kg" },
        finalStock: { title: "Estoque Final", amount: "51.987", unity: "Kg" }
    },

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
            }
            this.set('stockDrive.input.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
        model.getSaleTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            this.set('productsIds', []);
            this.set('sales', []);
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
                this.calculateTotalSalesByProduct(historic.content[i])
            }
            var sales = this.get('sales');
            sales.sort((a, b) => b.transactionCost - a.transactionCost);
            this.set('sales', sales);
            this.calculatePercentageSalesByProduct();
            this.set('stockDrive.output.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
    },


    calculateTotalSalesByProduct(historic) {
        var productsIds = this.get('productsIds');
        var sales = this.get('sales');
        var objectId = historic.__data.product.data.id
        var indexProduct = productsIds.indexOf(objectId)
        if (indexProduct < 0) {
            productsIds.push(objectId)
            this.set('productsIds', productsIds);
            sales.push({
                name: historic.__data.product.data.attributes.name,
                totalQuantity: historic.__data.productAmount * historic.__data.product.data.attributes.scale.data.attributes.scaleProportion,
                transactionCost: historic.__data.transactionCost,
            })
        } else {
            var quantityAmount = historic.__data.productAmount * historic.__data.product.data.attributes.scale.data.attributes.scaleProportion
            sales[indexProduct].totalQuantity += quantityAmount
            sales[indexProduct].transactionCost += historic.__data.transactionCost
        }
        this.set('sales', sales);
    },


});
