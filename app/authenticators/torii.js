import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const { service } = Ember.inject;

export default Torii.extend({
  store: Ember.inject.service('store'),
  torii: service('torii'),

  restore: function (data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!Ember.isEmpty(data.currentUser)) {
        debugger;
        data.currentUser.data = data.currentUser;
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function (credentials) {
    let store = this.get('store');
    let ParseUser = store.modelFor('parse-user');
    return new Ember.RSVP.Promise(function (resolve, reject) {
      ParseUser.login(store, credentials).catch(error => {
        return reject(error);
      }).then(user => {

        return resolve({ currentUser: user });
      })
    });
  },

  invalidate: function () {
    return Ember.RSVP.resolve();
  }
});
