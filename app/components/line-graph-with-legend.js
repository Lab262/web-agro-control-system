import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    legendType: "label",

    didInsertElement() {
        this.set('color', this.getRandomColor())
    },

    data: Ember.computed('chartData', 'color', function () {
        let chartData = this.get('chartData');
        if (chartData != undefined) {

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
            let color = this.get('color');
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
            productChartData.datasets[0].data = chartData.data;
            productChartData.labels = chartData.labels;
            productChartData.legends = JSON.parse(JSON.stringify(chartData.labels));
            areaChartOptions.scales.yAxes[0].ticks.max = Math.max(...productChartData.datasets[0].data) + 3
            productChartData.options = areaChartOptions;
            return productChartData

        } else {
            return undefined
        }
    }),

    getRandomColor() {
        var index = Math.floor(Math.random() * 5)
        var colors = ["#BB77D6", "#FFA947", "#00D5B2", "#ACC03D", "#00ADCE"];
        if (index === 0) {
            index = colors.length;
        }
        var color = colors[index % colors.length];
        return color;
    },

});
