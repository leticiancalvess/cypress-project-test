const el = require('./elements').ELEMENTS

class NewIncident {

    preencherCadastroDeCaso() {
        cy.get(el.title).type('teste');
        cy.get(el.description).type('teste cypress');
        cy.get(el.value).type(500);
       

        cy.route('POST', '**/incidents').as('newIncident');
        cy.get(el.buttonSave).click(); //sempre, antes do click, precisa informar qual rota queremos monitorar
    }

    validarCadastroDeCase() {
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
 
}

export default new NewIncident();