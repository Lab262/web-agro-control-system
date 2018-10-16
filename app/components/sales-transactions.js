import Component from '@ember/component';
import Ember from 'ember';
import Moment from 'npm:moment';
import _ from 'npm:lodash';

export default Component.extend({
    titleButtonViewAll: "Ver Todos",
    producers: [],
    products: [],
    scales: [],
    selectedProducer: null,
    selectedProduct: null,
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

    didInsertElement() {
        this.loadData()
    },

    didRender() {
        this.set('transactionDate', Moment(new Date()).format('DD/MM/YYYY'))

    },

    loadData() {
        var _this = this;
        let model = _this.get('model');
        model.getRetailers(model.cooperative.id)
            .then(retailers => {
                _this.set('producers', retailers);
            }).catch(err => {
                console.log(err);
                _this.loadData()
            })

        model.getProducts(model.cooperative.id).then(products => {
            _this.set('products', products);
        }).catch(err => {
            console.log(err);
            _this.loadData()
        })

        model.getPurchaseTransaction(model.cooperative.id).then(historic => {
            this.setupHistoricTable(historic)
            this.setupABCChart(historic)
            var moments = historic.content.map(d => Moment(d.__data.transactionDate));
            var maxDate = Moment.max(moments).year();
            var minDate = Moment.min(moments).year();
            var years = [];
            for (var i = minDate; i <= maxDate; i++) {
                years.push(i);
            }
            _this.set('years', years.reverse())
        }).catch(err => {
            console.log(err);
            _this.loadData()
        })
        _this.setupSalesChart()

        // var todayDate = new Date();
        // var transactionDate = todayDate.getDate().toString() + (todayDate.getMonth() + 1).toString() + todayDate.getFullYear().toString();
        // this.set('transactionDate', Number(transactionDate));
    },

    setupHistoricTable(historic) {
        var historics = [];
        for (var i = 0, len = historic.content.length; i < len; i++) {
            var date = moment(historic.content[i].__data.transactionDate).format('DD/MM/YYYY');
            var cost = "R$ " + historic.content[i].__data.transactionCost.toFixed(2).toString().replace('.', ',');
            historics.push({
                cost: cost,
                productName: historic.content[i].__data.product.data.attributes.name,
                quantity: historic.content[i].__data.productAmount + " x " + historic.content[i].__data.amountScale,
                date: date,
                valueAmountScale: historic.content[i].__data.amountScale,
                valueAmount: historic.content[i].__data.productAmount,
                valueCost: historic.content[i].__data.transactionCost,
                producerId: historic.content[i].__data.producer.data.id,
                producerName: historic.content[i].__data.producer.data.attributes.name,
            })
        }
        var sortedHistorics = historics.sort((a, b) => moment(b.date).toDate() - moment(a.date).toDate())

        var groupByProducer = (historics => {

            return _.chain(historics).groupBy("producerId").map(function (objs, key) {
                return {
                    cost: "R$ " + _.sumBy(objs, 'valueCost').toFixed(2).toString().replace('.', ','),
                    productName: _.get(_.find(objs, 'productName'), 'productName'),
                    quantity: _.sumBy(objs, 'valueAmount').toFixed(2).toString().replace('.', ',') + " x " + _.get(_.find(objs, 'valueAmountScale'), 'valueAmountScale'),
                    date: _.get(_.find(objs, 'date'), 'date'),
                    producerName: _.get(_.find(objs, 'producerName'), 'producerName'),
                    arrayHistoric: objs
                }
            }).value();
        })

        var groupedByDate = _.chain(sortedHistorics).groupBy("date").map(function (objs, key) {
            return {
                date: key,
                arrayHistoric: objs
            }
        }).value();

        groupedByDate.forEach(item => {
            item.arrayHistoric = groupByProducer(item.arrayHistoric)
        })

        var onlyTodayHistoric = groupedByDate.filter(item => Moment(item.date, 'DD/MM/YYYY').isSame(new Date(), 'day'))
        this.set('historic', onlyTodayHistoric);
        this.set('allHistoric', groupedByDate);
        this.set('todayHistoric', onlyTodayHistoric);
    },

    setupABCChart(historic) {
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
        this.calculatePercentageSalesByProduct();
    },

    setupSalesChart() {
        var salesChartData = {
            data: [[1, 5, 4, 6, 8, 3, 5, 4]],
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
        }
        this.set('salesChartData', salesChartData);
    },

    calculatePercentageSalesByProduct() {
        var sales = this.get('sales');
        var totalSalesCost = 0;
        var totalSalesQuantity = 0;
        var attributesABC = [];
        sales.forEach(element => {
            totalSalesCost += element.transactionCost
            totalSalesQuantity += element.totalQuantity
        });

        var cumulativePercentageCost = 0;
        var cumulativePercentageQuantity = 0;
        var classificationProduct = "A";
        sales.forEach(function (element, index) {
            var percentageCumulativeCost = (element.transactionCost / totalSalesCost) + cumulativePercentageCost
            cumulativePercentageCost = percentageCumulativeCost
            var percentageCumulativeQuantity = (element.totalQuantity / totalSalesQuantity) + cumulativePercentageQuantity
            cumulativePercentageQuantity = percentageCumulativeQuantity

            if (cumulativePercentageQuantity >= 0.21 && cumulativePercentageQuantity <= 0.51) {
                classificationProduct = "B"
            } else if (cumulativePercentageQuantity > 0.51) {
                classificationProduct = "C"
            } else {
                classificationProduct = "A"
            }

            attributesABC.push({
                name: element.name,
                position: index + 1,
                transactionCost: element.transactionCost,
                percentageSalesCost: percentageCumulativeCost,
                percentageSalesAmount: percentageCumulativeQuantity,
                classification: classificationProduct
            })
        });
        console.log(attributesABC)
        this.setupAbcChartData(attributesABC);
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

    setupAbcChartData(attributesABC) {
        var abcData = {
            a: [],
            b: [],
            c: []
        }
        attributesABC.forEach((element, index) => {
            if (element.classification == "A") {
                abcData.a.push(index + "-" + element.name)
            } else if (element.classification == "B") {
                abcData.b.push(index + "-" + element.name)
            } else if (element.classification == "C") {
                abcData.c.push(index + "-" + element.name)
            }
        })
        this.set('abcData', abcData);

        var dataABC = attributesABC.map(element => {
            return { y: parseFloat(element.percentageSalesCost * 100).toFixed(2), x: parseFloat(element.percentageSalesAmount * 100).toFixed(2) }
        })
        var dataXABC = attributesABC.map(element => parseFloat(element.percentageSalesAmount * 100).toFixed(2))

        var labelsABC = attributesABC.map(element => element.name)
        var abcChartData = {
            isNotRandomColors: true,
            data: [dataABC],
            dataX: dataXABC,
            labels: labelsABC,
        }
        this.set('abcChartData', abcChartData);
    },

    actions: {

        openViewAll() {
            var titleButtonViewAll = this.get('titleButtonViewAll')
            if (titleButtonViewAll != "Fechar") {
                var allHistorics = this.get('allHistoric')
                this.set('historic', allHistorics);
                this.set('titleButtonViewAll', "Fechar");
            } else {
                var todayHistoric = this.get('todayHistoric')
                this.set('historic', todayHistoric);
                this.set('titleButtonViewAll', "Ver Todos");
            }
        },

        saveTransaction() {
            if (this.get('selectedProducer') != undefined &&
                this.get('transactionDate') != undefined &&
                this.get('selectedProduct') != undefined
                && this.get('unityPrice') != undefined
                && this.get('amount') != undefined
                && this.get('productCost') != undefined &&
                this.get('selectedProducer') != null
                && this.get('selectedProduct') != null
                && this.get('transactionDate') != ""
                && this.get('unityPrice') != ""
                && this.get('amount') != ""
                && this.get('productCost') != "") {

                let newSaleTransaction = this.get('model.newSaleTransaction');
                var transactionDate = this.get('transactionDate');
                let day = transactionDate.substr(0, 2);
                let month = transactionDate.substr(2, 2);
                let year = transactionDate.substr(4, 4);
                transactionDate = new Date(year, month - 1, day, 0, 0, 0, 0);
                newSaleTransaction.set('transactionDate', transactionDate);
                newSaleTransaction.set('amountScale', this.get('selectedProduct')._internalModel.__data.scale.data.attributes.scaleName);
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

        openDialogHistoric(item) {

        }
    },
});
