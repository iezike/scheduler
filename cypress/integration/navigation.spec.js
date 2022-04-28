describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("Tuesday should have background color white when selected", () => {
    cy.contains("li", "Tuesday").click().should("have.css", "background-color", "rgb(242, 242, 242)");
  })
});

