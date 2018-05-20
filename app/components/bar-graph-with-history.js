import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({



    options: Ember.computed('overallChartData', function () {
        let overallChartData = this.get('overallChartData');
        if (overallChartData != null && overallChartData != undefined) {
            debugger;

            var chartOptions = {
                hover: {
                    intersect: false
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            return overallChartData.lastMonthLabel + " - R$: " + data['datasets'][0]['data'][tooltipItem['index']];
                        },
                        afterLabel: function (tooltipItem, data) {
                            return overallChartData.currentMonthLabel + " - R$: " + data['datasets'][1]['data'][tooltipItem['index']];

                        }
                    },
                    displayColors: false
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
                            // max: 15,
                            min: 0,
                        },
                    }]

                },
                legend: {
                    display: false,
                },
            }

            let maxValue = Math.max(Math.max(...overallChartData.lastMonthData), Math.max(...overallChartData.currentMonthData))
            chartOptions.scales.yAxes[0].ticks.max = maxValue + 3
            return chartOptions;
        } else {
            return undefined
        }
    }),

    data: Ember.computed('overallChartData', function () {
        let overallChartData = this.get('overallChartData');
        if (overallChartData != null && overallChartData != undefined) {
            let colors = [this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(),
            this.getRandomColor(), this.getRandomColor()];
            let _this = this;
            let chartData = JSON.parse(JSON.stringify({
                labels: overallChartData.labels,
                legendStyles: colors.map(item => { return new Ember.String.htmlSafe('background: ' + item) }),
                datasets: [{
                    pointHitRadius: 25,
                    label: overallChartData.lastMonthLabel,
                    data: overallChartData.lastMonthData,
                    backgroundColor: colors.map(item => _this.getTintedColor(item, -50)),
                }, {
                    pointHitRadius: 25,
                    label: overallChartData.currentMonthLabel,
                    data: overallChartData.currentMonthData,
                    backgroundColor: colors
                }]
            }));
            return chartData
        } else {
            return undefined
        }

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
