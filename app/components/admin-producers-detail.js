import Component from '@ember/component';
import CPFValidator from 'npm:@fnando/cpf/dist/node';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';
import Ember from 'ember';

export default Component.extend({
    name: '',
    filteredProducers: [],

    didInsertElement() {
        //this.updateFilteredProducers();
    },
    actions: {
        search(text) {
            this.set('name', text)
            //this.updateFilteredProducers()
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
    },
});