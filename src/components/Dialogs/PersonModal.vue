<template>
  <div class="fixed inset-0 overflow-y-auto" v-if="showModal">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 transition-opacity" @click="fecharModal">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div class="relative bg-white rounded-lg p-8 max-w-md w-full">
        <span class="absolute top-0 right-0 p-2 cursor-pointer" @click="fecharModal">&times;</span>
        <h2 class="text-2xl font-bold mb-4">{{ modo === 'editar' ? 'Editar Pessoa' : 'Adicionar Pessoa' }}</h2>
        <form @submit.prevent="submeterFormulario">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nome">Nome:</label>
            <input type="text" v-model="formulario.nome" required class="border rounded-md w-full p-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="cpf">CPF:</label>
            <input type="text" v-model="formulario.cpf" required class="border rounded-md w-full p-2" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="dataNascimento">Data de Nascimento:</label>
            <input type="date" v-model="formulario.dataNascimento" required class="border rounded-md w-full p-2" />
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {{ modo === 'editar' ? 'Editar' : 'Adicionar' }}
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
    modo: String,
  },
  data() {
    return {
      formulario: {
        id: null,
        nome: '',
        cpf: '',
        dataNascimento: '',
      },
    };
  },
  methods: {
    fecharModal() {
      this.$emit('fechar');
      this.formulario = {
        id: null,
        nome: '',
        cpf: '',
        dataNascimento: '',
      };
    },
    async submeterFormulario() {
      if (this.modo === 'editar') {
        // Chamar a action para editar usuário na store
        const pessoaAtualizada = { ...this.formulario };
        await this.$store.dispatch('pessoas/atualizarPessoa', pessoaAtualizada);
      } else {
        // Chamar a action para adicionar usuário na store
        const novaPessoa = { ...this.formulario };
        await this.$store.dispatch('pessoas/addPessoa', novaPessoa);
      }
      this.fecharModal();
    },
  },
};
</script>
