describe('app', () => {
  it('Homepage Loads', () => {
    cy.visit('/');
  });

  it('Booking Modal iFrame Loads', () => {
    cy.visit('/')
      .getByText(/Book a Session/i)
      .click()
      .get('iframe');
  });

  it('Booking iFrame Modal Closes', () => {
    cy.visit('/')
      .getByText(/Book a Session/i)
      .click()
      .get('[data-test="close-modal"')
      .click();
  });
});
