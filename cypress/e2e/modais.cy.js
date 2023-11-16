describe('Modais', () => {
  beforeEach(() => {
    cy.visit('/clientes');
  });

  it('Adiciona um novo cliente via modal', () => {
    cy.get('button').contains('Adicionar Cliente').click();
    cy.get('input#nome').type('Novo Cliente');
    cy.get('button').contains('Adicionar').click();

    cy.contains('Novo Cliente').should('exist');
  });

  it('Adiciona produtos a um pedido via modal', () => {
    cy.visit('/pedidos'); // Assumindo que a rota para pedidos seja '/pedidos'
    cy.contains('Pedido a ser editado').parent().find('button').contains('Editar').click();

    // Abre o modal para adicionar produtos
    cy.get('button').contains('Adicionar Produtos').click();

    // Seleciona produtos no seletor de produtos (usando IDs ou outros identificadores)
    cy.get('select#produtos').select(['Produto 1', 'Produto 2']); // Exemplo de seleção de produtos

    // Insere a quantidade desejada para cada produto
    cy.get('input#quantidade-produto-1').type('5');
    cy.get('input#quantidade-produto-2').type('3');

    // Salva os produtos selecionados
    cy.get('button').contains('Adicionar').click();

    // Verifica se os produtos e suas quantidades foram adicionados corretamente ao pedido
    cy.contains('Produto 1').should('exist');
    cy.contains('Quantidade: 5').should('exist');
    cy.contains('Produto 2').should('exist');
    cy.contains('Quantidade: 3').should('exist');
  });
});
