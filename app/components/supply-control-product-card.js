import Component from '@ember/component';
import ParseCloudRequest from '../utils/parse-cloud-request';
import Ember from 'ember';

export default Component.extend({

    didInsertElement() {
        var _this = this;
        ParseCloudRequest('getWasteStatistcsForProduct', {
            dayRange: 7,
            product: this.product.id,
        }).then(result => {

            _this.set('chartData', result)

        }).catch(err => console.log(err))
    }



});
