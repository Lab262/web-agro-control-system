import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
  store: Ember.inject.service('store'),
  torii: service('torii'),

  restore: function (data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!Ember.isEmpty(data.currentUser)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function (credentials) {
    let ParseUser = this.get('store').modelFor('parse-user')

    // debugger;
    return ParseUser.login(this.get('store'), credentials).catch(error => {
      alert(error)
    }).then(user => {
      return {currentUser: user};
    });
  },

  invalidate: function () {
    return Ember.RSVP.resolve();
  }
});
