import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  name: DS.attr('string'),
  cpf: DS.attr('string'),
  cnpj: DS.attr('string')

//   establishment: DS.belongsTo('establishment'),
});