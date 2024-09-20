describe("Teste de login", () => {
  it("Deve acessar a página de login e conseguir logar", () => {
    cy.visit("http://localhost:8081");
    cy.get('[data-testid="email-input"]').type("teste@email.com");
    cy.get('[data-testid="password-input"]').type("123");
    cy.get('[data-testid="login-button"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("Deve mostrar uma mensagem de email ou senha incorreta", () => {
    cy.visit("http://localhost:8081");
    cy.get('[data-testid="email-input"]').type("abc@email.com");
    cy.get('[data-testid="password-input"]').type("123");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-text"]').should(
      "have.text",
      "*As credenciais informadas estão incorretas"
    );
  });

  it("Deve bloquear temporariamente o acesso neste dispositivo", () => {
    cy.visit("http://localhost:8081");
    cy.get('[data-testid="email-input"]').type("abc@email.com");
    cy.get('[data-testid="password-input"]').type("123");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-text"]').should(
      "have.text",
      "*Conta temporariamente bloqueada. Tente novamente mais tarde."
    );
  });
});
