describe('Teste E2E para a página de Produtos', () => {
  it('Verifica se a página exibe a lista de pessoas na tabela após interação com botões', () => {
    cy.visit('http://localhost:5173/pessoas');

    cy.get('table tbody').should('not.contain', 'tr');

    cy.wait(1000);

    cy.get('table tbody').find('tr').should('have.length.greaterThan', 0);
  });
});
