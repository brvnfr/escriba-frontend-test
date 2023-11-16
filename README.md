# Escriba CRUD Application

## Descrição

Projeto de CRUD application feita na etapa de teste tecnico do processo seletivo da vaga de Desenvolvedor Front-end da empresa Escriba Informática.

## Funcionalidades Principais

- Tela de Pessoas, com cadastro, edição e exclusão de clientes(pessoas).
- Tela de Produtos, com cadastro, edição e exclusão de produtos.
- Tela de Pedidos, com cadastro de pedidos para os clientes(pessoas) cadastrados e produtos(também cadastrados) comprados pelos mesmos, e exclusão de pedidos.

## Tecnologias Utilizadas

- JavaScript
- Vue.js
- Tailwind CSS
- Vuex
- Vue Router
- Cypress (para testes E2E)

## Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-projeto.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor local: `npm run dev`
4. Instale o json-server: `npm install -g json-server`
5. Inicie o json-server com o data.json, presente na raiz do projeto: `npx json-server --watch data.json`

## Como Usar

Após iniciar o projeto e a API do projeto, utilizando o json-server, agora é só navegar pela url do projeto e testar as demais rotas e funcionalidades que a mesma apresenta.

## Testes

Foi criar a estrutura inicial de testes utilizando cypress, com interações minimas, que podem ser melhoradas posteriormente.

### Testes E2E com Cypress

1. Abra o Cypress: `npx cypress open`

## Consideraçoes

- Devido a demanda de trabalho, precisei desenvolver o teste somente no periodo noturno, fora do horário de expediente, com exceção do dia 15 de novembro, que foi feriado e pude agilizar boa parte do mesmo.

- Utilizei elementos do propio html com o tailwind para estilização do CSS, para evitar o uso de libs externas ao maximo, e demonstrar minhas habilidades nas tecnologias HTML,CSS e Javascript.

- Além da tela de pessoas, foi criada as telas de produtos e pedidos, conforme pedido no bonus :D

- A Vuex store foi utilizada para gerenciar o consumo da API, bem como as operações CRUD na aplicação, tendo para cada pagina, a suas propriass actions e mutations.

- A tela de Pedidos, utiliza no seu formulario, select inputs para, selecionar usuarios e produtos cadastrados na API para realizar a emissão do pedido.

- As tabelas possuem skeleton que aparecem quando está carregando os dados da API ( usar throttling do navegador para emular conexão mais lenta torna mais perceptivel)

- Os formulários de criação/edicão todos tem seus respectivos regex de validação.

- O layout é 100% responsivo e funciona bem em varias resoluções testadas.

- Foi utilizado uma lib de Toasts, para criar alertas flutuantes quando uma operaçào é realizada com sucesso e/ou retorna erros.

- O teste foi feito com muito estudo e empenho, varias coisas podem ser melhoradas, mas se tratando de um teste, vou deixar minhas habilidades para os proximos desafios que a Empresa me conceder o/

- Foi adicionado inputs de busca por nome em todas as telas.

## Autor

- Bruno Onofre
