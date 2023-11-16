import api from '@/services/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const state = {
  pedidos: [],
  loading: false,
};

const mutations = {
  CARREGAR_PEDIDOS(state, pedidos) {
    state.pedidos = pedidos;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  ADD_PEDIDO(state, novoPedido) {
    state.pedidos.push(novoPedido);
  },
  REMOVE_PEDIDO(state, id) {
    state.pedidos = state.pedidos.filter((pedido) => pedido.id !== id);
  },
  UPDATE_PEDIDO(state, pedidoAtualizado) {
    const index = state.pedidos.findIndex((pedido) => pedido.id === pedidoAtualizado.id);
    if (index !== -1) {
      state.pedidos.splice(index, 1, pedidoAtualizado);
    }
  },
};

const actions = {
  async carregarPedidos({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await api.get('/pedidos');
      commit('CARREGAR_PEDIDOS', response.data);
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async addPedido({ commit }, pedidoData) {
    try {
      const pedidoId = Math.floor(Math.random() * 1000) + 1;

      // Obter a data de emissão atual
      const dataEmissao = new Date().toISOString().split('T')[0];
      // Calcula o valor total do pedido
      const valorTotal = pedidoData.itens.reduce((total, item) => total + item.subtotal, 0);
      const pedido = {
        id: pedidoId,
        cliente: {
          id: pedidoData.cliente.id,
          nome: pedidoData.cliente.nome,
        },
        dataEmissao,
        valorTotal,
        itens: pedidoData.itens,
      };

      commit('ADD_PEDIDO', pedido);

      toast.success('Pedido adicionado com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao criar o pedido');
    }
  },
  async deletarPedido({ commit }, id) {
    commit('SET_LOADING', true);
    try {
      await api.delete(`/pedidos/${id}`);
      commit('REMOVE_PEDIDO', id);
      toast.success('Pedido removido com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao remover o pedido.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async atualizarPedido({ commit }, pedidoAtualizado) {
    commit('SET_LOADING', true);
    try {
      await api.put(`/pedidos/${pedidoAtualizado.id}`, pedidoAtualizado);
      commit('UPDATE_PEDIDO', pedidoAtualizado);
      toast.success('Pedido atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao atualizar o pedido.');
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  listarPedidos: (state) => state.pedidos,
  isLoading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
