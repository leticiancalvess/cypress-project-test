const el = require('./elements').ELEMENTS;

class Register {
acessarCadastro() {
    cy.visit('http://localhost:3000/register');

}
preencherCadastro() {
  //cy.get busca um elemento
        //type insere um texto
        //it.skip ao invés do it => faz com que seja pausado o teste
        cy.get(el.name).type('Teste');
        cy.get(el.email).type('teste@gmail.com');
        cy.get(el.whatsapp).type('34988100000');
        cy.get(el.city).type('Araguari');
        cy.get(el.uf).type('MG');
        //routing - escutar onde a app esta se conectando com as conexoes http e serve pra criaçao de mocks
        //etapas: start server com o cy.server
        //criar rota com cy.route()
        //atribuir a um alias
        //esperar com cy.wait e fazer uma validação

        //cy.server() //inicia um servidor pra puxar respostas do cy.route e cy.request
        cy.route('POST', '**/ongs').as('postOng') //cria rotas pra monitorar uma determinada requisiçao e criar mocks. como n sabemos a rota colocamos **/ongs. as salva as rotas pra uma variavel
        cy.get('[data-cy=submit]').click();
        

}

validarCadastroComSucesso() {
 
    cy.wait('@postOng').then((xhr) => { 
        expect(xhr.status).be.eq(200);
        expect(xhr.response.body).has.property('id');
        expect(xhr.response.body.id).is.not.null;
    })
    

}}

export default new Register();