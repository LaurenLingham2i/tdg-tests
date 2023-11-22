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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
    cy.get("#email-input").type(username);
    cy.get("#password-input").type(password);
    cy.contains("Login").click();
});

Cypress.Commands.add("generateFromExistingTemplate", (templateName) => {
    cy.contains("DATA").click();
    cy.get("select").select(templateName);
    cy.get("#submit-template").click();
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
});

Cypress.Commands.add("selectMultipleDataTypesFromDropdown", (dataType, indexesToSelect) => {
    cy.get(dataType).click();
    let count = 0; // Negates the effect of the item being removed from the list (indexes all decreasing by 1)
    for (let item of indexesToSelect) {
        cy.get(`${dataType} .optionListContainer .optionContainer li`).eq(`${item - count}`).click();
        count++;
    }
});
