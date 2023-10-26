describe("GoogleApiService", () => {
  it("should create a new location", () => {
    cy.intercept("POST", "**/location/create").as("createLocation");

    cy.visit("/"); // Assuming the component using the service is rendered at the root URL

    // Simulate creating a new location
    cy.get("#createLocationButton").click();

    cy.wait("@createLocation").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.request.body).to.deep.equal({
        /* locationData */
      });
    });
  });

  it("should get location by ID", () => {
    const locationId = "locationId";

    cy.intercept(`GET`, `**/location/${locationId}`).as("getLocation");

    cy.visit("/"); // Assuming the component using the service is rendered at the root URL

    // Simulate getting location by ID
    cy.get("#getLocationButton").click();

    cy.wait("@getLocation").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.request.url).to.contain(`/location/${locationId}`);
    });
  });

  it("should update a location", () => {
    const locationId = "locationId";

    cy.intercept(`PUT`, `**/location/${locationId}`).as("updateLocation");

    cy.visit("/"); // Assuming the component using the service is rendered at the root URL

    // Simulate updating a location
    cy.get("#updateLocationButton").click();

    cy.wait("@updateLocation").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.request.url).to.contain(`/location/${locationId}`);
      expect(interception.request.body).to.deep.equal({
        /* updatedData */
      });
    });
  });

  it("should delete a location", () => {
    const locationId = "locationId";

    cy.intercept(`DELETE`, `**/location/${locationId}`).as("deleteLocation");

    cy.visit("/"); // Assuming the component using the service is rendered at the root URL

    // Simulate deleting a location
    cy.get("#deleteLocationButton").click();

    cy.wait("@deleteLocation").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.request.url).to.contain(`/location/${locationId}`);
    });
  });
});
