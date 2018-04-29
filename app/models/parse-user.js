import DS from 'ember-data';
import ParseUser from 'ember-parse-adapter/models/parse-user';

export default ParseUser.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  sessionToken: DS.attr('string'),
  test: DS.attr('string'),
  cooperatives: DS.attr()
});
