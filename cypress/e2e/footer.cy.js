describe("Footer - بخش فوتر", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // it("باید آیکون‌ها و اطلاعات تماس را نمایش دهد", () => {
  //   cy.visit("/Home");
  //   cy.contains("ایمیل: eniakgroupiust@gmail.com").should("be.visible");
  //   cy.get(".social_icon").contains("MdEmail").should("be.visible");

  //   cy.contains("گیت هاب: https://github.com/ENIAC-group").should("be.visible");
  //   cy.get('a[href="https://github.com/ENIAC-group"]')
  //     .should("have.attr", "href", "https://github.com/ENIAC-group")
  //     .and("be.visible");
  //   cy.get(".social_icon").contains("FaGithubSquare").should("be.visible");

  //   cy.contains("تلفن: 12345678-021").should("be.visible");
  //   cy.get(".social_icon").contains("FaPhone").should("be.visible");
  // });

  it("باید لینک‌ها در بخش دسترسی آسان به درستی عمل کنند", () => {
    cy.get('a[href="/Aboutus"]').should("be.visible").click();
    cy.url().should("include", "/Aboutus");

    cy.visit("/");

    cy.get('a[href="/Home"]').should("be.visible").click();
    cy.url().should("include", "/Home");

    cy.visit("/");
  });

  it("باید بخش حقوق محفوظ و لینک‌ها را نمایش دهد", () => {
    cy.contains("© 2024 Appy. All rights reserved.").should("be.visible");

    cy.contains("Terms · Privacy Policy").should("be.visible");
  });

  // it("باید آیکون‌ها و متن‌ها به درستی نمایش داده شوند", () => {
  //   cy.get(".social_icon").should("have.length", 6);

  //   cy.contains("دسترسی آسان").should("be.visible");
  //   cy.contains("راه های ارتباطی").should("be.visible");
  // });
});
