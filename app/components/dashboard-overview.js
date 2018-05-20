import Component from '@ember/component';

export default Component.extend({

    didInsertElement() {
        this.setupOverallChart()
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

});
