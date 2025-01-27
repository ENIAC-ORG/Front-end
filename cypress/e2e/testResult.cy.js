describe('Glasser Test UI', () => {
   
  
    it('should display Glasser Test results correctly', () => {
      // Wait for the API to load
      cy.visit("/Signup");

    cy.get(".email1_input").type("patient3@gmail.com");
    cy.get(".password1_input").type("zahra121233");
    cy.get("[data-cy=enter]").click();
    cy.contains("باشه").click();

    cy.visit("/TestResult");
  
      // Verify that the list is rendered
      cy.get('ul')
        .should('exist');
  
      // Expected data and styles
      const expectedResults = {
        love: { label: 'عشق', value: 2.3, color: 'rgb(255, 0, 0)' }, // IoHeart style
        survive: { label: 'بقا', value: 4.5, color: 'rgb(0, 128, 0)' }, // GiPlantRoots style
        freedom: { label: 'آزادی', value: 1.6, color: 'rgb(0, 0, 255)' }, // GiFreedomDove style
        power: { label: 'قدرت', value: 3.4, color: 'rgb(239, 228, 176)' }, // GiStrong style
        fun: { label: 'سرگرمی', value: 4.8, color: 'rgb(179, 65, 235)' }, // GiLaserSparks style
      };
      cy.wait(1000);
      // Check each <li> element
      cy.get('li').eq(0).get('span').contains('عشق');
      cy.get('li').eq(1).get('span').contains('بقا');
      cy.get('li').eq(2).get('span').contains('آزادی');
      cy.get('li').eq(3).get('span').contains('قدرت');
      cy.get('li').eq(4).get('span').contains('سرگرمی');
      cy.get('h5').contains('واسطه');
      cy.get('p').contains("INFP");
      

      });
    });