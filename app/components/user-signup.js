import Component from '@ember/component';
import CNPJValidator from 'npm:@fnando/cnpj/dist/node';

export default Component.extend({

    viewShowing: "instructions",

    actions: {
        register() {
            var email = this.get('email');
            var cooperativeCNPJ = this.get('cooperativeCNPJ');
            var cooperativeName = this.get('cooperativeName');
            var model = this.get('model');
            var _this = this;
            if (email != undefined
                && cooperativeCNPJ != undefined
                && cooperativeName != undefined
                && email != ""
                && cooperativeCNPJ != ""
                && cooperativeName != "") {
                if (!CNPJValidator.isValid(cooperativeCNPJ)) alert('CNPJ Inválido');
                else {
                    model.getCooperativeByCNPJ(cooperativeCNPJ).then(cooperatives => {
                        var cooperativeAlreadyRegisted = cooperatives.content.length > 0
                        if (cooperativeAlreadyRegisted) {
                            //already exists
                            var cooperativeIsActive = cooperatives.content[0].__data.isActive;
                            if (cooperativeIsActive) {
                                alert('Cooperativa já cadastrada, se você esqueceu a senha, utilize a opções esqueci minha senha!')
                            } else {
                                alert('Cadastro da cooperativa já está em análise.\nAguarde e você receberá instruções de acesso por email após a aprovação do administrador do sistema.\n Obrigado!')
                            }
                        } else {
                            var newCooperative = model.newCooperative;
                            newCooperative.set('email', email);
                            newCooperative.set('cnpj', cooperativeCNPJ);
                            newCooperative.set('name', cooperativeName);
                            newCooperative.save()
                            alert('Cooperativa cadastrada com sucesso.\nVocê receberá instruções de acesso por email após a aprovação do administrador do sistema.\n Obrigado!');
                            _this.showLogin()
                        }
                    })
                }
            } else {
                alert("Entre todos os campos")
            }

        },
        show(itemToShow) {
            this.set('viewShowing', itemToShow);
        }
    }
});
