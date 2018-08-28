import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  cpf: DS.attr('string'),
  cnpj: DS.attr('string'),
  lastTransaction: DS.attr('date'),
  cooperative: DS.belongsTo('cooperative'),
  size: DS.attr('string'),
  activities: DS.attr('string'),
  cep: DS.attr('string'),
  state: DS.attr('string'),
  city: DS.attr('string'),
  address: DS.attr('string'),
  neighborhood: DS.attr('string'),
  isRetailer: DS.attr('boolean')
});
