import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({

    session: Ember.inject.service('session'),
    route: null,
    menuOptions: [
        {name: 'Dashboard', iconName: 'ic_dashboard', componentName: 'user-signin', hasDivider: true},
        {name: 'Produtores', iconName: 'ic_produtores', componentName: 'user-signin'},
        {name: 'Transação de Compra', iconName: 'ic_transacao_compra', componentName: 'user-signin'},
        {name: 'Transação de Venda', iconName: 'ic_transacao_venda', componentName: 'user-signin'},
        {name: 'Controle de Estoque', iconName: 'ic_estoque', componentName: 'user-signin'},
        {name: 'Relatório', iconName: 'ic_relatorio', componentName: 'user-signin'},
    ],
    optionSelected: {name: 'Dashboard', iconName: 'ic_dashboard', componentName: 'user-signin'},


    didInsertElement() {
        // this.set('optionSelected',this.get('menuOptions')[0])
    },

    actions: {
        selectOption(option) {
            this.set('optionSelected', option);
        },

        logout() {
            this.get('session').invalidate().then(() => {
                if (!this.get('session.isAuthenticated')) {
                    this.get('route').transitionToRoute('user-connection');
                }
            });
        },

        mouseEnter(event) {
            // alert(event);
            let imagePathComponents = event.target.firstElementChild.firstElementChild.src.split("/");
            let imageName = imagePathComponents[imagePathComponents.length - 1];
            let imageCleanName = imageName.split('.png')[0].split('_selected')[0];
            event.target.firstElementChild.firstElementChild.src = 'images/' + imageCleanName + '_selected.png';
        },

        mouseLeave(event) {
            let imagePathComponents = event.target.firstElementChild.firstElementChild.src.split("/");
            let imageName = imagePathComponents[imagePathComponents.length - 1];
            let imageCleanName = imageName.split('.png')[0].split('_selected')[0];
            if (this.get('optionSelected.iconName') != imageCleanName) {
                event.target.firstElementChild.firstElementChild.src = 'images/' + imageCleanName +'.png';
            } else {
                event.target.firstElementChild.firstElementChild.src = 'images/' + imageCleanName +'_selected.png';
            }
        }
    }

});
