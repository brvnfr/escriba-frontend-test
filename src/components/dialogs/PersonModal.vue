<template>
  <div class="fixed inset-0 overflow-y-auto" v-show="showModal" @click.self="closeModal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-black bg-opacity-50 fixed inset-0 z-40" @click.stop="closeModal"></div>

      <div class="relative z-50 bg-white rounded-lg w-full max-w-md p-6">
        <h2 class="text-2xl font-bold mb-4">{{ mode === 'edit' ? 'Editar Pessoa' : 'Adicionar Pessoa' }}</h2>

        <!-- Formulários -->

        <!--Nome-->
        <form @submit.prevent="validateAndSubmit">
          <div class="mb-4">
            <label for="nome" class="block text-gray-700 font-semibold mb-1">Nome</label>
            <input
              v-model="formData.nome"
              type="text"
              @input="validateNome"
              id="nome"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Nome"
            />
            <p v-if="!isValidNome" class="text-red-500 text-xs mt-1">Insira um nome válido.</p>
          </div>

          <!-- CPF -->
          <div class="mb-4">
            <label for="cpf" class="block text-gray-700 font-semibold mb-1">CPF</label>
            <input
              v-model="formData.cpf"
              type="text"
              id="cpf"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="CPF"
              @input="validateCPF"
            />
            <p v-if="!isValidCpf" class="text-red-500 text-xs mt-1">Insira um CPF válido (000.000.000-00).</p>
          </div>

          <!-- Data de Nascimento -->
          <div class="mb-4">
            <label for="dataNascimento" class="block gray-700 font-semibold mb-1">Data de Nascimento</label>
            <input
              v-model="formData.dataNascimento"
              type="text"
              id="dataNascimento"
              class="w-full p-2 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Data de Nascimento (AAAA-MM-DD)"
              @input="validateDataNascimento"
            />
            <p v-if="!isValidDataNascimento" class="text-red-500 text-xs mt-1">
              Insira uma data de nascimento válida (AAAA-MM-DD).
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
        nome: null,
        cpf: null,
        dataNascimento: null,
      },
      isValidNome: true,
      isValidCpf: true,
      isValidDataNascimento: true,
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
      const nomeValid = this.isValidNome;
      const cpfValid = this.isValidCpf;
      const dataValid = this.isValidDataNascimento;

      return nomeValid && cpfValid && dataValid;
    },
  },
  methods: {
    validateAndSubmit() {
      this.validateNome();
      this.validateCPF();
      this.validateDataNascimento();

      if (this.isValidNome && this.isValidCpf && this.isValidDataNascimento) {
        this.handleSubmit();
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    },
    handleSubmit() {
      if (this.mode === 'edit') {
        this.$store.dispatch('pessoas/atualizarPessoa', this.formData);
      } else {
        this.$store.dispatch('pessoas/addPessoa', this.formData);
      }
      this.$emit('closeModal');
    },
    closeModal() {
      this.$emit('closeModal');
    },

    //Validações

    validateNome() {
      this.isValidNome = this.formData.nome && this.formData.nome.trim() !== '';
    },

    validateCPF() {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      this.isValidCpf = this.formData.cpf && cpfRegex.test(this.formData.cpf);
    },

    validateDataNascimento() {
      const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
      this.isValidDataNascimento = this.formData.dataNascimento && dataRegex.test(this.formData.dataNascimento);
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
