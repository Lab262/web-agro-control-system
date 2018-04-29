import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  name: DS.attr('string'),
  amountScale: DS.attr('string'),
  unityPrice: DS.attr('number'),
  cooperative: DS.belongsTo('cooperative'),
});