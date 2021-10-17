describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.location('pathname', { timeout: 5000 }).should('include', '/login');
    cy.contains('Welcome');
    cy.get('input[aria-labelledby=email-input-label]').type(
      'johndoe@gmail.com'
    );
    cy.get('input[aria-labelledby=password-input-label]').type('test123');
    cy.get('app-button').click();
    cy.location('pathname', { timeout: 5000 }).should('include', '/');
  });
});
