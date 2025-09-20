describe('Homepage functionality', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

    it('Check if login button exists on homepage', () => {
      cy.get('#homeLoginButton').should('exist')
    });
    
    it('Login with valid credentials', () => {
      
      cy.get('#homeLoginButton').click()
      cy.url().should('include', '/login')
      cy.get('#loginForm').should('exist')

      cy.get('#email').type('test@test.com')
      cy.get('#password').type('abc')
      cy.get('#loginButton').click()

      cy.url().should('include', '/')
    });
});