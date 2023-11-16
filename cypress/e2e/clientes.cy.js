describe('Clientes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/clientes');
  });

  it('Exibe a lista de clientes corretamente', () => {
    cy.get('h1').should('contain', 'Cadastro de Clientes');
    cy.get('table tbody tr').should('have.length.above', 0); // Verifica se há itens na lista de clientes
  });

  it('Adiciona um novo cliente', () => {
    cy.get('button').contains('Adicionar Cliente').click();
    cy.get('input#nome').type('Novo Cliente');
    cy.get('button').contains('Adicionar').click();

    cy.contains('Novo Cliente').should('exist');
  });

  it('Edita um cliente existente', () => {
    cy.contains('Cliente Existente').parent().find('button').contains('Editar').click();
    cy.get('input#nome').clear().type('Cliente Editado');
    cy.get('button').contains('Salvar').click();

    cy.contains('Cliente Editado').should('exist');
    cy.contains('Cliente Existente').should('not.exist');
  });

  it('Remove um cliente existente', () => {
    cy.contains('Cliente a ser removido').parent().find('button').contains('Remover').click();

    cy.contains('Cliente a ser removido').should('not.exist');
  });
});
