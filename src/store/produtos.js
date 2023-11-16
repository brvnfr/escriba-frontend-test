import api from '@/services/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const state = {
  produtos: [],
  loading: false,
};

const mutations = {
  CARREGAR_PRODUTOS(state, produtos) {
    state.produtos = produtos;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  ADD_PRODUTO(state, novoProduto) {
    state.produtos.push(novoProduto);
  },
  DELETAR_PRODUTO(state, id) {
    state.produtos = state.produtos.filter((produto) => produto.id !== id);
  },
  ATUALIZAR_PRODUTO(state, produtoAtualizado) {
    const index = state.produtos.findIndex((produto) => produto.id === produtoAtualizado.id);
    if (index !== -1) {
      state.produtos.splice(index, 1, produtoAtualizado);
    }
  },
};

const actions = {
  async carregarProdutos({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.get('/produtos');
      commit('CARREGAR_PRODUTOS', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addProduto({ commit }, novoProduto) {
    const produtoComID = { ...novoProduto, id: Math.floor(Math.random() * 1000) };

    commit('SET_LOADING', true);
    try {
      const response = await api.post('/produtos', produtoComID);
      commit('ADD_PRODUTO', response.data);
      toast.success('Produto adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao adicionar o produto.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async deletarProduto({ commit }, id) {
    commit('SET_LOADING', true);
    try {
      await api.delete(`/produtos/${id}`);
      commit('DELETAR_PRODUTO', id);
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao deletar o produto.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async atualizarProduto({ commit }, produtoAtualizado) {
    commit('SET_LOADING', true);
    try {
      await api.put(`/produtos/${produtoAtualizado.id}`, produtoAtualizado);
      commit('ATUALIZAR_PRODUTO', produtoAtualizado);
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o produto.');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  listarProdutos: (state) => state.produtos,
  isLoading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
