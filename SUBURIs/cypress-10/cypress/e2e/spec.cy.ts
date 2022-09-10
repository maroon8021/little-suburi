describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080");

    cy.get("p").contains("hoge");
  });
});
