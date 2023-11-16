describe('Testes na Tela de Produtos', () => {
  beforeEach(() => {
    cy.visit('/produtos'); // Visita a página de produtos antes de cada teste
  });

  it('Deve adicionar um novo produto', () => {
    const novoProduto = {
      descricao: 'Novo Produto',
      valor: 20,
    };

    // Clicar no botão "Adicionar Produto"
    cy.contains('Adicionar Produto').click();

    // Preencher o formulário para adicionar um novo produto
    cy.get('#descricao').type(novoProduto.descricao);
    cy.get('#valor').type(novoProduto.valor);
    cy.contains('Adicionar').click();

    // Verificar se o novo produto está na lista de produtos
    cy.contains('.min-w-full', novoProduto.descricao).should('exist');
  });

  it('Deve editar um produto existente', () => {
    const novoValor = 25;

    // Clicar no botão "Editar" do primeiro produto da lista
    cy.contains('Editar').first().click();

    // Editar o valor do produto
    cy.get('#valor').clear().type(novoValor);
    cy.contains('Salvar').click();

    // Verificar se o valor do produto foi atualizado corretamente
    cy.contains('.min-w-full', novoValor).should('exist');
  });

  it('Deve deletar um produto existente', () => {
    // Identificar o número de produtos na lista antes de deletar
    cy.get('.min-w-full tbody tr')
      .its('length')
      .then((initialLength) => {
        // Clicar no botão "Deletar" do primeiro produto da lista
        cy.contains('Deletar').first().click();

        // Verificar se o número de produtos foi reduzido após a exclusão
        cy.get('.min-w-full tbody tr').should('have.length', initialLength - 1);
      });
  });

  // Outros testes relacionados à tela de produtos...
});
