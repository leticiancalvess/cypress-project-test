/// <reference types="cypress" /> 

import '../support/commands'
import Logon from '../support/Pages/Logon'
import Register from '../support/Pages/Register'
import Profile from '../support/Pages/Profile'
import NewIncident from '../support/Pages/NewIncident';




describe('Ongs', () => {
    it('deve poder realizar um cadastro', () => {

        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroComSucesso();
        })

    });

    it('deve poder realizar um login no sistema', () => {

       Logon.acessarLogin();
       Logon.preencherLogin();

    });

    it('deve poder cadastrar novos casos', () => {

        cy.login();
        Profile.clicarBotaoCadastrarNovosCasos();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCase();

    })
    it('deve poder excluir um caso', () => {
        cy.createNewIncident(); //pra deletar é preciso estar logado e com um caso feito
    
        cy.login();

        //DELETE 204 locahost:3333/incidents/43
        Profile.clicarNoBotaoExcluirUmCaso();
        Profile.validarExclusaoDeCasoComSucesso();
      
       
    })
    it('deve poder fazer logout', () => {

        cy.login();
        Profile.clicarNoBotaoLogout();

    });


