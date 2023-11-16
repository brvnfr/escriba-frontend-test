<template>
  <div class="fixed inset-0 overflow-y-auto" v-show="showModal" @click.self="closeModal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-black bg-opacity-50 fixed inset-0 z-40" @click.stop="closeModal"></div>

      <div class="relative z-50 bg-white rounded-lg w-full max-w-md p-6">
        <h2 class="text-2xl font-bold mb-4">{{ mode === 'edit' ? 'Editar Pessoa' : 'Adicionar Pessoa' }}</h2>

        <!-- Formulários -->

        <!--Nome-->
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="nome" class="block text-gray-700 font-semibold mb-1">Nome</label>
            <input
              v-model="formData.nome"
              @input="validateNome"
              type="text"
              id="nome"
              class="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Nome"
            />
            <p v-if="!isValidNome" class="text-red-500 text-xs mt-1">Insira um nome válido.</p>
          </div>

          <!-- CPF -->
          <div class="mb-4">
            <label for="cpf" class="block text-gray-700 font-semibold mb-1">CPF</label>
            <input
              v-model="formData.cpf"
              @input="validateCPF"
              type="text"
              id="cpf"
              class="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="CPF"
            />
            <p v-if="!isValidCpf" class="text-red-500 text-xs mt-1">Insira um CPF válido.</p>
          </div>

          <!-- Data de Nascimento -->
          <div class="mb-4">
            <label for="dataNascimento" class="block text-gray-700 font-semibold mb-1">Data de Nascimento</label>
            <input
              v-model="formData.dataNascimento"
              type="date"
              @input="validateDataNascimento"
              id="dataNascimento"
              class="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Data de Nascimento (DD/MM/AAAA)"
            />
            <p v-if="!isValidDataNascimento" class="text-red-500 text-xs mt-1">Insira uma data de nascimento válida.</p>
          </div>

          <!-- Botões -->
          <div class="flex justify-end">
            <!-- Botão Cancelar -->
            <button
              type="button"
              @click="closeModal"
              class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancelar
            </button>
            <!-- Botão Salvar/Adicionar (desabilitado se o formulário não for válido) -->
            <button
              type="submit"
              :disabled="!formIsValid"
              class="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
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
        nome: '',
        cpf: '',
        dataNascimento: '',
      },
    };
  },
  watch: {
    data: {
      handler(newData) {
        if (newData) {
          this.formData = { ...newData }; // Atualize os dados do formulário
        }
      },
      immediate: true,
    },
  },
  computed: {
    formIsValid() {
      return this.isValidNome && this.isValidCPF && this.isValidDataNascimento;
    },
  },
  methods: {
    handleSubmit() {
      // Lógica para salvar/editar pessoa
      // this.formData contém os dados do formulário
      this.$emit('closeModal');
    },
    closeModal() {
      this.$emit('closeModal');
    },

    //Validação

    validateNome() {
      const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020]{2,30}$/;
      this.isValidNome = regex.test(this.formData.nome.trim());
    },
    validateCPF() {
      const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      this.isValidCPF = regex.test(this.formData.cpf);
    },
    validateDataNascimento() {
      const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      this.isValidDataNascimento = regex.test(this.formData.dataNascimento);
    },
  },
};
</script>

<style scoped>
/* Estilos para o backdrop */
.fixed {
  @screen sm {
    /* Definindo a altura para telas menores */
    height: 100vh; /* 64px é a altura do cabeçalho, ajuste conforme necessário */
  }
}
.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
