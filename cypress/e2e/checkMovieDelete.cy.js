describe('Movie delete functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/auth/login')
        cy.url().should('include', '/login')
        cy.get('#loginForm').should('exist')
        cy.get('#email').type('test@test.com')
        cy.get('#password').type('abc')
        cy.get('#loginButton').click()
        cy.url().should('include', '/')
        cy.visit('http://localhost:3000/movies')
        cy.url().should('include', '/movies')
        cy.get('#movieCard').should('exist')
    });

    it('check if movie can be deleted', () => {
        cy.url().should('include', '/movies')
        cy.get('#lastPageLink').click()
        // cy.get('#movieCardImageContainer').last().trigger('mouseover') // Hover over the image container
        
        // cy.wait(500); // Wait for half a second to ensure the button is visible
        cy.get("#editMovieLink").last().click({ force: true });   // Wait for the edit button to appear and click it
        cy.url().should('include', '/movies/edit/')
        cy.get('#delete-movie').should('exist').click()
        cy.url().should('include', '/movies')
    });
});