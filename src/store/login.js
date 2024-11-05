import axiosFunction from "@/Functions/axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
// import { useExpirationSession } from "./expirationSession";
import { useDecodeJwT } from "./decodeJwt";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useListarUsuario } from "./listarUsuario";

export const useLoginStore = defineStore("login", () => {
  const decodeJwtStore = useDecodeJwT();
  // const expirationSession = useExpirationSession();
  const router = useRouter();
  let IsLoading = ref(false);
  const listarUsuarioStore = useListarUsuario();

  function login(usuario) {
    IsLoading.value = true;
    axiosFunction
      .post("Acceso/Login", usuario, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resultado) => {
        //Se agrega al localStorage los token de acceso
        localStorage.setItem("token", resultado.data.token);
        localStorage.setItem("refreshToken", resultado.data.refreshToken);

        decodeJwtStore.decodeJwt();
        // expirationSession.expirationSession();
        IsLoading.value = false;
        listarUsuarioStore.imagenPerfil(); //Esto trae la url de la imagen de perfil
        router.push({ name: "home", query: { toast: 'success' } });
      })
      .catch((error) => {
        console.log(error);
        IsLoading.value = false;
        toast.error("Datos ingresados incorrectos", {
          autoClose: 5000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  }

  return {
    login,
    IsLoading,
  };
});
