describe('Testes na Tela de Pedidos', () => {
  beforeEach(() => {
    cy.visit('/pedidos'); // Visita a página de pedidos antes de cada teste
  });

  it('Deve adicionar um novo pedido', () => {
    const novoPedido = {
      clienteId: 1, // ID do cliente
      dataEmissao: '2023-11-16', // Data de emissão
      itens: [
        {
          produtoId: 1, // ID do produto
          quantidade: 3,
        },
        {
          produtoId: 2, // ID do produto
          quantidade: 2,
        },
      ],
    };

    // Clicar no botão "Adicionar Pedido"
    cy.contains('Adicionar Pedido').click();

    // Preencher o formulário para adicionar um novo pedido
    cy.get('#clienteId').select(novoPedido.clienteId.toString());
    cy.get('#dataEmissao').type(novoPedido.dataEmissao);

    novoPedido.itens.forEach((item, index) => {
      cy.get(`#produtoId-${index}`).select(item.produtoId.toString());
      cy.get(`#quantidade-${index}`).type(item.quantidade.toString());
    });

    cy.contains('Adicionar').click();

    // Verificar se o novo pedido está na lista de pedidos
    cy.contains('.text-xl', `Pedido ID: ${novoPedido.id}`).should('exist');
  });

  it('Deve editar um pedido existente', () => {
    const novoValorTotal = 150;

    // Clicar no botão "Editar" do primeiro pedido da lista
    cy.contains('Editar').first().click();

    // Editar o valor total do pedido
    cy.get('#valorTotal').clear().type(novoValorTotal);
    cy.contains('Salvar').click();

    // Verificar se o valor total do pedido foi atualizado corretamente
    cy.contains('Valor Total: R$ 150').should('exist');
  });

  it('Deve deletar um pedido existente', () => {
    // Identificar o número de pedidos na lista antes de deletar
    cy.get('.rounded-md')
      .its('length')
      .then((initialLength) => {
        // Clicar no botão "Deletar" do primeiro pedido da lista
        cy.contains('Deletar').first().click();

        // Verificar se o número de pedidos foi reduzido após a exclusão
        cy.get('.rounded-md').should('have.length', initialLength - 1);
      });
  });
});
