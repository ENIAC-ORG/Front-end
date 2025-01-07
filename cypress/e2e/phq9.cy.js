describe("Login Page Tests", () => {
  before(() => {
    it("Logs in successfully with valid credentials", () => {
      cy.visit("/Signup");

      cy.get(".email1_input").type("dehghanzahra1400@gmail.com");
      cy.get(".password1_input").type("Z82F84r87");
      cy.get("[data-cy=enter]").click();

    });
  });

  it("phq9 test", () => {
    cy.visit("/Phq9");
    //cy.contains("تقریباً هرروز").click();
    //cy.contains("شروع آزمون").click();
    // for (let i = 0; i < 7; i++) {
    //   cy.contains("تقریباً هرروز").click();
    //   cy.contains("بعدی").click();
    // }
    // cy.contains("تقریباً هرروز").click();
    // cy.contains("پایان آزمون").click();
  });
});
