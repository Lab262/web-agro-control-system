import Component from '@ember/component';
import ParseCloudRequest from '../utils/parse-cloud-request';

export default Component.extend({

    showPromptDialog: false,
    products: [],
    showHistoricModal: false,

    didInsertElement() {
        let model = this.get('model');
        model.getProducts(model.cooperative.id)
            .then(products => {
                this.set('productsChartData', []);
                this.setupOverallChart(products);
                this.set('products', products);
            }).catch(err => console.log(err))

    },

    setupOverallChart(products) {
        var productsIds = products.map(item => item.id);
        this.get('model').getSupplyStatistics(productsIds).then(supplyStatistics => {
            supplyStatistics = supplyStatistics.filter(item => item.statistic && item.statistic.estimatedSupply != 0)
            var chartData = supplyStatistics.map(item => {
                var currentProductName = products.filter(product => product.id === item.product)[0].get('name');
                var currentProductNameStatistics = item.statistic ? item.statistic.estimatedSupply : 0;
                return { currentProductName, currentProductNameStatistics }
            })
            chartData = {
                labels: chartData.map(item => item.currentProductName),
                currentMonthLabel: "",
                currentMonthData: chartData.map(item => item.currentProductNameStatistics)
            }
            this.set('overallChartData', chartData)
        })

    },

    actions: {
        /* Prompt dialog */
        openPromptDialog(product) {
            if (product.data) {
                this.set('editMode', true);
                this.set('editableProduct', product);
            } else {
                let newProduct = this.get('model.newProduct');
                this.set('editableProduct', newProduct);
                this.set('editMode', false);
            }
            this.set('dialogOrigin', null);
            this.set('showPromptDialog', true);
        },
        openHistoricModal(product) {
            this.set('selectedProduct', product);
            this.set('showHistoricModal', true);
        },
        openMeasuredSupplyDialog() {
            this.set('showMeasuredSupplyDialog', true);
        },
        closePromptDialog(model, isToSave) {
            if (model != undefined
                && model.get('amountScale') != undefined
                && model.get('name') != undefined
                && model.get('amountScale') != 0
                && model.get('name') != "") {

                model.set('cooperative', this.get('model').cooperative);

                model.save().then(saved => {
                    window.location.reload()
                }).catch(err => {
                    console.error(err);
                })

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
        closeMeasuredSupplyDialog(measuredSupply, isToSave, selectedProduct) {

            if (isToSave != true) {
                this.set('showMeasuredSupplyDialog', false);
            } else if (measuredSupply != undefined
                && selectedProduct != undefined) {

                ParseCloudRequest('updateMeasuredSupply', {
                    productId: selectedProduct.id,
                    cooperativeId: this.get('model.cooperative.id'),
                    measuredSupply: measuredSupply
                }).then(saved => {
                    window.location.reload()
                }).catch(err => {
                    console.error(err);
                })

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            }
        }
    }
});
