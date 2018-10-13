import Component from '@ember/component';

export default Component.extend({

    showPromptDialog: false,
    products: [],
    showAddScaleDialog: false,

    didInsertElement() {
        let model = this.get('model');
        model.getScales(model.cooperative.id)
            .then(scales => {
                this.set('scales', scales);
            }).catch(err => console.log(err))
    },

    actions: {

        openAddScaleDialog() {
            let newScale = this.get('model.newScale');
            this.set('newScale', newScale);
            this.set('showAddScaleDialog', true);
        },

        closeAddScaleDialog() {
            this.set('newScale', undefined);
            this.set('showAddScaleDialog', false);
        },

        saveAddScaleDialog(model) {
            if (model != undefined
                && model.get('scaleName') != undefined
                && model.get('scaleProportion') != undefined
                && model.get('scaleProportion') != 0
                && model.get('scaleName') != "") {

                model.set('cooperative', this.get('model').cooperative);

                model.save().then(saved => {
                    window.location.reload()
                }).catch(err => {
                    console.error(err);
                })

            } else {
                alert('Entre todos os campos');
            }
        },

        deleteUnityMeasure(item) {
            item.destroyRecord().then(deleted => {
                window.location.reload()
            });
        }
    }
});
