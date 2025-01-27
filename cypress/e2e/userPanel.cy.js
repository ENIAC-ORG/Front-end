
describe("user panel Page Tests", () => {
   
  
    it("should test user panel", () => {
      cy.visit("/Signup");
  
      cy.get(".email1_input").type("patient3@gmail.com");
      cy.get(".password1_input").type("zahra121233");
      cy.get("[data-cy=enter]").click();
      cy.contains("باشه").click();
  
      cy.visit("/User_panel");
      cy.get('h1').contains('اطلاعات شخصی');
      
          // Visit the page or component where the bio rows are located
         
      
          // Define the expected values for each bio-row
          const expectedTexts = [
            'نام : هلیا',
            'نام خانوادگی : شمس زاده',
            'جنسیت: مونث',
            'تاریخ تولد: ۱۳۸۱/۱۲/۱۲',
            'شماره همراه : ۰۹۳۳۳۱۸۳۸۹۸',
            'ایمیل : patient3@gmail.com',
          ];
      
          // Loop through each bio-row and check the text
          cy.get('.bio-row').each(($bioRow, index) => {
            if(index<6){
            // Get the text content of each .bio-row
            cy.wrap($bioRow)
              .invoke('text') // Get the raw text
              .should('include', expectedTexts[index]); // Check if it includes the expected text
            }
          });
        });
      });
      

      
  