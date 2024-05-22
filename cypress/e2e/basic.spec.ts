context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url().should('eq', 'http://localhost:5173/')

    cy.contains('[Home Layout]').should('exist')

    cy.get('#input')
      .type('Vitesse{Enter}')
      .url()
      .should('eq', 'http://localhost:5173/hi/Vitesse')

    cy.contains('[Default Layout]').should('exist')

    cy.get('.btn').click().url().should('eq', 'http://localhost:5173/')
  })

  it('markdown', () => {
    cy.get('[data-test-id="about"]')
      .click()
      .url()
      .should('eq', 'http://localhost:5173/about')
  })
})
