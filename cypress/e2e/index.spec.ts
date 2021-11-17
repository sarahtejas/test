/// <reference types="Cypress" />

describe('Index', () => {
  beforeEach(() => {
    cy.server();
  });

  it(`allows user to land on the page with the org picker modal open`, () => {
    cy.visit('/');
    cy.get(`[data-cy='hello-world']`);
  });
});
