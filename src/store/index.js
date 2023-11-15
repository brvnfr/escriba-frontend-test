import { createStore } from 'vuex';
import pessoas from './pessoas.module.js';
// import produtos from './produtos.module.js';
// import pedidos from './pedidos.module.js';
const store = createStore({
  modules: {
    pessoas,
    // products,
    // orders,
  },
});

export default store;
