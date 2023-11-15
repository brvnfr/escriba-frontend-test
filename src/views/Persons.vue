<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-3xl font-bold">Cadastro de Pessoas</h1>
      <div>
        <button
          @click="addNovaPessoa"
          class="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adicionar Pessoa
        </button>
      </div>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              CPF
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Data de Nascimento
            </th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa in pessoas" :key="pessoa.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.id }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.nome }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.cpf }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.dataNascimento }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
              <button @click="editarPessoa(pessoa)" class="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                Editar
              </button>
              <button @click="deletarPessoa(pessoa.id)" class="ml-2 text-red-600 hover:text-red-900 focus:outline-none">
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    this.carregarPessoas();
  },
  computed: {
    ...mapGetters('pessoas', ['listarPessoas', 'isLoading']),
    pessoas() {
      return this.listarPessoas;
    },
  },
  methods: {
    ...mapActions('pessoas', ['carregarPessoas', 'addPessoa', 'deletarPessoa', 'atualizarPessoa']),
    addNovaPessoa() {
      const novaPessoa = {
        id: Math.floor(Math.random() * 1000), // Gera um ID aleatório
        nome: '',
        cpf: '',
        dataNascimento: '',
      };
      this.addPessoa(novaPessoa);
    },
    editarPessoa(pessoa) {
      // Implemente a lógica para editar um cliente (se necessário)
      // Pode abrir um modal/formulário para editar os dados do cliente
    },
  },
};
</script>
