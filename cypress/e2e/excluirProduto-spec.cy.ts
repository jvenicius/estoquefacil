describe("Teste de excluir produto", () => {
  it("Deve acessar a página de atualização e excluir um produto", () => {
    cy.visit("http://localhost:8081/atualizarProduto?produtoId=21");
    cy.get('[data-testid="excluir-button"]').click();
    cy.url().should("include", "/dashboard");
  });
});
