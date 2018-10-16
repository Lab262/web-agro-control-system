import Component from '@ember/component';
import Ember from 'ember';
import Moment from 'npm:moment';
import _ from 'npm:lodash';
import Inputmask from "npm:inputmask";

export default Component.extend({
    titleButtonViewAll: "Ver Todos",
    producers: [],
    products: [],
    scales: [],
    selectedProducer: null,
    selectedProduct: null,
    impost: Ember.computed('amount', 'selectedProduct', function () {
        if (this.get('selectedProduct') != null && this.get('amount') != undefined &&
            this.get('selectedProduct')._internalModel.__data.tax > 0 && this.get('amount').replace(',', '.') > 0) {
            return ("R$ " + (this.get('selectedProduct')._internalModel.__data.tax * this.get('amount').replace(',', '.')).toFixed(2)).replace('.', ',');
        } else {
            return "R$  0,00"
        }
    }),
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
        this.set('transactionDate', Moment(new Date()).format('DD/MM/YYYY'))
        Ember.$(document).ready(function () {
            Inputmask({ "mask": "99/99/9999", "placeholder": "DD/MM/AAAA" }).mask(Ember.$('#date').find('#input-date'));
        });
    },

    loadData() {
        var _this = this;
        let model = _this.get('model');
        model.getProducers(model.cooperative.id)
            .then(producers => {
                _this.set('producers', producers);
                var producersFilter = this.get('producers').content.map(item => { return { id: item.id, name: item.__data.name } });
                producersFilter.unshift({ name: "Todos" });
                _this.set('producersFilter', producersFilter);
            }).catch(err => {
                console.log(err);
                _this.loadData()
            });

        model.getProducts(model.cooperative.id).then(products => {
            _this.set('products', products);
        }).catch(err => {
            console.log(err);
            _this.loadData()
        })

        model.getPurchaseTransaction(model.cooperative.id).then(historic => {
            this.setupHistoricTable(historic)
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
        _this.setupPurchasesChart()
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

    setupPurchasesChart() {
        var purchasesChartData = {
            data: [[1, 5, 4, 6, 8, 3, 5, 4]],
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
        }
        this.set('purchasesChartData', purchasesChartData);
    },

    actions: {
        printReports() {
            window.print();
        },
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

                let newPurchaseTransaction = this.get('model.newPurchaseTransaction');
                var transactionDate = this.get('transactionDate');
                let day = transactionDate.substr(0, 2);
                let month = transactionDate.substr(3, 2);
                let year = transactionDate.substr(6, 4);

                transactionDate = new Date(year, month - 1, day, 0, 0, 0, 0);

                newPurchaseTransaction.set('transactionDate', transactionDate);
                newPurchaseTransaction.set('amountScale', this.get('selectedProduct')._internalModel.__data.scale.data.attributes.scaleName);
                newPurchaseTransaction.set('unityPrice', Number(this.get('unityPrice').replace(',', '.')));
                if (this.get('discount') != undefined && this.get('discount') != "") {
                    newPurchaseTransaction.set('discount', Number(this.get('discount').replace(',', '.')));
                }
                if (this.get('impost') != undefined && this.get('impost') != "") {
                    newPurchaseTransaction.set('tax', Number(this.get('impost').replace(',', '.')));
                }
                newPurchaseTransaction.set('productAmount', Number(this.get('amount')));
                newPurchaseTransaction.set('producer', this.get('selectedProducer'));
                newPurchaseTransaction.set('product', this.get('selectedProduct'));
                newPurchaseTransaction.set('cooperative', this.get('model').cooperative);
                newPurchaseTransaction.set('transactionCost', Number((this.get('unityPrice').replace(',', '.') * this.get('amount').replace(',', '.')).toFixed(2)));

                newPurchaseTransaction.save().then(saved => {
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
    }

});
