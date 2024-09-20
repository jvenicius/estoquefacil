describe("Teste de buscar produto", () => {
  it("Deve acessar a página de buscar produto e realizar uma busca", () => {
    cy.visit("http://localhost:8081/dashboard/buscar");
    cy.get('[data-testid="name-input"]').type("pipoca");
    cy.get('[data-testid="pesquisar-button"]').click();
    cy.get('[data-testid="product-list"]').children().should("not.have.length", 0);
  });
});
