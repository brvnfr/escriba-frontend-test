import { createStore } from 'vuex';
import pessoas from '@/store/pessoas';
import produtos from '@/store/produtos.js';
import pedidos from '@/store/pedidos.js';
const store = createStore({
  modules: {
    pessoas,
    produtos,
    pedidos,
  },
});

export default store;
