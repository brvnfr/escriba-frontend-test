import { createStore } from 'vuex';
import pessoas from '@/store/pessoas';
import produtos from './produtos.js';
// import pedidos from './pedidos.module.js';
const store = createStore({
  modules: {
    pessoas,
    produtos,
    // orders,
  },
});

export default store;
