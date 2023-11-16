import { createToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
export default {
  success(message) {
    createToast.success(message);
  },
  error(message) {
    createToast.error(message);
  },
};
