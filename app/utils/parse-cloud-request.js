import Config from '../config/environment';
import Ember from 'ember';

export default function parseCloudRequest(functionName, data) {
  return new Ember.RSVP.Promise(function (resolve, reject) {
    Ember.$.ajax({
      method: "POST",
      url: Config.APP.HOST + '/parse/functions/' + functionName,
      headers: {
        'X-Parse-Application-Id': Config.APP.applicationId,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    }).then((response) => {
      resolve(response.result);
    }).catch(err => reject(err))

  });
}