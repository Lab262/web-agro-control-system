import DS from 'ember-data';

export default DS.Model.extend({
  logo: DS.attr('string'),
  name: DS.attr('string')
});