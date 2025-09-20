describe('Movie edit functionality', () => {
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

    it('check if movie can be edited', () => {
        cy.url().should('include', '/movies')

        cy.visit('http://localhost:3000/movies/edit/1022')
        cy.url().should('include', '/movies/edit/')
        cy.get('#movieForm').should('exist')
        cy.get('#title').clear().type('Edited Test Movie')
        cy.get('#description').clear().type('This is an edited test movie description.')
        cy.get('#release_year').clear().type('2024')
        cy.get('#language_id').select('French')
        cy.get('#rental_duration').clear().type('7')
        cy.get('#rental_rate').clear().type('3.99')
        cy.get('#length').clear().type('130')
        cy.get('#replacement_cost').clear().type('24.99')
        cy.get('#rating').select('PG-13')
        cy.get('#special_features').select(['Behind the Scenes', 'Commentaries'])
        cy.get('#category_id').select('Comedy')
        cy.get('#submitMovieButton').click()
        cy.url().should('include', '/movies');
    });
});