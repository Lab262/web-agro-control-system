import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    didInsertElement() {
        this.set('color', this.getRandomColor())
    },

    data: Ember.computed('chartData', 'color', function () {
        let chartData = this.get('chartData');
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
    }),

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

});
