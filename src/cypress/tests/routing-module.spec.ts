describe("AppRoutingModule", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the home component when the root path is accessed", () => {
    cy.location("pathname").should("eq", "/");
    cy.get("app-home").should("exist");
  });

  it("should navigate to the not found component when an unknown path is accessed", () => {
    cy.visit("/unknown");
    cy.location("pathname").should("eq", "/404");
    cy.get("app-not-found").should("exist");
  });
});
