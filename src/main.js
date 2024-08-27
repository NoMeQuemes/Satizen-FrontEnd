import { createApp } from 'vue'
import App from './App.vue'

//Bootstrap
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//Funciones propias
import axiosFunction from './Functions/axios'
import decodeJwt from './Functions/decodeJwt'
import logout from './Functions/logout'

//Librerias extra
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);

app.config.globalProperties.$axios = axiosFunction;
app.config.globalProperties.$jwtDecode = decodeJwt;
app.config.globalProperties.$logout = logout;
app.use(LoadingPlugin);

app.use(router).mount('#app')
