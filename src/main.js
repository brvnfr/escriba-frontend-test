import { createApp } from 'vue';
import '@/assets/style.scss';
import App from './App.vue';
import router from './router';
import store from './store';

//Toast
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

// Font Awesome configuration
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faBarsStaggered, faUser, faUsers, faFile, faStore } from '@fortawesome/free-solid-svg-icons';
library.add(faBars, faBarsStaggered, faUser, faUsers, faFile, faStore);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
