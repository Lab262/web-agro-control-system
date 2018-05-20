import Component from '@ember/component';

export default Component.extend({

    showPromptDialog: false,
    products: [],
    productsChartData: [],

    didInsertElement() {
        let model = this.get('model');
        model.getProducts(model.cooperative.id)
            .then(products => {
                this.set('productsChartData', []);
                products.forEach(item => {
                    this.setupProductChart(item);
                });
                this.set('products', products);
            }).catch(err => console.log(err))
        this.setupOverallChart();
    },

    setupProductChart(product) {
        var areaChartOptions = {
            hover: {
                intersect: false
            },
            tooltips: {
                mode: 'index',
                axis: 'x',
                displayColors: false,
                callbacks: {
                    title: function (tooltipItem, data) {
                        return "";
                    },
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel + " kg";
                    },
                },
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        offsetGridLines: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false,
                        minRotation: 90,
                        labelOffset: -3
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        offsetGridLines: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false,
                        min: 0,
                    },
                }]

            },

            legend: {
                display: false,
            }
        };
        let color = this.getRandomColor()
        let areaGraphDataset = {
            datasets: [{
                data: [],
                colors: color,
                backgroundColor: "#FFFFFF",
                borderColor: color,
                pointBackgroundColor: color,
                pointHitRadius: 25,
                pointRadius: 0,
                pointHoverRadius: 4,
                label: "",
                lineTension: 0
            }],
            labels: []
        };
        var productChartData = JSON.parse(JSON.stringify(areaGraphDataset));
        productChartData.datasets[0].data = [1, 5, 4, 6, 8, 3, 5, 4];
        productChartData.labels = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"];

        var productChartOptions = areaChartOptions;
        productChartOptions.scales.yAxes[0].ticks.max = Math.max(...productChartData.datasets[0].data) + 3
        productChartData.options = productChartOptions;
        product.set('months', productChartData.labels)
        product.set('chartData', productChartData);

    },

    setupOverallChart() {
        let chartData = {
            labels: ["Limão Taití", "Tomate", "Uva", "Maxixe", "Tomate Italiano", "Melão", "Maça", "Batata Doce"],
            lastMonthLabel: "Nov",
            lastMonthData: [1, 2, 3, 4, 5, 6, 7, 8],
            currentMonthLabel: "Dez",
            currentMonthData: [4, 5, 7, 2, 1, 10, 12, 4]
        }
        this.set('overallChartData', chartData)
    },

    getTintedColor(color, v) {
        if (color.length > 6) { color = color.substring(1, color.length) }
        var rgb = parseInt(color, 16);
        var r = Math.abs(((rgb >> 16) & 0xFF) + v); if (r > 255) r = r - (r - 255);
        var g = Math.abs(((rgb >> 8) & 0xFF) + v); if (g > 255) g = g - (g - 255);
        var b = Math.abs((rgb & 0xFF) + v); if (b > 255) b = b - (b - 255);
        r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
        if (r.length == 1) r = '0' + r;
        g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
        if (g.length == 1) g = '0' + g;
        b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
        if (b.length == 1) b = '0' + b;
        return "#" + r + g + b;
    },

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    actions: {
        /* Prompt dialog */
        openPromptDialog(/* param, event */) {
            this.set('dialogOrigin', null);
            this.set('showPromptDialog', true);
        },

        closePromptDialog(model, isToSave) {
            if (model != undefined &&
                model.identification != undefined
                && model.unityPrice != undefined
                && model.selectScale != undefined
                && model.name != undefined
                && model.identification != ""
                && model.unityPrice != ""
                && model.selectScale != ""
                && model.name != "") {

                let newProduct = this.get('model.newProduct');
                newProduct.set('identification', model.identification);
                newProduct.set('unityPrice', model.unityPrice);
                newProduct.set('amountScale', model.selectScale);
                newProduct.set('name', model.name);
                newProduct.set('cooperative', this.get('model').cooperative);

                newProduct.save().then(saved => {
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
    }
});
