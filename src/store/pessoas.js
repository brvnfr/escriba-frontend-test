import api from '@/services/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const state = {
  pessoas: [],
  loading: false,
};

const mutations = {
  CARREGAR_PESSOAS(state, pessoas) {
    state.pessoas = pessoas;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  ADD_PESSOA(state, novaPessoa) {
    state.pessoas.push(novaPessoa);
  },
  DELETAR_PESSOA(state, id) {
    state.pessoas = state.pessoas.filter((pessoa) => pessoa.id !== id);
  },
  ATUALIZAR_PESSOA(state, pessoaAtualizada) {
    const index = state.pessoas.findIndex((pessoa) => pessoa.id === pessoaAtualizada.id);
    if (index !== -1) {
      state.pessoas.splice(index, 1, pessoaAtualizada);
    }
  },
};

const actions = {
  async carregarPessoas({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.get('/pessoas');
      commit('CARREGAR_PESSOAS', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addPessoa({ commit }, novaPessoa) {
    const pessoaComID = { ...novaPessoa, id: Math.floor(Math.random() * 1000) }; // gera um id aleatorio para o cadastro

    commit('SET_LOADING', true);
    try {
      const response = await api.post('/pessoas', pessoaComID);
      commit('ADD_PESSOA', response.data);
      toast.success('Dados salvos com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao salvar os dados.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async deletarPessoa({ commit }, id) {
    commit('SET_LOADING', true);
    try {
      await api.delete(`/pessoas/${id}`);
      commit('DELETAR_PESSOA', id);
      toast.success('Dado deletado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao deletar o dado.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async atualizarPessoa({ commit }, pessoaAtualizada) {
    commit('SET_LOADING', true);
    try {
      await api.put(`/pessoas/${pessoaAtualizada.id}`, pessoaAtualizada);
      commit('ATUALIZAR_PESSOA', pessoaAtualizada);
      toast.success('Dado atualizado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar os dados.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  listarPessoas: (state) => state.pessoas,
  isLoading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
