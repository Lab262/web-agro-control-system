/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'web-agro-control-system',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      }
    },
    APP: {
      applicationId: 'myAppId'
    },    
    browserify: {
      extensions: ['.js'],
      transform: [
        // ['leaflet-material-controls', { global: true }]
      ]
    }
  };


  if (environment === 'development') {
    ENV.APP.HOST = 'http://localhost:1337'
    ENV.rootURL = null;
    ENV.locationType = 'hash';    
  }

  if (environment === 'test') {
    ENV.APP.HOST = 'https://web-agro-control-system-api.herokuapp.com'
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.HOST = 'https://web-agro-control-system-api.herokuapp.com'
    ENV.rootURL = null;
    ENV.locationType = 'hash';
  }
  return ENV;
};


