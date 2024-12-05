import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

//Directivas
import roleDirective from "./Functions/directivas";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Usa solo una versión del CSS
import "bootstrap/dist/js/bootstrap.bundle";



//Funciones propias
import axiosFunction from "./Functions/axios"; //funciones propias de axios (librería para usar APIs)
import { formatDate } from "./Functions/formatDate";

//Librerias extra
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const pinia = createPinia();

const app = createApp(App);

app.config.globalProperties.$axios = axiosFunction;
app.config.globalProperties.$formatDate = formatDate;
app.use(LoadingPlugin);

app.use(router);
app.use(pinia);

//Registrar directivas
app.directive('rol', roleDirective);
app.mount("#app");
