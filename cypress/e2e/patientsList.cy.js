
describe("patient list Tests", () => {
    
    it("glasser test", () => {
      cy.visit("/Signup");
  
        cy.get(".email1_input").type("doctor1@gmail.com");
        cy.get(".password1_input").type("doctor1/");
        cy.get("[data-cy=enter]").click();
        cy.contains("باشه").click();
  
      cy.visit("/PatientsList");
    
      //cy.get('.team-name .text-center .py-3').should('have.length', 7);

    // Define the expected `h4` and `p` values for each `.team-name` div
    const expectedValues = [
      { h4: 'مریض اول', p: '0225530654' },
      { h4: 'هلیا شمس زاده', p: '0150267665' },
      { h4: 'مجتبی جعفری', p: '0150267765' },
      { h4: 'زهرا قوی', p: '0150394209' },
      { h4: 'سارا سارایی', p: '0226684935' },
      { h4: 'مریض دهم', p: '0025482040' },
      { h4: 'زهرا عباسقلی', p: '5560742996' },
    ];

    // Loop through each `.team-name` div and verify `h4` and `p` text
    cy.get(".team-name").each(($el, index) => {
      // Check the `h4` text
      cy.wrap($el).find('h4').should('have.text', expectedValues[index].h4);

      // Check the `p` text
      cy.wrap($el).find('p').should('have.text', expectedValues[index].p);
    });
  });
});