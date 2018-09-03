import Component from '@ember/component';

export default Component.extend({
    grossSales: { title: "Faturamento Bruto", amount: "1.000.000,00", unity: "R$" },
    purchases: { title: "Compras", amount: "500.000,00", unity: "R$" },
    contributionMargin: {
        unitary: { title: "Unitário", amount: "500.000,00", unity: "R$" },
        total: { title: "Total", amount: "500.000,00", unity: "R$" }
    },
    stockDrive: {
        output: {
            title: "Saída(vendas)",
            amount: "42.890",
            unity: "R$"
        },
        input: { title: "Entrada(compras)", amount: "51.987", unity: "R$" },
        initialStock: { title: "Estoque Inicial", amount: "53.076", unity: "Kg" },
        finalStock: { title: "Estoque Final", amount: "51.987", unity: "Kg" }
    },
    abcData: {
        a: ["Maxixe", "Tomate Italiano", "Beterraba"],
        b: ["Jiló", "Batata Doce", "Cebola"],
        c: ["Cenora", "Abacate", "Abacaxi"]
    },

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
            }
            console.log(totalCost);
            this.set('stockDrive.input.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
        model.getSaleTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
            }
            console.log(totalCost);
            this.set('stockDrive.output.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
        this.setupAbcChartData();
    },

    setupAbcChartData() {
        var abcChartData = {
            isNotRandomColors: true,
            data: [[1, 2, 10, 4, 5, 6, 10, 12], [4, 3, 7, 6, 5, 14, 4, 5], [10, 9, 11, 12, 13, 15, 10, 9]],
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO"]
        }
        this.set('abcChartData', abcChartData);
    }
});
