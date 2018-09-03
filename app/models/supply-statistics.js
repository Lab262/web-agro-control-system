import DS from 'ember-data';

export default DS.Model.extend({
    measuredSupply: DS.attr('number'),
    supplyWaste: DS.attr('number'),
    estimatedSupply: DS.attr('number'),
    salesPurchasesDifference: DS.attr('number'),
    totalSales: DS.attr('number'),
    totalPurchase: DS.attr('number'),
    product: DS.belongsTo('product'),
    cooperative: DS.belongsTo('cooperative'),
});
