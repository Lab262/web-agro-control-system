import Component from '@ember/component';

export default Component.extend({

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.producer.id).then(historic => {
            this.set('allHistoric',historic.content);
            this.calculateExtractProduct(historic.content);
        }).catch(err => console.log(err))
    },

    setupOverallChart(products) {
        var chartData = {
            labels: products.map(item => item.name),
            currentMonthLabel: "",
            currentMonthData: products.map(item => item.totalQuantity)
        }
        this.set('overallChartData', chartData)
    },

    filterByMonthAndYear(year,month){
        var startDate = new Date(year, 0, 1, 0, 0, 0, 0);
        var typeFilter = 'year'
        if (month != undefined) {
            startDate = new Date(year, month-1, 1, 0, 0, 0, 0);
            typeFilter = 'month'
        }
        var filtered = this.filterByDate(startDate,typeFilter);
        this.calculateExtractProduct(filtered);
    },

    filterByDate(startDate, typeFilter) {
        var historics = [];
        var allHistoric = this.get('allHistoric');
        for (var i = 0, len = allHistoric.length; i < len; i++) {
            var dateHistoric = moment(allHistoric[i].__data.transactionDate);
            if (dateHistoric.isSame(startDate, typeFilter)) {
                historics.push(allHistoric[i])
            }
        }
        return historics
    },

    calculateExtractProduct(historic) {
        var historics = [];
        var productsIds = [];
        var products = [];
        for (var i = 0, len = historic.length; i < len; i++) {
            var date = moment(historic[i].__data.transactionDate).format('DD/MM/YY');
            var cost = "R$ " + historic[i].__data.transactionCost.toFixed(2).toString().replace('.', ',');
            historics.push({
                cost: cost,
                productName: historic[i].__data.product.data.attributes.name,
                quantity: historic[i].__data.productAmount + " " + historic[i].__data.amountScale,
                date: date
            })
            var objectId = historic[i].__data.product.data.id
            var indexProduct = productsIds.indexOf(objectId)
            if (indexProduct < 0) {
                productsIds.push(objectId)
                products.push({
                    name: historic[i].__data.product.data.attributes.name,
                    totalQuantity: historic[i].__data.productAmount * historic[i].__data.product.data.attributes.amountScale,
                    averagePrice: historic[i].__data.unityPrice,
                    totalValue: historic[i].__data.transactionCost,
                    transactionCost: historic[i].__data.transactionCost,
                })
            } else {
                var quantityAmount = historic[i].__data.productAmount * historic[i].__data.product.data.attributes.amountScale
                products[indexProduct].totalQuantity += quantityAmount
                var newTransactionCost = (products[indexProduct].transactionCost + historic[i].__data.transactionCost)
                products[indexProduct].averagePrice = newTransactionCost / products[indexProduct].totalQuantity
                products[indexProduct].transactionCost = newTransactionCost,
                    products[indexProduct].totalValue = products[indexProduct].totalQuantity * products[indexProduct].averagePrice
            }
        }
        this.setupOverallChart(products);
        this.formatArrayToPresent(products);
    },

    formatArrayToPresent(products) {
        products.forEach(function (element) {
            element.averagePrice = "R$ " + element.averagePrice.toFixed(2).toString().replace('.', ',');
            element.totalValue = "R$ " + element.totalValue.toFixed(2).toString().replace('.', ',');
            element.totalQuantity = element.totalQuantity.toFixed(2).toString().replace('.', ',') + " Kg";

        }, this);
        this.set('products', products);
    },
});
