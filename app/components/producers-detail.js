import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({
    name: '',
    producers: [],
    filteredProducers: [],

    didInsertElement() {
        let model = this.get('model');
        model.getProducers(model.cooperative.id)
        .then(producers => {
            this.set('producers', producers);
            this.updateFilteredProducers();
        }).catch(err => console.log(err))
    },

    showPromptDialog: false,
    actions: {
        /* Prompt dialog */
        openPromptDialog(/* param, event */) {
            this.set('dialogOrigin', null);
            this.set('showPromptDialog', true);
        },

        closePromptDialog(object, isToSave) {
            if (object != undefined &&
                object.identification != undefined
                && object.cpf != undefined
                && object.name != undefined
                && object.email != undefined
                && object.identification != ""
                && object.cpf != ""
                && object.name != ""
                && object.email != "") {
                if (!CPFValidator.isValid(object.cpf)) alert('CPF Inválido');
                //else if (!CNPJValidator.isValid(object.cnpj)) alert('CNPJ Inválido');
                else {
                    let newProducer = this.get('model.newProducer');
                    newProducer.set('cpf', CPFValidator.format(object.cpf));
                    newProducer.set('cnpj', CNPJValidator.format(object.cnpj));
                    newProducer.set('name', object.name);
                    newProducer.set('email', object.email);
                    newProducer.set('identification',object.identification);
                    newProducer.set('cooperative',this.get('model').cooperative);

                    newProducer.save().then( saved => {
                        window.location.reload()
                    }).catch( err => {
                        console.error(err);
                    })
                }

            } else if (isToSave === true) {
                alert('Entre todos os campos');
            } else {
                this.set('showPromptDialog', false);
            }
        },
        search(text) {
            this.set('name', text)
            this.updateFilteredProducers()
        },
    },
    updateFilteredProducers() {
        const searchIncludes = (str) => {
            if (!str) { return false }
            return str.toUpperCase().includes(this.name.toUpperCase())
        }
        if (this.get('name').length == 0) {
            this.set('filteredProducers', this.producers)    
        } else {
            this.set('filteredProducers', this.producers.filter(producer => {
                return searchIncludes(producer.get('name'))
                    || searchIncludes(producer.get('cpf'))
                    || searchIncludes(producer.get('cnpj'))
                    || searchIncludes(producer.get('identification'))
            }))
        }
    }

});
