

describe('Routing', () => {

    const baseUrl = Cypress.config().baseUrl;

    const device = {
        mobile: { width: 380, height: 850 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1920, height: 1080 },
    };

    const setViewport = (viewport: { width: number; height: number }) => {
        const { width, height } = viewport;
        cy.viewport(width, height);
    };

    it('should navigate to the home page', () => {
        cy.visit('/');
        cy.url().should('eq', `${baseUrl}/`);
    });

    it('should navigate to the popular length page', () => {
        cy.visit('/length/popular');
        cy.url().should('eq', `${baseUrl}/length/popular`);
    });

    it('should redirect to the 404 page if it is not found', () => {
        cy.visit('/spatial/certainlydoesnotexist');
        cy.get('[data-testid="not-found"]').should('be.visible');
    });

    it('should switch to the microscopic length page', () => {
        setViewport(device.desktop);
        cy.visit('/');

        // Nav-links is set to be visible on parent hover in css
        // This applies the same styles
        cy.get('[data-testid="nav-links-length"]')
        .invoke('css', 'opacity', '1')
        .invoke('css', 'pointer-events', 'all');

        cy.get('[data-testid="link-microscopic"]').click();
        cy.url().should('eq', `${baseUrl}/length/microscopic`);
    });

    it('should switch to the microscopic length page - on mobile', () => {
        setViewport(device.mobile);
        cy.visit('/');

        cy.get('[data-testid="burger-btn"]').click();
        cy.get('[data-testid="mobile-nav-btn-length"]').click();
        cy.get('[data-testid="mobile-link-microscopic"]').click();

        cy.url().should('eq', `${baseUrl}/length/microscopic`);
    });

});