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

    didInsertElement() {
        let model = this.get('model');
        model.getPurchaseTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
            }
            this.set('stockDrive.input.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
        model.getSaleTransaction(model.cooperative.id).then(historic => {
            var totalCost = 0;
            this.set('productsIds', []);
            this.set('sales', []);
            for (var i = 0, len = historic.content.length; i < len; i++) {
                var cost = historic.content[i].__data.transactionCost
                totalCost += cost
                this.calculateTotalSalesByProduct(historic.content[i])
                console.log(historic.content[i].__data.name)
            }
            var sales = this.get('sales');
            sales.sort(this.numberDescending);
            this.set('sales', sales);
            console.log(this.get('productsIds'))
            console.log(sales)
            this.calculatePercentageSalesByProduct();
            this.set('stockDrive.output.amount', totalCost.toFixed(2).toString().replace('.', ','));
        }).catch(err => console.log(err))
    },

    calculatePercentageSalesByProduct() {
        var sales = this.get('sales');
        var totalSalesCost = 0;
        var totalSalesQuantity = 0;
        var attributesABC = [];
        sales.forEach(element => {
            totalSalesCost += element.transactionCost
            totalSalesQuantity += element.totalQuantity
        });

        var cumulativePercentageCost = 0;
        var cumulativePercentageQuantity = 0;
        var classificationProduct = "A";
        sales.forEach(function (element, index) {
            var percentageCumulativeCost = (element.transactionCost / totalSalesCost) + cumulativePercentageCost
            cumulativePercentageCost = percentageCumulativeCost
            var percentageCumulativeQuantity = (element.totalQuantity / totalSalesQuantity) + cumulativePercentageQuantity
            cumulativePercentageQuantity = percentageCumulativeQuantity

            if (cumulativePercentageQuantity >= 0.21 && cumulativePercentageQuantity <= 0.51) {
                classificationProduct = "B"
            } else if (cumulativePercentageQuantity > 0.51) {
                classificationProduct = "C"
            }else{
                classificationProduct = "A"
            }

            attributesABC.push({
                name: element.name,
                position: index + 1,
                transactionCost: element.transactionCost,
                percentageSalesCost: percentageCumulativeCost,
                percentageSalesAmount: percentageCumulativeQuantity,
                classification: classificationProduct
            })
        });
        console.log(attributesABC)
        this.setupAbcChartData(attributesABC);
    },

    numberDescending(a, b) {
        return b.transactionCost - a.transactionCost;
    },

    calculateTotalSalesByProduct(historic) {
        var productsIds = this.get('productsIds');
        var sales = this.get('sales');
        var objectId = historic.__data.product.data.id
        var indexProduct = productsIds.indexOf(objectId)
        if (indexProduct < 0) {
            productsIds.push(objectId)
            this.set('productsIds', productsIds);
            sales.push({
                name: historic.__data.product.data.attributes.name,
                totalQuantity: historic.__data.productAmount * historic.__data.product.data.attributes.amountScale,
                transactionCost: historic.__data.transactionCost,
            })
        } else {
            var quantityAmount = historic.__data.productAmount * historic.__data.product.data.attributes.amountScale
            sales[indexProduct].totalQuantity += quantityAmount
            sales[indexProduct].transactionCost += historic.__data.transactionCost
        }
        this.set('sales', sales);
    },

    setupAbcChartData(attributesABC) {
        var abcData = {
            a: [],
            b: [],
            c: []
        }
        attributesABC.forEach( (element, index) => {
            if (element.classification == "A") {
                abcData.a.push(index + "-" + element.name)
            } else if (element.classification == "B") {
                abcData.b.push(index + "-" + element.name)
            } else if (element.classification == "C") {
                abcData.c.push(index + "-" + element.name)
            }
        })
        this.set('abcData', abcData);

        var dataABC = attributesABC.map(element => element.percentageSalesCost)
        var dataXABC = attributesABC.map(element => element.percentageSalesAmount)
        var annotationsA = 2
        var annotationsB = 5
        var labelsABC = attributesABC.map(element => element.name)
        var abcChartData = {
            isNotRandomColors: true,
            data: [dataABC],
            labels: labelsABC,
            annotations: [annotationsA, annotationsB]
        }
        this.set('abcChartData', abcChartData);
    }
});
