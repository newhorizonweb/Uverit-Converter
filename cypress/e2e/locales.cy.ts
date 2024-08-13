


import { baseUrl, device, setViewport } from "../support/setup";

describe('Locales', () => {

    it('changes the application to german and displays the correct heading text', () => {
        setViewport(device.desktop);
        cy.visit('/');

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Deutsch"]').click();
        cy.get('.tile-name-heading').contains(/Länge/i).should('exist');
    });

    it('changes the application to italian and displays the correct heading text', () => {
        cy.visit('/');
        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Italiano"]').click();
        cy.get('.tile-name-heading').contains(/Fisica/i).should('exist');
    });

    it('changes the application from Polish to French and displays the correct link tile text', () => {
        cy.visit('/');

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Polski"]').click();

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Français"]').click();

        cy.get('[data-testid="tile-link-common"] h3').contains(/Commun/i).should('exist');
    });

    it('chooses German, switches the page, and checks for the correct heading', () => {
        setViewport(device.mobile);
        cy.visit('/');
        
        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Deutsch"]').click();

        cy.get('[data-testid="burger-btn"]').click();
        cy.get('[data-testid="mobile-nav-btn-length"]').click();
        cy.get('[data-testid="mobile-link-microscopic"]').click();

        cy.get('.page-heading-text').contains(/mikroskopisch/i).should('exist');
    });

    it('chooses Spanish, switches the page, switches to English, and checks for the correct heading', () => {
        setViewport(device.mobile);
        cy.visit('/');

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Español"]').click();

        cy.get('[data-testid="burger-btn"]').click();
        cy.get('[data-testid="mobile-nav-btn-length"]').click();
        cy.get('[data-testid="mobile-link-common"]').click();

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-English"]').click();

        cy.get('.page-heading-text').contains(/common/i).should('exist');
    });

    it('chooses English, switches the page, switches to Polish, and checks for the correct heading', () => {
        setViewport(device.mobile);
        cy.visit('/');

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-English"]').click();

        cy.get('[data-testid="burger-btn"]').click();
        cy.get('[data-testid="mobile-nav-btn-length"]').click();
        cy.get('[data-testid="mobile-link-common"]').click();

        cy.get('[data-testid="lang-switch"]').click();
        cy.get('[data-testid="lang-switch-Polski"]').click();

        cy.get('.page-heading-text').contains(/Powszechna/i).should('exist');
    });

});