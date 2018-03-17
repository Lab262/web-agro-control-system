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
            unity: "Kg"
        },
        input: { title: "Entrada(compras)", amount: "51.987", unity: "Kg" },
        initialStock: { title: "Estoque Inicial", amount: "53.076", unity: "Kg" },
        finalStock: { title: "Estoque Final", amount: "51.987", unity: "Kg" }
    }
});
