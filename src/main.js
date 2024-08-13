import { createApp } from 'vue'
import App from './App.vue'

//Bootstrap
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//Funciones propias
import axiosFunction from './Functions/axios'
import decodeJwt from './Functions/decodeJwt'

const app = createApp(App);

app.config.globalProperties.$axios = axiosFunction;
app.config.globalProperties.$jwtDecode = decodeJwt;


app.use(router).mount('#app')
