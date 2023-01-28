describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluuk')
      cy.get('#password').type('salai')
      cy.get('#login').click()
      cy.contains('Wrong username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('cy-title')
      cy.get('#author').type('cy-author')
      cy.get('#url').type('cy-url')
      cy.contains('create').click()

      cy.contains('A new blog cy-title by cy-author added')
      cy.contains('cy-title cy-author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title cy custom command createBlog',
          author: 'author cy custom command createBlog',
          url: 'url cy custom command createBlog'
        })
      })

      it('it can be liked', function () {
        cy.contains('title cy custom command createBlog')
          .parent()
          .contains('view')
          .click()
        cy.contains('Like')
          .click()

        cy.contains('Blog updated')
        cy.contains('1')
      })

      it('can be deleted by the user who created it', function () {
        cy.contains('title cy custom command createBlog')
          .parent()
          .contains('view')
          .click()
        cy.contains('remove')
          .click()

        cy.contains('Blog removed')
        cy.get('html').should('not.contain', 'title cy custom command createBlog')
      })

      it('fails delete if user did not create the blog', function () {
        const user = {
          name: 'beto ales',
          username: 'beto',
          password: 'beto'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')

        cy.contains('Log out').click()
        cy.login({ username: 'beto', password: 'beto' })

        cy.contains('title cy custom command createBlog')
          .parent()
          .contains('view')
          .click()

        cy.contains('title cy custom command createBlog')
          .parent()
          .should('not.contain', 'remove')
      })
    })
    describe('blogs are ordered by likes', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'beto ales',
          url: 'lastex.com',
        })
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'beto ales',
          url: 'lastex.com',
        })
        cy.createBlog({
          title: 'The title with the less likes',
          author: 'beto ales',
          url: 'lastex.com',
        })
      })

      it('in ascending order', function() {
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).should('contain', 'The title with the most likes')
        cy.get('.div-details').eq(1).contains('Like').click()
        cy.contains('Blog updated')
        cy.get('.div-details').eq(0).contains('1')
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.div-details').eq(0).contains('Like').click()
        cy.contains('Blog updated')
        cy.get('.div-details').eq(0).contains('2')

        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.div-details').eq(1).contains('Like').click()
        cy.contains('Blog updated')
        cy.get('.div-details').eq(1).contains('1')

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the less likes')
      })
    })
  })
})
