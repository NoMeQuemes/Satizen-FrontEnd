import axiosFunction from "@/Functions/axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useExpirationSession } from "./expirationSession";
import { useDecodeJwT } from "./decodeJwt";
import {ref} from 'vue';

export const useLoginStore = defineStore("login", () => {
  const decodeJwtStore = useDecodeJwT();
  const expirationSession = useExpirationSession();
  const router = useRouter();
  let IsLoading = ref(false);
  

  
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
      console.log("Se ha logueado correctamente");
      expirationSession.expirationSession();
      IsLoading.value = false;
      router.push({ name: `home` });
    })
    .catch((error) => {
      console.log(error);
      IsLoading.value = false;
    });
  }

  return {
    login,
    IsLoading
   };

});
