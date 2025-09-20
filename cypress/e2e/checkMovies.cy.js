describe('Movie page functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/auth/login')

        cy.url().should('include', '/login')
        cy.get('#loginForm').should('exist')

        cy.get('#email').type('test@test.com')
        cy.get('#password').type('abc')
        cy.get('#loginButton').click()

        cy.url().should('include', '/')
        cy.get('#rightPosterHundredsOfBeavers').click()
        cy.url().should('include', '/movies')
        cy.get('#movieCard').should('exist')
    });

    it('check if movie has detail page', () => {
        cy.url().should('include', '/movies')
        cy.get('#viewDetailsButton').first().click()
        cy.url().should('include', '/movies/')
        cy.get('#movieDetailTitle').should('exist')
    });

    it('check if pagination works', () => {
        cy.url().should('include', '/movies')
        cy.get('#lastPageLink').click()
    });

    it('check if movie can be created', () => {
        cy.url().should('include', '/movies')
        cy.get('#createMovieButton').click()
        cy.url().should('include', '/movies/create')
        cy.get('#movieForm').should('exist')
        cy.get('#title').type('Test Movie')
        cy.get('#description').type('This is a test movie description.')
        cy.get('#release_year').type('2023')
        cy.get('#language_id').select('English')
        cy.get('#rental_duration').type('5')
        cy.get('#rental_rate').type('2.99')
        cy.get('#length').type('120')
        cy.get('#replacement_cost').type('19.99')
        cy.get('#rating').select('PG')
        cy.get('#special_features').select(['Trailers', 'Deleted Scenes'])
        cy.get('#category_id').select('Action')
        cy.get('#submitMovieButton').click()
        cy.url().should('include', '/movies')
        cy.get('#lastPageLink').click()
        // cy.get('#movieDetailTitle').last().should('have.text', 'Test Movie')

        cy.get('#viewDetailsButton').last().click()
        cy.url().should('include', '/movies/')
        cy.get('#movieDetailTitle').contains('Test Movie').should('exist')

    });
});