import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  amountScale: DS.attr('number'),
  cooperative: DS.belongsTo('cooperative'),
});