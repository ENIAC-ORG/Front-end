describe("Landing Page E2E Tests", () => {
  beforeEach(() => {
    // Navigate to the Landing page
    cy.visit("/Landing"); // Adjust the route if Landing page is not the root route
  });


  it("should display the welcome message and starter button", () => {
    // Verify the welcome message
    cy.contains("به اینیاک خوش آمدید!").should("be.visible");

    // Verify the starter button and test navigation
    cy.get("button.button-28").contains("شروع کنید!").click();
    cy.url().should("include", "/Home");
  });

  it("should display the main sections with images and content", () => {
    // Check the first card section
    cy.contains("پزشک مورد نیاز شما، در کمترین زمان ممکن!").should(
      "be.visible"
    );
    

    // Check the second card section
    cy.contains(
      "یک قدم تا آرامش ذهنی؛ همین حالا وقت مشاوره خود را آنلاین رزرو کنید!"
    ).should("be.visible");
    

    // Check the third card section
    cy.contains(
      "تست‌های روان‌شناسی اینیاک: اولین گام به سوی شناخت بهتر خود و آرامش ذهنی!"
    ).should("be.visible");
    

    // Check the fourth card section
    cy.contains("دکترهای متخصص روان‌شناسی، همیشه در دسترس شما!").should(
      "be.visible"
    );
    
  });

  it("should allow user to click the final starter button", () => {
    // Verify the final starter message
    cy.contains(
      "همین حالا ثبت‌نام کنید و اولین گام را به سوی سلامت روان و آرامش بردارید"
    ).should("be.visible");

    // Verify the button navigation
    cy.get(".p-custom button.button-28").contains("شروع کنید!").click();
    cy.url().should("include", "/Home");
  });
});
