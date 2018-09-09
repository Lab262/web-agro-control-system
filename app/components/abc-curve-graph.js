import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    legendType: "label",

    data: Ember.computed('chartData', 'color', function () {
        let chartData = this.get('chartData');
        if (chartData != undefined) {

            // chartData.dataX.unshift(0)
            // chartData.data[0].unshift(0)
            var dataXABC = chartData.dataX
            var annotationsA = 0, annotationsB = 0

            dataXABC.forEach((item, index) => {
                if (index + 1 < dataXABC.length) {
                    if (item <= 20 && dataXABC[index + 1] > 20) {
                        annotationsA = index
                    }

                    if (item <= 50 && dataXABC[index + 1] > 50) {
                        annotationsB = index
                    }
                }
            })
            chartData.annotations = [20, 50];


            window.Chart.plugins.register({
                afterDatasetsDraw: function (chart) {


                    var ctx = chart.ctx;
                    chart.data.datasets.forEach(function (dataset, i) {
                        if (dataset.annotations) {

                            dataset.annotations.forEach(function (element) {


                                var xaxis = chart.scales['x-axis-0'];
                                var yaxis = chart.scales['y-axis-0'];
                                ctx.save();
                                ctx.beginPath();
                                ctx.moveTo(xaxis.getPixelForValue(element, undefined), yaxis.top);
                                ctx.strokeStyle = '#5e9bcc';
                                ctx.lineWidth = 4;
                                ctx.lineTo(xaxis.getPixelForValue(element, undefined), yaxis.bottom);
                                ctx.stroke();

                                ctx.fillStyle = 'rgb(0, 0, 0)';
                                var fontSize = 32;
                                var fontStyle = 'normal';
                                var fontFamily = 'Helvetica Neue';
                                ctx.font = window.Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                                // Make sure alignment settings are correct
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                if (element === 20) {
                                    ctx.fillText("A", xaxis.getPixelForValue(element, undefined) - 80, yaxis.top + 120);
                                } else {
                                    ctx.fillText("B", xaxis.getPixelForValue(element, undefined) - 80, yaxis.top + 90);
                                    ctx.fillText("C", xaxis.getPixelForValue(element, undefined) + 200, yaxis.top + 60);

                                }
                                ctx.restore();

                            });
                        }
                    });

                }
            });

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
                            return data.legends[tooltipItem[0].index - 1];

                        },
                        label: function (tooltipItem) {
                            return "Vendas Totais: " + tooltipItem.yLabel + " % \n";
                        },
                        afterLabel: function (tooltipItem) {
                            return "Total de Items: " + tooltipItem.xLabel + " % \n";
                        }
                        ,
                    },
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        gridLines: {
                            display: true,
                            offsetGridLines: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: (chartData.labels != undefined),
                            minRotation: (chartData.labels != undefined) ? 0 : 0,
                            maxRotation: 0,
                            labelOffset: -3,
                            min: 0,
                            max: 110,
                            beginAtZero: true,
                            maxTicksLimit: 110,
                            stepSize: 5
                        },
                    }],
                    yAxes: [{
                        type: 'linear',
                        gridLines: {
                            display: true,
                            offsetGridLines: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: true,
                            min: 0,
                            max: 110,
                            stepSize: 10,
                            beginAtZero: true
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
            var annotations = chartData.annotations;
            var productChartData = JSON.parse(JSON.stringify(areaGraphDataset));
            chartData.data.forEach((data, index) => {
                var color = _this.getRandomColor(index);
                if (chartData.isNotRandomColors) {
                    color = '#ACC03D'
                }
                productChartData.datasets.push({
                    annotations: annotations,
                    data: data,
                    colors: color,
                    backgroundColor: "transparent",
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointHitRadius: 25,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    label: "",
                    lineTension: 0
                });

            });
            if (chartData.labels != undefined) {
                productChartData.labels = chartData.dataX;
                productChartData.legends = JSON.parse(JSON.stringify(chartData.labels));
            } else {
                productChartData.labels = chartData.names;
            }

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
