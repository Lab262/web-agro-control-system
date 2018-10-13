import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  scale: DS.belongsTo('scale'),
  cooperative: DS.belongsTo('cooperative'),
});