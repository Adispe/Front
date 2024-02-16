describe("GoogleMapsComponent", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the component is rendered at the root URL
  });

  it("should display autocomplete options based on user input", () => {
    cy.get("input").type("10 rue"); // Simulate user input

    cy.get(".mat-option").should("have.length", 1); // Verify that only one option is displayed
    cy.get(".mat-option").should("contain", "10 rue due Périgord"); // Verify the displayed option
  });

  it("should zoom in when the zoomIn button is clicked", () => {
    cy.get(".zoom-in-button").click();

    cy.get(".zoom-level").should("contain", "13"); // Verify that the zoom level is incremented
  });

  it("should zoom out when the zoomOut button is clicked", () => {
    cy.get(".zoom-out-button").click();

    cy.get(".zoom-level").should("contain", "11"); // Verify that the zoom level is decremented
  });
});
