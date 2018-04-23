import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user-connection', {path: "/"});
  this.route('dashboard-overview');
  this.route('producer-dashboard-overview');
});

export default Router;
