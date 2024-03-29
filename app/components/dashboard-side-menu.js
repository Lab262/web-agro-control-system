import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({

    session: Ember.inject.service('session'),
    route: null,
    menuOptions: [],
    optionSelected: { name: 'Dashboard', iconName: 'ic_dashboard', componentName: 'dashboard-overview' },


    didInsertElement() {
        if (this.get('userType') === "admin") {
            this.set('menuOptions', [
                { name: 'Dashboard', iconName: 'ic_dashboard', componentName: 'dashboard-overview', hasDivider: true },
                { name: 'Produtores', iconName: 'ic_produtores', componentName: 'producers-detail' },
                { name: 'Transação de Compra', iconName: 'ic_transacao_compra', componentName: 'purchase-transactions' },
                { name: 'Transação de Venda', iconName: 'ic_transacao_venda', componentName: 'sales-transactions' },
                { name: 'Controle de Estoque', iconName: 'ic_estoque', componentName: 'supply-control' },
                { name: 'Relatório Contábil', iconName: 'ic_relatorio', componentName: 'reports-container' },
                { name: 'Cooperativa', iconName: 'ic_relatorio', componentName: 'cooperative-edit' }
            ]);
        } else if (this.get('userType') === "master") {
            this.set('menuOptions', [
                { name: 'Cooperativas', iconName: 'ic_produtores', componentName: 'master-dashboard-overview', hasDivider: true },
                { name: 'Produtores', iconName: 'ic_produtores', componentName: 'admin-producers-detail' }
            ]);
        } else {
            this.set('menuOptions', [
                { name: 'Dashboard', iconName: 'ic_dashboard', componentName: 'producer-dashboard-overview', hasDivider: true },
                { name: 'Cooperativa', iconName: 'ic_relatorio', componentName: 'producer-edit' },
                { name: 'Extrato', iconName: 'ic_relatorio', componentName: 'producer-extract' }

            ]);
        }
        let currentOption = this.get('route').target.currentRouteName;
        this.set('optionSelected', this.get('menuOptions').filter(item => item.componentName === currentOption)[0])
    },

    actions: {
        selectOption(option) {
            this.get('route').transitionToRoute(option.componentName);
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
            let imagePathComponents = event.currentTarget.firstElementChild.firstElementChild.src.split("/");
            let imageName = imagePathComponents[imagePathComponents.length - 1];
            let imageCleanName = imageName.split('.png')[0].split('_selected')[0];
            event.currentTarget.firstElementChild.firstElementChild.src = 'https://storage.googleapis.com/amplified-torch-4662/apps_assets/menu/' + imageCleanName + '_selected.png';
        },

        mouseLeave(event) {
            let imagePathComponents = event.currentTarget.firstElementChild.firstElementChild.src.split("/");
            let imageName = imagePathComponents[imagePathComponents.length - 1];
            let imageCleanName = imageName.split('.png')[0].split('_selected')[0];
            if (this.get('optionSelected.iconName') != imageCleanName) {
                event.currentTarget.firstElementChild.firstElementChild.src = 'https://storage.googleapis.com/amplified-torch-4662/apps_assets/menu/' + imageCleanName + '.png';
            } else {
                event.currentTarget.firstElementChild.firstElementChild.src = 'https://storage.googleapis.com/amplified-torch-4662/apps_assets/menu/' + imageCleanName + '_selected.png';
            }
        },

        editCooperative() {
            if (this.get('userType') === "admin") {
                this.get('route').transitionToRoute('cooperative-edit');
            } else {
                this.get('route').transitionToRoute('producer-edit');
            }
        },
        saveCooperative() {
            if (this.get('userType') === "admin") {
                let cooperative = this.get('model.cooperative');
                cooperative.save().then(saved => {
                    this.get('route').transitionToRoute('dashboard-overview');
                }).catch(err => {
                    console.error(err);
                })
            } else {
                let producer = this.get('model.producer');
                producer.save().then(saved => {
                    this.get('route').transitionToRoute('producer-dashboard-overview');
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }

});
