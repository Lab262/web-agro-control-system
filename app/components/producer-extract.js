import Component from '@ember/component';
import Moment from 'npm:moment'
import Ember from 'ember';
export default Component.extend({
    isFilterProduct: true,
    monthsPortuguese: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    months: [],

    filterDidChange: Ember.observer('selectedYear', 'selectedMonth', 'selectedProduct', function () {
        var selectedYear = this.get('selectedYear');
        var selectedMonth = this.get('selectedMonth');
        var selectedProduct = this.get('selectedProduct');
        if (selectedYear != undefined){
            if (selectedProduct != undefined && selectedProduct.name != "Todos") { //Only by year and product, ignore month
                this.getExtractYearForProduct(selectedYear,selectedProduct)
                console.log("Only by year and product, ignore month")
            }else {
                if(selectedMonth == undefined || selectedMonth == "Todos"){//Only by year
                    this.filterByMonthAndYear(selectedYear)
                    console.log("Only by year")
                }else {//Only by year and month
                    var indexMonth = this.get('months').indexOf(selectedMonth);
                    this.filterByMonthAndYear(selectedYear, indexMonth)
                    console.log("Only by year and month")
                }
            }
        }
    }),

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.producer.id).then(historic => {
            this.set('allHistoric', historic.content);
            this.calculateExtractProduct(historic.content);
        }).catch(err => console.log(err))
        var months = this.get('monthsPortuguese').slice();
        months.unshift("Todos");
        this.set('months',months)
    },

    getExtractYearForProduct(year,selectedProduct) {
        var date = new Date();
        date.year = year;

        var startDate = Moment(date).endOf('year').toDate()
        var endDate = Moment(date).startOf('year').toDate()
        
        var dates = this.enumerateMonthsBetweenDates(endDate, startDate)

        var allHistoric = this.get('allHistoric');
        allHistoric = allHistoric.filter(historic => (historic.__data.product.data.id == selectedProduct.id))
        var names = this.get('monthsPortuguese')
        var data = []
        var infos = []
        dates.forEach((date,index) => {
            var currDateMoment = Moment(date);
            var currentHistorics = allHistoric.filter(historic => Moment(historic.__data.transactionDate).isSame(currDateMoment, 'month'))
            var totalAmount = 0
            var totalValue = 0
            if (currentHistorics.length > 0) {
                currentHistorics.forEach(function (element) {
                    var quantityAmount = element.__data.productAmount * element.__data.product.data.attributes.scale.data.attributes.scaleProportion;
                    totalAmount += quantityAmount
                    totalValue += element.__data.transactionCost
                })
            }
            data.push(totalAmount);
            infos.push({
                month: names[index],
                totalQuantity: totalAmount.toFixed(2).toString().replace('.', ',') + " Kg",
                totalValue: "R$ " + totalValue.toFixed(2).toString().replace('.', ','),
            })
        })
        data = [data]
        this.set('chartData', { names, data })
        this.set('chartDataName',selectedProduct.name)
        this.set('chartDataTable',infos)
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
        this.set('chartData', undefined)
    },

    filterByMonthAndYear(year, month) {
        if (year == undefined) {
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
                    id: objectId,
                    name: historic[i].__data.product.data.attributes.name,
                    totalQuantity: historic[i].__data.productAmount * historic.content[i].__data.product.data.attributes.scale.data.attributes.scaleProportion,
                    averagePrice: historic[i].__data.unityPrice,
                    totalValue: historic[i].__data.transactionCost,
                    transactionCost: historic[i].__data.transactionCost,
                    transactionDate: historic[i].__data.transactionDate,

                })
            } else {
                var quantityAmount = historic[i].__data.productAmount * historic.content[i].__data.product.data.attributes.scale.data.attributes.scaleProportion
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
        var productsFilter = this.get('products').map(item => { return { id: item.id, name: item.name } });

        productsFilter.unshift({ name: "Todos" });
        this.set('productsFilter', productsFilter);

        var allYears =  this.get('years')
        if (allYears == undefined) {
            var moments = products.map(d => Moment(d.transactionDate));
            var maxDate = Moment.max(moments).year();
            var minDate = Moment.min(moments).year();
            var years = [];
            for (var i = minDate; i <= maxDate; i++) {
                years.push(i);
            }
            this.set('years', years.reverse())
        }
    },
});
