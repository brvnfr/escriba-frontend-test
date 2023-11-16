<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
    <div
      class="gap-4 flex sm:flex-row flex-col sm:justify-between sm:items-center justify-start items-start mx-4 sm:-mx-6 px-4 sm:px-8 py-4"
    >
      <!-- Cabeçalho -->
      <h1 class="text-3xl font-bold">Cadastro de Pessoas</h1>

      <!--Botão Adicionar-->
      <button
        id="add_button"
        @click="addNovaPessoa"
        class="bg-yellow-400 rounded-md hover:bg-yellow-500 text-zinc-950 font-bold py-2 px-12 rounded focus:outline-none"
      >
        Adicionar Pessoa
      </button>
    </div>
    <!--Tabela de Listagem-->
    <div class="mx-4 sm:-mx-6 px-4 sm:px-8 py-4 overflow-x-auto">
      <!-- Input de Busca -->
      <div class="flex justify-end mb-4">
        <input
          v-model="filtroNome"
          type="text"
          placeholder="Buscar por nome..."
          class="w-full max-w-xs border-gray-300 border rounded-md p-2 focus:outline-none"
        />
      </div>

      <table class="min-w-full bg-white border border-zinc-200">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
            >
              CPF
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-zinc-800 text-left text-xs leading-4 font-medium text-zinc-200 uppercase tracking-wider"
            >
              Data de Nascimento
            </th>
            <th class="px-6 py-3 border-b border-gray-200 bg-zinc-800"></th>
          </tr>
        </thead>
        <!--Skeleton da Tabela-->
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
            <td>
              <div class="h-8 bg-gray-200 animate-pulse"></div>
            </td>
          </tr>
          <!--Tabela de dados-->
          <tr v-else v-for="pessoa in pessoasFiltradas" :key="pessoa.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.id }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.nome }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.cpf }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ pessoa.dataNascimento }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
              <!--Botão Editar-->
              <button
                @click="editarPessoa(pessoa)"
                class="w-full p-2 mb-1 rounded-md bg-zinc-600 text-white hover:bg-zinc-800 focus:outline-none"
              >
                Editar
              </button>
              <!--Botão Deletar-->
              <button
                @click="deletarPessoa(pessoa.id)"
                class="w-full p-2 rounded-md bg-red-600 text-white hover:bg-red-800 focus:outline-none"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-------Modal-------->
    <PersonModal :showModal="showModal" :mode="modalMode" :data="modalData" @closeModal="closeModal" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PersonModal from '@/components/dialogs/PersonModal.vue';

export default {
  components: {
    PersonModal,
  },
  data() {
    return {
      showModal: false,
      modalMode: '',
      modalData: {},
      filtroNome: '',
    };
  },
  created() {
    this.carregarPessoas();
  },
  computed: {
    ...mapGetters('pessoas', ['listarPessoas', 'isLoading']),
    pessoasFiltradas() {
      if (!this.filtroNome) {
        return this.listarPessoas;
      }
      const filtro = this.filtroNome.toLowerCase();
      return this.listarPessoas.filter((pessoa) => pessoa.nome.toLowerCase().includes(filtro));
    },
  },
  watch: {
    filtroNome: {
      handler(newFiltro, oldFiltro) {
        if (newFiltro !== oldFiltro) {
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('pessoas', ['carregarPessoas', 'addPessoa', 'deletarPessoa', 'atualizarPessoa']),
    addNovaPessoa() {
      this.showModal = true;
      this.modalMode = 'add';
      this.modalData = {}; // Limpa os dados do modal ao adicionar nova pessoa
    },
    editarPessoa(pessoa) {
      this.showModal = true;
      this.modalMode = 'edit';
      this.modalData = pessoa;
    },
    closeModal() {
      // Fecha o modal e limpa os dados
      this.showModal = false;
      this.modalMode = '';
      this.modalData = {};
    },
  },
};
</script>
