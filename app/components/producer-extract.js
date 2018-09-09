import Component from '@ember/component';
import Moment from 'npm:moment'
export default Component.extend({

    monthsPortuguese: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"],
    years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2015, 2016, 2017, 2018],

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.producer.id).then(historic => {
            this.set('allHistoric', historic.content);
            this.calculateExtractProduct(historic.content);
        }).catch(err => console.log(err))
    },

    getExtractYearForProduct() {

        var startDate = Moment(new Date()).endOf('year').toDate()
        var endDate = Moment(new Date()).startOf('year').toDate()
        var dates = this.enumerateMonthsBetweenDates(endDate, startDate)

        var allHistoric = this.get('allHistoric');
        //Hardcoded filter by id of Goiaba
        allHistoric = allHistoric.filter(historic => (historic.__data.product.data.id == "W1UUpYOtEv"))
        var names = []
        var data = []
        dates.forEach(date => {
            var currDateMoment = Moment(date);
            var currentHistorics = allHistoric.filter(historic => Moment(historic.__data.transactionDate).isSame(currDateMoment, 'month'))
            var totalAmount = 0
            if (currentHistorics.length > 0) {
                currentHistorics.forEach(function (element) {
                    var quantityAmount = element.__data.productAmount * element.__data.product.data.attributes.amountScale;
                    totalAmount += quantityAmount
                })
            }
            data.push(totalAmount);
        })
        names = this.get('monthsPortuguese')
        data = [data]
        this.set('chartData', { names, data })
    },

    enumerateMonthsBetweenDates(startDate, endDate) {
        var dates = [];
        var currDate = Moment(startDate).startOf('month');
        var lastDate = Moment(endDate).startOf('month');
        dates.push(startDate);
        while (currDate.add(1, 'months').diff(lastDate) <= 0) {
            dates.push(currDate.clone().toDate());
        }
        return dates;
    },

    setupOverallChart(products) {
        var chartData = {
            labels: products.map(item => item.name),
            currentMonthLabel: "",
            currentMonthData: products.map(item => item.totalQuantity)
        }
        this.set('overallChartData', chartData)
    },

    filterByMonthAndYear(year, month) {
        if (year != undefined) {
            return
        }
        var startDate = new Date(year, 0, 1, 0, 0, 0, 0);
        var typeFilter = 'year'
        if (month != undefined) {
            startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
            typeFilter = 'month'
        }
        var filtered = this.filterByDate(startDate, typeFilter);
        this.calculateExtractProduct(filtered);
    },

    filterByDate(startDate, typeFilter) {
        var historics = [];
        var allHistoric = this.get('allHistoric');
        for (var i = 0, len = allHistoric.length; i < len; i++) {
            var dateHistoric = Moment(allHistoric[i].__data.transactionDate);
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
            var date = Moment(historic[i].__data.transactionDate).format('DD/MM/YY');
            var cost = "R$ " + historic[i].__data.transactionCost.toFixed(2).toString().replace('.', ',');
            historics.push({
                cost: cost,
                productName: historic[i].__data.product.data.attributes.name,
                quantity: historic[i].__data.productAmount + " x " + historic[i].__data.amountScale,
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
                    transactionDate: historic[i].__data.transactionDate,

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
        var moments = products.map(d => Moment(d.transactionDate));
        var maxDate = Moment.max(moments).year();
        var minDate = Moment.min(moments).year();
        var years = [];
        for (var i = minDate; i <= maxDate; i++) {
            years.push(i);
        }
        this.set('years', years.reverse())
    },
});
