import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';

//Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

//Funciones propias
import axiosFunction from "./Functions/axios"; //funciones propias de axios (librería para usar APIs)

//Librerias extra
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const pinia = createPinia();

const app = createApp(App);


app.config.globalProperties.$axios = axiosFunction;
app.use(LoadingPlugin);

app.use(router);
app.use(pinia);
app.mount("#app");