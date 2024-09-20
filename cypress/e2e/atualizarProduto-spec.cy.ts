describe("Teste de atualizar produto", () => {
  it("Deve acessar a página de atualização e atualizar um produto", () => {
    cy.visit("http://localhost:8081/atualizarProduto?produtoId=22");
    cy.get('[data-testid="sku-input"]').type("123");
    cy.get('[data-testid="nome-input"]').type("nome");
    cy.get('[data-testid="fornecedor-input"]').type("fornecedor");
    cy.get('[data-testid="lote-input"]').type("lote");
    cy.get('[data-testid="estoque-input"]').type("1");
    cy.get('[data-testid="atualizar-button"]').click();
    cy.get('[data-testid="mensagem-text"]').should(
      "have.text",
      "Produto atualizado com sucesso!"
    );
  });
});
