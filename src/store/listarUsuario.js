import { defineStore } from "pinia";
import axiosFunction from "@/Functions/axios";
import { useDecodeJwT } from "./decodeJwt";
import { ref } from "vue";

export const useListarUsuario = defineStore("listarUsuario", () => {
  const decodeJwtStore = useDecodeJwT();
  let usuario = ref([]);

  function imagenPerfil() {
    axiosFunction
      .get(`Usuarios/ListarPorId/${decodeJwtStore.dataUser.idUsuario}`)
      .then((resultado) => {
        console.log("Resultado de traer al usuario: ", resultado);
        usuario.value = resultado.data.resultado;
        console.log("Arreglo de el usuario: ", usuario.value);
      })
      .catch((error) => {
        console.log(error);
      });

    function getImageUrl(imageUrl) {
      // Si la URL es relativa, convierte a absoluta
      return `http://localhost:7298/${imageUrl}`; // Ajusta esto según la base de tu API
    }

    localStorage.setItem("image", getImageUrl(usuario.value.imagenPerfilUrl));
  }

  return{
    imagenPerfil
  }
});
