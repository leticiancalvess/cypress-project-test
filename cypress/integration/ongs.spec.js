/// <reference types="cypress" /> 

import '../support/commands'


describe('Ongs', () => {
    it('deve poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        //cy.get busca um elemento
        //type insere um texto
        //it.skip ao invés do it => faz com que seja pausado o teste

        cy.get('[data-cy=name]').type('Teste');
        cy.get('[data-cy=email]').type('teste@gmail.com');
        cy.get('[data-cy=whatsapp]').type('34988100000');
        cy.get('[data-cy=city]').type('Araguari');
        cy.get('[data-cy=uf]').type('MG');
        //routing - escutar onde a app esta se conectando com as conexoes http e serve pra criaçao de mocks
        //etapas: start server com o cy.server
        //criar rota com cy.route()
        //atribuir a um alias
        //esperar com cy.wait e fazer uma validação

        //cy.server() //inicia um servidor pra puxar respostas do cy.route e cy.request
        cy.route('POST', '**/ongs').as('postOng') //cria rotas pra monitorar uma determinada requisiçao e criar mocks. como n sabemos a rota colocamos **/ongs. as salva as rotas pra uma variavel

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then((xhr) => { 
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    });
    it('deve poder realizar um login no sistema', () => {

        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });

    it('deve poder fazer logout', () => {
      
        cy.login();
        cy.get('button').click();


    });

    it('deve poder cadastrar novos casos', () => {
        cy.login();
        cy.get('.button').click();
        cy.get('[placeholder="Título do caso"]').type('teste');
        cy.get('textarea').type('teste cypress');
        cy.get('[placeholder="Valor em reais"]').type(500);
       

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get('.button').click(); //sempre, antes do click, precisa informar qual rota queremos monitorar

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    })
    it('deve poder excluir um caso', () => {
        cy.createNewIncident(); //pra deletar é preciso estar logado e com um caso feito
    
        cy.login();

        //DELETE 204 locahost:3333/incidents/43

        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get('li > button > svg').click();
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    })
}); //coloca o que está testando, cada it vai ser um teste.
