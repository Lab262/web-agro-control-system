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
                this.setupOverallChart(products);
                this.set('productsChartData', []);
                products.forEach(item => {
                    this.setupProductChart(item);
                });
                this.set('products', products);
            }).catch(err => console.log(err))
            
        model.getSupplyStatistics(model.cooperative.id).then(supplyStatistics => {
            console.log(supplyStatistics);
        }).catch(err => console.log(err))
    },

    setupProductChart(product) {
        var productChartData = {
            data: [[1, 5, 4, 6, 8, 3, 5, 4]],
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
        }
        product.set('chartData', productChartData);
    },

    setupOverallChart(products) {
        var names = []
        products.forEach(item => {
            names.push(item._internalModel.__data.name);
        });
        let chartData = {
            labels: names,
            lastMonthLabel: "Nov",
            lastMonthData: [1, 2, 3, 4, 5, 6, 7, 8],
            currentMonthLabel: "Dez",
            currentMonthData: [4, 5, 7, 2, 1, 10, 12, 4]
        }
        this.set('overallChartData', chartData)
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
