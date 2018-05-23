import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    didInsertElement() {
        this.set('colors', [this.getColor(0),
        this.getColor(1),
        this.getColor(2),
        this.getColor(3),
        this.getColor(4),
        this.getColor(5),
        this.getColor(6), this.getColor(7)])
    },

    options: Ember.computed('chartData', 'colors', function () {
        let overallChartData = this.get('chartData');
        if (overallChartData != null && overallChartData != undefined) {

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

    data: Ember.computed('chartData', 'colors', function () {
        let overallChartData = this.get('chartData');
        if (overallChartData != null && overallChartData != undefined) {
            let colors = this.get('colors')
            let _this = this;
            let chartData = JSON.parse(JSON.stringify({
                labels: overallChartData.labels,
                legends: JSON.parse(JSON.stringify(overallChartData.labels)),
                legendStyles: colors,
                bottomLegend: overallChartData.lastMonthLabel + " - " + overallChartData.currentMonthLabel,
                datasets: [{
                    pointHitRadius: 25,
                    label: overallChartData.lastMonthLabel,
                    data: overallChartData.lastMonthData,
                    backgroundColor: colors.map((item, index) => _this.getDarkColor(index)),
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

    getDarkColor(index) {
        var darkColors = ["#6D457D", "#CD771D", "#0FA28A", "#626E21", "#007085"];
        if (index === 0) {
            index = darkColors.length;
        }
        var darkColor = darkColors[index % darkColors.length];
        return darkColor;
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
