import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from "../config/environment";

const { service } = Ember.inject;

export default Torii.extend({
  store: Ember.inject.service(),
  tokenEndpoint: ENV.APP.HOST+"/parse/login",
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

  authenticate: function(credentials) {
    var self = this;
      return new Ember.RSVP.Promise(function (resolve, reject) {
        $.ajax({
          method: "GET",
          beforeSend: function(request) {
            request.setRequestHeader("X-Parse-Application-Id", ENV.APP.applicationId);
          },
          url: self.tokenEndpoint + "?username="+credentials.username+"&password="+credentials.password,
        }).then(function(response) {
            Ember.run(function() {
                resolve({
                  currentUser: response,
                });
            });
        }, function(xhr, status, error) {
            var response = xhr.responseText;
            Ember.run(function() {
                reject(response);
            });
        });
      });
  },

  invalidate: function() {
      return Ember.RSVP.resolve();
  }
});
