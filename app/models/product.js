import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  name: DS.attr('string'),
  amountScale: DS.attr('string'),
  unityPrice: DS.attr('number')

//   establishment: DS.belongsTo('establishment'),
});