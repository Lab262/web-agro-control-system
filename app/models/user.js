import Ember from 'ember';
import DS from 'ember-data';

// const {computed} = Ember;

export default DS.Model.extend({

  index: DS.attr('number'),
  name: DS.attr('string'),
  email: DS.attr('string')


  // cityWithHtml: computed('city', function () {
  //   return `<i>${this.get('city')}</i>`;
  // })

});
