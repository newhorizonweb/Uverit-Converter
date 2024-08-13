


export const baseUrl = Cypress.config().baseUrl;

export const device = {
    mobile: { width: 380, height: 850 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
};

export const setViewport = (viewport: { width: number; height: number }) => {
    const { width, height } = viewport;
    cy.viewport(width, height);
};