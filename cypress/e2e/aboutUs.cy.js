describe("درباره ما - صفحه", () => {
  beforeEach(() => {
    cy.visit("/Aboutus");
  });

  it('باید عنوان صفحه "همراه شما در مسیر رشد و آرامش" را نمایش دهد', () => {
    cy.contains("همراه شما در مسیر رشد و آرامش").should("be.visible");
  });

  it("باید توضیحات صفحه را نمایش دهد", () => {
    cy.contains(
      "با تیمی از متخصصین حرفه‌ای برای پشتیبانی و راهنمایی به سوی زندگی بهتر"
    ).should("be.visible");
  });

  it("باید لینک GitHub را نمایش دهد و بتوان به آن کلیک کرد", () => {
    cy.get('a[href="https://github.com/ENIAC-ORG"]')
      .should("have.attr", "href", "https://github.com/ENIAC-ORG")
      .and("be.visible");
  });

  it('باید متن بخش "مرکز مشاوره" را نمایش دهد', () => {
    cy.contains(
      "مرکز مشاوره ما با تیمی از روانشناسان و روانپزشکان حرفه‌ای"
    ).should("be.visible");
  });

  it('باید تصویر "Cinque Terre" را نمایش دهد', () => {
    cy.get('img[alt="Cinque Terre"]')
      .should("be.visible")
      .and("have.attr", "src")
      .should("include", "uab.edu");
  });

  it('باید دکمه "رزرو نوبت" را نمایش دهد و بتوان به آن کلیک کرد', () => {
    cy.contains("رزرو نوبت").should("be.visible").click();

    cy.url().should("include", "/Doctors");
  });

  it("باید تمامی دکمه‌های بخش گروه‌ها را نمایش دهد", () => {
    cy.contains("گروه روان پزشکان و پزشکان سلامت").should("be.visible");
    cy.contains("گروه زوج درمانگران").should("be.visible");
    cy.contains("گروه روان درمانگران فردی").should("be.visible");
    cy.contains("گروه مشاوره کودک").should("be.visible");
    cy.contains("واحد روان سنجی و پژوهش").should("be.visible");
    cy.contains("گروه مشاورین تحصیلی و شغلی").should("be.visible");
    cy.contains("گروه مشاورین پیش از ازدواج").should("be.visible");
    cy.contains("گروه مشاوره نوجوان").should("be.visible");
  });
});
