describe('Login Component Tests', () => {
  beforeEach(() => {
    // Assuming your app is served at localhost:4200
    cy.visit('http://localhost:4200');
  });

  it('should redirect to login page', () => {
    cy.get('.example-container').should('exist');
    cy.get('form').should('exist');
    cy.get('h2').should('contain.text', 'Log In');
  });

  it('should display username and password input fields', () => {
    cy.get('[formControlName=username]').should('exist');
    cy.get('[formControlName=password]').should('exist');
  });

  it('should display error messages for invalid form submission', () => {
    cy.get('form').submit();
    cy.get('[formControlName=username]').click().blur(); 
    cy.get('mat-error').should('contain.text', 'Please enter Username');
    cy.get('[formControlName=password]').click().blur();
    cy.get('mat-error').should('contain.text', 'Please enter Password');
  });

  it('should enable submit button when the form is valid', () => {
    cy.get('[formControlName=username]').type('testuser');
    cy.get('[formControlName=password]').type('testpassword');
    cy.get('button[type=submit]').should('not.be.disabled');
  });

  it('should display registration link', () => {
    cy.get('h4').should('contain.text', "Don't have an account?");
    cy.get('a[color=primary]').should('contain.text', 'Register');
  });
});
