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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("checkA11yCustom", () => {
  cy.window({ log: false })
    .then(window => {
      return window.axe.run(window.document, {
        rules: {
          "color-contrast": { enabled: false }
        }
      });
    })
    .then(({ violations }) => {
      if (violations.length) {
        cy.wrap(violations, { log: false }).each(v => {
          Cypress.log({
            name: "a11y error!",
            consoleProps: () => v,
            message: `${v.id} on ${v.nodes.length} Node${
              v.nodes.length === 1 ? "" : "s"
            }`
          });
        });
      }
      return cy.wrap(violations, { log: false });
    })
    .then(violations => {
      assert.equal(
        violations.length,
        0,
        `${violations.length} accessibility violation${
          violations.length === 1 ? "" : "s"
        } ${violations.length === 1 ? "was" : "were"} detected`
      );
    });
});

Cypress.Commands.add("injectCircleToken", () => {
  cy.window({ log: false }).then(win => {
    const TOKEN = Cypress.env("CIRCLE_TOKEN");

    if (!TOKEN) {
      throw new Error(
        'Cypress needs your CIRCLE_TOKEN to authenticate. Prefix your "yarn run test:e2e:*" command with your token like so "CYPRESS_CIRCLE_TOKEN=[YOUR_TOKEN] yarn test:e2e:dev"'
      );
    }

    if (!Cypress.env("GITHUB_REPO_PAGE_COUNT")) {
      throw new Error(`
    We need GITHUB_REPO_PAGE_COUNT to determine how many pages of repos to
    wait for. Naviagate to localhost:3000 and see the maximum page number
    made to https://circleci.com/api/v1.1/user/repos/github your
    CIRCLE_TOKEN results in.`);
    }

    win.localStorage.setItem("CIRCLE_TOKEN", Cypress.env("CIRCLE_TOKEN"));
  });
});

// Replace window.fetch if it exists. This allows us to
// stub out requests that are made through window.fetch
// https://github.com/cypress-io/cypress/issues/95
Cypress.on("window:before:load", win => {
  delete win.fetch;
});
