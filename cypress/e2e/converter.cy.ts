


import { baseUrl, device, setViewport } from "../support/setup";

describe('Converter', () => {

    beforeEach(() => {
        cy.visit('/length/microscopic');
    });

    it('should navigate to the microscopic length page', () => {
        cy.url().should('eq', `${baseUrl}/length/microscopic`);
    });

    it('should have exponential notation enabled by default', () => {
        cy.get('[data-testid="exponential-btn"]')
            .should('have.class', 'expo-enabled');
    });

    it('converts nanometers to planck length and switches the units', () => {

        // Yoctometer
        cy.get('[data-testid="units-input"]').select('1e-24');

        // Planck Length
        cy.get('[data-testid="units-output"]').select('1.61625518181818181818e-35');

        cy.get('[data-testid="user-choice"]').select('5', { force: true });
        cy.get('[data-testid="value-input"]').type('1234567');
        cy.get('[data-testid="switch-units"]').click();

        cy.get('[data-testid="result-txt"]')
            .should('contain', '1.99538e-5');
    });

    it('switches off the exponential notation', () => {

        // lQCD
        cy.get('[data-testid="units-input"]').select('2.103089103355592e-16');

        // Classical electron radius
        cy.get('[data-testid="units-output"]').select('2.81794028531313131313e-15');

        cy.get('[data-testid="exponential-btn"]').click();
        cy.get('[data-testid="user-choice"]').select('8', { force: true });
        cy.get('[data-testid="value-input"]').type('5.64');

        cy.get('[data-testid="result-txt"]')
            .should('contain', '0.42092526');
    });

    it('should switch to the common length page (mobile) and convert yards to centimeters', () => {
        setViewport(device.mobile);

        // Cypress thinks select elements do not have options
        // and the value input is covered by the navigation
        // I DO NOT CARE - force: true, 2024

        // Switch the page
        cy.get('[data-testid="burger-btn"]').click();
        cy.get('[data-testid="mobile-nav-btn-length"]').click();
        cy.get('[data-testid="mobile-link-common"]').click();

        // Yard
        cy.get('[data-testid="units-input"]').select('0.9144', { force: true });

        // Centimeter
        cy.get('[data-testid="units-output"]').select('1e-2', { force: true });

        cy.get('[data-testid="user-choice"]').select('3', { force: true });
        cy.get('[data-testid="value-input"]').type('128.64', { force: true });

        // Also checks the rounding from 11762.8416
        cy.get('[data-testid="result-txt"]')
            .should('contain', '11762.842');
    });
    
});