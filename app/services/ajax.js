import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),
  headers: {
      'X-Parse-Application-Id': "myAppId"
      }
});