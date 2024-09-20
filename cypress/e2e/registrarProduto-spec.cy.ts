describe("Teste de registrar produto", () => {
  it("Deve acessar dashboard", () => {
    cy.visit("http://localhost:8081");
    cy.get('[data-testid="email-input"]').type("teste@email.com");
    cy.get('[data-testid="password-input"]').type("123");
    cy.get('[data-testid="login-button"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("Deve clicar em registrar e exibir a página de registro de produto", () => {
    cy.visit("http://localhost:8081/dashboard/registrar");
    cy.get("[data-testid='sku-input']").type("153");
    cy.get("[data-testid='nome-input']").type("produto teste");
    cy.get("[data-testid='fornecedor-input']").type("Rafael");
    cy.get("[data-testid='lote-input']").type("3");
    cy.get("[data-testid='estoque-input']").type("10");
    cy.get("[data-testid='registrar-button']").click();
    cy.get("[data-testid='mensagem-text']").should(
      "have.text",
      "Produto registrado com sucesso!"
    );
  });
});
