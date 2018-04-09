import Component from '@ember/component';

export default Component.extend({
    producers: ["9987366","9987367","9987356"],
    productsIds: ["UC00098","UC00099"],
    productsNames: ["Tomate Italiano", "Abaxaxi Mexicano", "Arroz Chines", "Madioca Brasileira"],
    scales:["cx: 19 a 22kg", "cx grande: 30 a 50kg"],
    selectedProducer: "",
    selectedProductId: "",
    selectedProductName: "",
    selectScale: "",
    unityPrice: "0",
    productCost: "0",
    historic: [
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
        {cost: "R$ 1.800,00", productName: "Tomate Italiano", quantity: "40 cx (19 a 22 kg)", date: "00/00/00" },
    ],
});
