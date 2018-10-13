import DS from 'ember-data';

export default DS.Model.extend({
    scaleName: DS.attr('string'),
    scaleProportion: DS.attr('number'),
    cooperative: DS.belongsTo('cooperative'),
});