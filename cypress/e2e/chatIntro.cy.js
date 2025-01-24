describe("Chat_Intro Component", () => {
  beforeEach(() => {
    cy.visit("/Home");
  });

  it("should render the component with all elements", () => {
    cy.contains("گفت‌وگو کنید،").should("be.visible");
    cy.contains("احساس بهتری داشته باشید").should("be.visible");
    cy.contains("ما می‌دانیم که صحبت کردن درباره احساسات و افکار").should(
      "be.visible"
    );
    cy.contains("چت پشتیبانی هوشمند ما به صورت ۲۴ ساعته و ۷ روز هفته").should(
      "be.visible"
    );
    cy.contains("پشتیبانی محرمانه و همدلانه در کنار شماست!").should(
      "be.visible"
    );
    cy.get("button.button-17").should("be.visible").and("contain", "شروع چت");
    cy.get("img.singlechat-img").should("be.visible");
    cy.contains("دسترسی در هر زمان و هر مکان").should("be.visible");
    cy.contains("پاسخ‌های همدلانه برای بهتر شنیده شدن").should("be.visible");
    cy.contains("گفت‌وگوی خصوصی و امن").should("be.visible");
  });

  it("should navigate to the chat page when the button is clicked", () => {
    cy.get("button.button-17").click();
    cy.url().should("include", "/chat");
  });

  it("should have correct styles applied", () => {
    cy.get(".bg-singlechat-custom").should("exist");
    cy.get("button.button-17").should("have.class", "font-custom");
    cy.get(".singlechat-img").should("be.visible");
  });

  it("should support RTL layout", () => {
    cy.get(".ww").should("have.attr", "dir", "rtl");
  });

  it("should render the introductory bubbles correctly", () => {
    cy.get(".singlechat-bubble").should("have.length", 3);
    cy.get(".singlechat-bubble")
      .eq(0)
      .should("contain", "دسترسی در هر زمان و هر مکان");
    cy.get(".singlechat-bubble")
      .eq(1)
      .should("contain", "پاسخ‌های همدلانه برای بهتر شنیده شدن");
    cy.get(".singlechat-bubble")
      .eq(2)
      .should("contain", "گفت‌وگوی خصوصی و امن");
  });
});
