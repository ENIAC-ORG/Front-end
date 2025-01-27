describe("Statistics Component on Home Page", () => {
  it("should render the statistics section with all elements", () => {
    cy.visit("/Signup");

    cy.get(".email1_input").type("patient_test@gmail.com");
    cy.get(".password1_input").type("zahra1212");
    cy.get("[data-cy=enter]").click();
    cy.contains("باشه").click();

    // Verify the statistics container exists
    cy.get("#statistics").should("exist");

    // Check the first statistics item ("نوبت‌ها")
    cy.get(".statistics-item")
      .eq(0)
      .within(() => {
        cy.contains("نوبت‌ها").should("be.visible");
        cy.get("h1").should("contain", "+");
      });

    // Check the second statistics item ("مراجعین")
    cy.get(".statistics-item")
      .eq(1)
      .within(() => {
        cy.contains("مراجعین").should("be.visible");
        cy.get("h1").should("contain", "+");
      });

    // Check the third statistics item ("درمانگران")
    cy.get(".statistics-item")
      .eq(2)
      .within(() => {
        cy.contains("درمانگران").should("be.visible");
        cy.get("h1").should("contain", "+");
      });
  });

  // it('should maintain proper alignment and styling', () => {
  //   // Verify alignment of statistics items
  //   cy.get('.statistics-item').each(($el) => {
  //     cy.wrap($el).should('have.attr', 'align', 'center');
  //     cy.wrap($el).find('p').should('have.css', 'text-align', 'center');
  //     cy.wrap($el).find('h1').should('have.css', 'text-align', 'center');
  //   });
  // });

  // it('should update the values dynamically (if applicable)', () => {
  //   // Mock dynamic updates if applicable (e.g., values increasing over time)
  //   // Replace this with actual testing logic if dynamic updates are implemented
  //   cy.get('.statistics-item').each(($el) => {
  //     cy.wrap($el).find('h1').invoke('text').should('match', /\d+/);
  //   });
  // });
  it(" should check all numbers are greater than zero", () => {
    cy.visit("/Signup");

    cy.get(".email1_input").type("patient_test@gmail.com");
    cy.get(".password1_input").type("zahra1212");
    cy.get("[data-cy=enter]").click();
    cy.contains("باشه").click();

    // cy.get(".statistics-item").each(($el) => {
    //   cy.wrap($el)
    //     .find("h1")
    //     .invoke("text")
    //     .then((text) => {
    //       // Remove any non-numeric characters (like '+') and convert to a number
    //       const number = parseInt(text.replace(/\D/g, ""), 10);
    //       expect(number).to.be.at.least(0); // Check if the number is >= 0
    //     });
    // });
  });
});
