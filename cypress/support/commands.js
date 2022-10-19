// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


//criar comandos customizados
Cypress.Commands.add("createOng", () => {
    cy.request({ 
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: 'teste',
            email: 'teste@gmail.com',
            whatsapp: '349855226525',
            city: 'araguari',
            uf: 'MG'

        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id); 

        Cypress.env('createdOngId', response.body.id) //cria variavel de ambiente temporaria pra ser usada durante o teste
    }) 
})

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/profile', { 
        onBeforeLoad: (browser)=> {
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'));
            browser.localStorage.setItem('ongName', Cypress.env('teste'));
        } //antes da pagina carregar, interage com o browser
       })
})