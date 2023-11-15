import api from '@/api';

const state = {
  pessoas: [],
  loading: false,
};

const mutations = {
  LISTAR_PESSOAS(state, pessoas) {
    state.pessoas = pessoas;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  ADD_PESSOA(state, novaPessoa) {
    state.clientes.push(novaPessoa);
  },
  DELETAR_PESSOA(state, id) {
    state.pessoas = state.pessoas.filter((cliente) => cliente.id !== id);
  },
  ATUALIZAR_PESSOA(state, pessoaAtualizada) {
    const index = state.pessoas.findIndex((cliente) => cliente.id === pessoaAtualizada.id);
    if (index !== -1) {
      state.pessoas.splice(index, 1, pessoaAtualizada);
    }
  },
};

const actions = {
  async listarPessoas({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.get('/pessoas');
      commit('LISTAR_PESSOAS', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addPessoa({ commit }, novaPessoa) {
    commit('SET_LOADING', true);
    try {
      const response = await api.post('/pessoas', novaPessoa);
      commit('ADD_PESSOA', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async deletarCliente({ commit }, id) {
    commit('SET_LOADING', true);
    try {
      await api.delete(`/pessoas/${id}`);
      commit('DELETAR_PESSOA', id);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async atualizarCliente({ commit }, pessoaAtualizada) {
    commit('SET_LOADING', true);
    try {
      await api.put(`/pessoas/${pessoaAtualizada.id}`, pessoaAtualizada);
      commit('ATUALIZAR_PESSOA', pessoaAtualizada);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  pessoas: (state) => state.pessoas,
  isLoading: (state) => state.loading,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
