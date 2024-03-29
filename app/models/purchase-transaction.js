import DS from 'ember-data';

export default DS.Model.extend({
  transactionDate: DS.attr('date'),
  amountScale: DS.attr('string'),
  unityPrice: DS.attr('number'),
  discount: DS.attr('number'),
  tax: DS.attr('number'),
  productAmount: DS.attr('number'),
  producer: DS.belongsTo('producer'),
  product: DS.belongsTo('product'),
  cooperative: DS.belongsTo('cooperative'),
  transactionCost: DS.attr('number'),
});