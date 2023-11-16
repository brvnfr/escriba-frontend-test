<template>
  <div class="fixed inset-0 overflow-y-auto" v-show="showModal" @click.self="closeModal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-black bg-opacity-50 fixed inset-0 z-40" @click.stop="closeModal"></div>

      <div class="relative z-50 bg-white rounded-lg w-full max-w-md p-6">
        <h2 class="text-2xl font-bold mb-4">{{ mode === 'edit' ? 'Editar Produto' : 'Adicionar Produto' }}</h2>

        <!-- Formulário -->
        <form @submit.prevent="validateAndSubmit">
          <!-- Descrição -->
          <div class="mb-4">
            <label for="descricao" class="block text-gray-700 font-semibold mb-1">Descrição</label>
            <input
              v-model="formData.descricao"
              type="text"
              id="descricao"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Descrição"
              @input="validateDescricao"
            />
            <p v-if="!isValidDescricao" class="text-red-500 text-xs mt-1">Insira uma descrição válida.</p>
          </div>

          <!-- Valor Unitário -->
          <div class="mb-4">
            <label for="valoUnitario" class="block text-gray-700 font-semibold mb-1">Valor Unitário</label>
            <input
              v-model="formData.valoUnitario"
              type="number"
              id="valoUnitario"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Valor Unitário"
              @input="validateValorUnitario"
            />
            <p v-if="!isValidValorUnitario" class="text-red-500 text-xs mt-1">
              Insira um valor unitário válido (0.00).
            </p>
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
export default {
  props: {
    showModal: Boolean,
    mode: String,
    data: Object,
  },
  data() {
    return {
      formData: {
        descricao: null,
        valoUnitario: null,
      },
      isValidDescricao: true,
      isValidValorUnitario: true,
    };
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
  computed: {
    isFormValid() {
      return this.isValidDescricao && this.isValidValorUnitario;
    },
  },
  methods: {
    validateAndSubmit() {
      this.validateDescricao();
      this.validateValorUnitario();

      if (this.isFormValid) {
        this.handleSubmit();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    },
    handleSubmit() {
      if (this.mode === 'edit') {
        this.$store.dispatch('produtos/atualizarProduto', this.formData);
      } else {
        this.$store.dispatch('produtos/addProduto', this.formData);
      }
      this.$emit('closeModal');
    },
    closeModal() {
      this.$emit('closeModal');
    },

    // Validações

    validateDescricao() {
      this.isValidDescricao = this.formData.descricao && this.formData.descricao.trim() !== '';
    },

    validateValorUnitario() {
      const valorRegex = /^\d+(\.\d{1,2})?$/;
      this.isValidValorUnitario = this.formData.valoUnitario && valorRegex.test(this.formData.valoUnitario);
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
