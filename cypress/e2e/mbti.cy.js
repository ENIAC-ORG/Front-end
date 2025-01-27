describe("Login Page Tests", () => {
    before(() => {
      it("Logs in successfully with valid credentials", () => {
        
      });
    });
    it("glasser test", () => {
      cy.visit("/Signup");
  
        cy.get(".email1_input").type("patient_test@gmail.com");
        cy.get(".password1_input").type("zahra1212");
        cy.get("[data-cy=enter]").click();
        cy.contains("باشه").click();
  
      cy.visit("/TestPage");
  
      cy.get("[data-testid='start']").eq(2).click();
      cy.contains("شروع آزمون").click();
      for (let i = 0; i < 24; i++) {
          cy.get('[datatest-id="test-glasser"] li').first().click();
          cy.contains("بعدی").click();
      }
      cy.get('[datatest-id="test-glasser"] li').first().click();
      cy.contains("پایان آزمون").click();
    });
  });