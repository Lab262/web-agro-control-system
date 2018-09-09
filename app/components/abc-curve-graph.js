import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

    legendType: "label",

    data: Ember.computed('chartData', 'color', function () {
        let chartData = this.get('chartData');
        if (chartData != undefined) {

            var dataXABC = chartData.dataX
            var annotationsA = 0, annotationsB = 0

            dataXABC.forEach((item, index) => {
                if (index + 1 < dataXABC.length) {
                    if (item <= .2 && dataXABC[index + 1] > .2) {
                        annotationsA = index
                    }

                    if (item <= .5 && dataXABC[index + 1] > .5) {
                        annotationsB = index
                    }
                }
            })
            chartData.annotations = [annotationsA, annotationsB];


            window.Chart.plugins.register({
                afterDatasetsDraw: function (chart) {


                    var ctx = chart.ctx;
                    chart.data.datasets.forEach(function (dataset, i) {
                        if (dataset.annotations) {

                            var meta = chart.getDatasetMeta(i);

                            if (!meta.hidden) {
                                meta.data.forEach(function (element, index) {

                                    var indexOfLine = dataset.annotations.indexOf(index)
                                    if (indexOfLine >= 0) {

                                        var selectedIndex = index;
                                        var xaxis = chart.scales['x-axis-0'];
                                        var yaxis = chart.scales['y-axis-0'];
                                        ctx.save();
                                        ctx.beginPath();
                                        ctx.moveTo(xaxis.getPixelForValue(undefined, selectedIndex), yaxis.top);
                                        ctx.strokeStyle = '#5e9bcc';
                                        ctx.lineWidth = 4;
                                        ctx.lineTo(xaxis.getPixelForValue(undefined, selectedIndex), yaxis.bottom);
                                        ctx.stroke();

                                        ctx.fillStyle = 'rgb(0, 0, 0)';
                                        var fontSize = 32;
                                        var fontStyle = 'normal';
                                        var fontFamily = 'Helvetica Neue';
                                        ctx.font = window.Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                                        // Make sure alignment settings are correct
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        var position = element.tooltipPosition();
                                        if (indexOfLine === 0) {
                                            ctx.fillText("A", position.x - 55, position.y - (fontSize / 2) + 50);
                                        } else {
                                            ctx.fillText("B", position.x - 75, position.y - (fontSize / 2) + 50);
                                            ctx.fillText("C", position.x + 200, position.y - (fontSize / 2) + 10);

                                        }
                                        ctx.restore();

                                    }
                                });
                            }
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
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            return tooltipItem.yLabel + " %";
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
                            display: (chartData.labels != undefined),
                            minRotation: (chartData.labels != undefined) ? 0 : 0,
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
                    pointRadius: 0,
                    pointHoverRadius: 4,
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
            areaChartOptions.scales.yAxes[0].ticks.max = (chartData.isNotRandomColors) ? 1.2 : Math.max(...productChartData.datasets[0].data) + 3
            areaChartOptions.scales.yAxes[0].ticks.min = (chartData.isNotRandomColors) ? 0 : Math.min(...productChartData.datasets[0].data) - 3

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
