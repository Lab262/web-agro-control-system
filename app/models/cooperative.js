import DS from 'ember-data';

export default DS.Model.extend({
  logo: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  cnpj: DS.attr('string'),
  isActive: DS.attr('boolean'),
  productScales: DS.attr()
});