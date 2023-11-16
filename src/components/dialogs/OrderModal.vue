<template>
  <div class="fixed inset-0 overflow-y-auto" v-show="showModal" @click.self="closeModal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-black bg-opacity-50 fixed inset-0 z-40" @click.stop="closeModal"></div>

      <div class="relative z-50 bg-white rounded-lg w-full max-w-md p-6">
        <h2 class="text-2xl font-bold mb-4">{{ mode === 'edit' ? 'Editar Pedido' : 'Adicionar Pedido' }}</h2>

        <!-- Formulário -->
        <form @submit.prevent="handleSubmit">
          <!-- Select para Cliente -->
          <div class="mb-4">
            <label for="clienteId" class="block text-gray-700 font-semibold mb-1">Cliente</label>
            <select
              v-model="formData.cliente"
              id="clienteId"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option v-for="cliente in clientesArr" :key="cliente.id" :value="cliente">{{ cliente.nome }}</option>
            </select>
          </div>

          <!-- Select para Produto (múltiplos) -->
          <div class="mb-4">
            <label for="produtoIds" class="block text-gray-700 font-semibold mb-1">Produtos</label>
            <select
              v-model="formData.produtos"
              id="produtoIds"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              multiple
            >
              <option v-for="produto in produtosArr" :key="produto.id" :value="produto">
                {{ produto.descricao }}
              </option>
            </select>
          </div>

          <!-- Seção para as quantidades dos produtos -->
          <div v-if="formData.produtos && formData.produtos.length > 0">
            <h3 class="text-lg font-semibold mb-2">Quantidades</h3>
            <div v-for="(produto, index) in formData.produtos" :key="index" class="mb-4">
              <label :for="'quantidade_' + index" class="block text-gray-700 font-semibold mb-1">{{
                produto.descricao
              }}</label>
              <input
                v-model="formData.quantidades[index]"
                :id="'quantidade_' + index"
                type="number"
                min="1"
                class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Quantidade"
              />
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="mr-2 px-4 py-2 rounded text-red-400 hover:text-red-300 focus:outline-none"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:bg-indigo-600"
            >
              {{ mode === 'edit' ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    showModal: Boolean,
    mode: String,
    data: Object,
  },
  watch: {
    data: {
      handler(newData) {
        if (newData) {
          this.formData = { ...newData };
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      formData: {
        cliente: {},
        produtos: [],
      },
      clientesArr: [],
      produtosArr: [],
      isValidDataEmissao: true,
    };
  },
  watch: {
    'formData.produtos': {
      handler(newProdutos) {
        this.formData.quantidades = newProdutos.map(() => 1);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.clientesArr = this.carregarPessoas();
    this.produtosArr = this.carregarProdutos();
  },
  computed: {
    // Getter da store para clientes
    clientesArr() {
      return this.$store.getters['pessoas/listarPessoas'];
    },
    // Getter da store para produtos
    produtosArr() {
      return this.$store.getters['produtos/listarProdutos'];
    },
  },
  methods: {
    ...mapActions('pessoas', ['carregarPessoas']),
    ...mapActions('produtos', ['carregarProdutos']),
    validateAndSubmit() {
      this.validateDataEmissao();

      if (this.isValidDataEmissao) {
        this.handleSubmit();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    },
    handleSubmit() {
      this.$nextTick(() => {
        const itens = this.formData.produtos.map((produto, index) => {
          const quantidade = parseInt(this.formData.quantidades[index] || 0, 10);
          const subtotal = produto.valor * quantidade;

          return {
            id: produto.id,
            produto: {
              id: produto.id,
              descricao: produto.descricao,
            },
            valor: produto.valor,
            quantidade,
            subtotal,
          };
        });

        const valorTotal = itens.reduce((total, item) => total + item.subtotal, 0);

        const pedido = {
          cliente: {
            id: this.formData.cliente.id,
            nome: this.formData.cliente.nome,
          },
          dataEmissao: new Date().toISOString().split('T')[0],
          valorTotal,
          itens,
        };

        this.$store.dispatch('pedidos/addPedido', pedido);
        this.$emit('closeModal');
      });
    },
  },
};
</script>

<style scoped>
.fixed {
  @screen sm {
    height: 100vh;
  }
}
.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
