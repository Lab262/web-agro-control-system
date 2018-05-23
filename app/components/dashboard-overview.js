import Component from '@ember/component';

export default Component.extend({

    didInsertElement() {
        this.setupSupplyChart()
        this.setupReportChart()
        this.setupSalesChart()
    },

    setupSalesChart() {
        var salesChartData = {
            data: [1, 5, 4, 6, 8, 3, 5, 4],
            labels: ["Limão Taití", "Tomate", "Uva", "Maxixe"]
        }
        this.set('salesChartData', salesChartData);
    },

    setupSupplyChart() {
        let chartData = {
            labels: ["Limão Taití", "Tomate", "Uva", "Maxixe", "Tomate Italiano", "Melão", "Maça", "Batata Doce"],
            lastMonthLabel: "Nov",
            lastMonthData: [1, 2, 3, 4, 5, 6, 7, 8],
            currentMonthLabel: "Dez",
            currentMonthData: [4, 5, 7, 2, 1, 10, 12, 4]
        }
        this.set('supplyChartData', chartData)
    },

    setupReportChart() {
        let chartData = {
            labels: ["Faturamento Bruto", "Despesas(gerais)"],
            lastMonthLabel: "Nov",
            lastMonthData: [50, 30],
            currentMonthLabel: "Dez",
            currentMonthData: [156, 97]
        }
        this.set('reportChartData', chartData)
    },

});
