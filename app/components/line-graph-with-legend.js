import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    legendType: "label",

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
                    displayColors: true,
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
                            display: true,
                            offsetGridLines: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: !(chartData.labels != undefined),
                            minRotation: (chartData.labels != undefined) ? 90:0,
                            labelOffset: -3
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            offsetGridLines: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: true,
                            min: 0,
                        },
                    }]

                },

                legend: {
                    display: false,
                }
            };
            let areaGraphDataset = {
                datasets: [],
                labels: []
            };
            var _this = this;
            var productChartData = JSON.parse(JSON.stringify(areaGraphDataset));
            chartData.data.forEach((data, index) => {
                var color = _this.getRandomColor(index);
                if (chartData.isNotRandomColors) {
                    color = _this.getColor(index);
                }
                productChartData.datasets.push({
                    data: data,
                    colors: color,
                    backgroundColor: "transparent",
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointHitRadius: 25,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    label: "",
                    lineTension: 0
                });

            });
            if (chartData.labels != undefined){
                productChartData.labels = chartData.labels;
                productChartData.legends = JSON.parse(JSON.stringify(chartData.labels));
            } else {
                productChartData.labels = chartData.names;
            }
            areaChartOptions.scales.yAxes[0].ticks.max = Math.max(...productChartData.datasets[0].data) + 3
            areaChartOptions.scales.yAxes[0].ticks.min = Math.min(...productChartData.datasets[0].data) - 3

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

    getColor(index) {
        var colors = ["#BB77D6", "#FFA947", "#00D5B2", "#ACC03D", "#00ADCE"];
        if (index === 0) {
            index = colors.length;
        }
        var color = colors[index % colors.length];
        return color;
    },

});
