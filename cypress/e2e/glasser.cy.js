describe("Login Page Tests", () => {
  before(() => {
    it("Logs in successfully with valid credentials", () => {
      cy.visit("/Signup");

      cy.get(".email1_input").type("patient_test@gmail.com");
      cy.get(".password1_input").type("zahra1212");
      cy.get("[data-cy=enter]").click();
    });
  });

  it("glasser test", () => {
    cy.visit("/Signup");
    cy.get(".email1_input").type("patient_test@gmail.com");
    cy.get(".password1_input").type("zahra1212");
    cy.get("[data-cy=enter]").click();
    cy.contains("باشه").click();
    cy.visit("/TestPage");

    cy.contains("شروع").click();
    cy.contains("شروع").click();
    for (let i = 0; i < 69; i++) {
      cy.get('[data-testid="mbti-test"] li').first().click();
      cy.contains("بعدی").click();
    }
    cy.get('[data-testid="mbti-test"] li').first().click();
    cy.contains("پایان").click();
  });
});