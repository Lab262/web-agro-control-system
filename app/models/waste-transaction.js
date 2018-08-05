import DS from 'ember-data';

export default DS.Model.extend({
  product: DS.belongsTo('product'),
  cooperative: DS.belongsTo('cooperative'),
  amount: DS.attr('number')
});