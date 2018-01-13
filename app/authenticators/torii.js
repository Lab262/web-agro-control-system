import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
  store: Ember.inject.service(),
  tokenEndpoint: ENV.APP.HOST+"/authenticate-social-network",
  torii: service('torii'),

  restore: function(data) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
          if (!Ember.isEmpty(data.currentUser)) {
            resolve(data);
          } else {
            reject();
          }
      });
  },

  authenticate: function(options) {
    var self = this;
    return this._super(options).then(function (data) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        Ember.$.ajax({
          method: "POST",
          url: self.tokenEndpoint,
          data: {
            authorizationCode: data.authorizationCode,
            provider: data.provider
          }
        }).then(function(response) {
            Ember.run(function() {
                resolve({
                  currentUser: response.currentUser,
                  // token: response.authToken
                });
            });
        }, function(xhr, status, error) {
            var response = xhr.responseText;
            Ember.run(function() {
                reject(response);
            });
        });
      });
    });
  },

  invalidate: function() {
      return Ember.RSVP.resolve();
  }
});
