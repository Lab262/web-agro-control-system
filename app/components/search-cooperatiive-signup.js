import Component from '@ember/component';

export default Component.extend({
    cooperatives: ["Cooperativa Cootaquara"],

    didInsertElement() {
        this.loadData();
    },

    loadData(){
        this.get('model').getCooperatives().then(cooperativesArray => {
            let cooperativesApproved = cooperativesArray.content.filter(item => item.__data.isActive).map(item => item.getRecord());
            this.set('cooperatives', cooperativesApproved);
            console.log(cooperativesApproved);
        }).catch(error => {
            console.log(error);
            this.loadData();
        });
    },
});
