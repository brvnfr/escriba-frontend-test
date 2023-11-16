<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    <div
      class="gap-4 flex sm:flex-row flex-col sm:justify-between sm:items-center justify-start items-start mx-4 sm:-mx-6 px-4 sm:px-8 py-4"
    >
      <!-- Cabeçalho -->
      <h1 class="text-3xl font-bold">Lista de Pedidos</h1>

      <!-- Botão Adicionar Pedido -->
      <button
        @click="adicionarNovoPedido"
        class="bg-yellow-400 rounded-md hover:bg-yellow-500 text-zinc-950 font-bold py-2 px-6 sm:px-12 rounded focus:outline-none"
      >
        Adicionar Pedido
      </button>
    </div>

    <!-- Tabela de Listagem de Pedidos -->
    <div class="mx-4 sm:-mx-6 px-4 sm:px-8 py-4 overflow-x-auto">
      <div v-for="pedido in pedidos" :key="pedido.id" class="mb-8">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="flex flex-row justify-between p-4">
            <h2 class="text-xl font-semibold mb-2">Pedido ID: {{ pedido.id }}</h2>
            <button
              @click="deletarPedido(pedido.id)"
              class="w-auto p-2 rounded-md bg-red-600 self-end text-white hover:bg-red-800 focus:outline-none"
            >
              Deletar
            </button>
          </div>
          <div class="p-4 border-1">
            <div class="flex flex-wrap justify-between mb-2">
              <p class="mb-2 sm:mb-0"><span class="font-semibold">Cliente:</span> {{ pedido.cliente.nome }}</p>
              <p class="mb-2 sm:mb-0"><span class="font-semibold">Data de Emissão:</span> {{ pedido.dataEmissao }}</p>
              <p><span class="font-semibold">Valor Total:</span> R$ {{ pedido.valorTotal }}</p>

              <!-- Botão Deletar -->
            </div>
          </div>
          <table class="min-w-full bg-white border border-zinc-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
                >
                  Descrição
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
                >
                  Valor
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
                >
                  Quantidade
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
                >
                  Subtotal
                </th>
              </tr>
            </thead>
            <!-- Skeleton da Tabela -->
            <tbody>
              <tr v-if="isLoading" v-for="n in 5" :key="n">
                <td>
                  <div class="h-8 bg-gray-200 animate-pulse"></div>
                </td>
                <td>
                  <div class="h-8 bg-gray-200 animate-pulse"></div>
                </td>
                <td>
                  <div class="h-8 bg-gray-200 animate-pulse"></div>
                </td>
                <td>
                  <div class="h-8 bg-gray-200 animate-pulse"></div>
                </td>
              </tr>
              <!-- Tabela de Dados -->
              <tr v-else v-for="item in pedido.itens" :key="item.id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ item.produto.descricao }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">R$ {{ item.valor }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ item.quantidade }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">R$ {{ item.subtotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de Edição/Adição de Pedido -->
    <OrderModal :showModal="showModal" :mode="modalMode" :data="modalData" @closeModal="closeModal" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import OrderModal from '@/components/dialogs/OrderModal.vue'; // Seu componente de modal de pedidos

export default {
  components: {
    OrderModal,
  },
  data() {
    return {
      showModal: false,
      modalMode: '',
      modalData: {},
    };
  },
  created() {
    this.carregarPedidos();
  },
  computed: {
    ...mapGetters('pedidos', ['listarPedidos', 'isLoading']),
    pedidos() {
      return this.listarPedidos;
    },
  },
  methods: {
    ...mapActions('pedidos', ['carregarPedidos', 'adicionarPedido', 'deletarPedido']),
    adicionarNovoPedido() {
      this.showModal = true;
      this.modalMode = 'add';
      this.modalData = {}; // Limpar os dados do modal ao adicionar um novo pedido
    },
    closeModal() {
      // Fechar o modal e limpar os dados
      this.showModal = false;
      this.modalMode = '';
      this.modalData = {};
      this.carregarPedidos();
    },
  },
};
</script>
