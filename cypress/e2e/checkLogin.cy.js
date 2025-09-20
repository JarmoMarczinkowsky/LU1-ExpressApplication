describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/auth/login')
        cy.url().should('include', '/login')
        cy.get('#loginForm').should('exist')
        cy.get('#email').type('test@test.com')
        cy.get('#password').type('abc')
        cy.get('#loginButton').click()
        cy.url().should('include', '/')
    });

    it('check if user can logout', () => {
        cy.url().should('include', '/')
        cy.get('#logoutButton').click()
        cy.url().should('include', '/login')
    });
});