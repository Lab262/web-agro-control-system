import DS from 'ember-data';

export default DS.Model.extend({
  logo: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  cnpj: DS.attr('string'),
  socialCapital: DS.attr('string'),
  legalNature: DS.attr('string'),
  size: DS.attr('string'),
  activities: DS.attr('string'),
  socialReason: DS.attr('string'),
  phoneNumber: DS.attr('string'),
  cep: DS.attr('string'),
  address: DS.attr('string'),
  neighborhood: DS.attr('string'),
  isActive: DS.attr('boolean'),
  productScales: DS.attr()
});