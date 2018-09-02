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
  this.route('producers-detail');
  this.route('admin-producers-detail');
  this.route('purchase-transactions');
  this.route('sales-transactions');
  this.route('supply-control');
  this.route('reports-container');
  this.route('master-dashboard-overview');
  this.route('cooperative-edit');
  this.route('producer-edit');
  this.route('producer-extract');
});

export default Router;
