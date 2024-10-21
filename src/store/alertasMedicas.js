import axiosFunction from "@/Functions/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertasMedicas = defineStore("alertasMedicas", () => {
    let listaLlamados = ref([]);
    
    function listarLlamados(){
        axiosFunction.get("Llamado/ListarLlamados")
            .then(resultado => {
                console.log(resultado);
                listaLlamados.value = resultado.data.resultado;
                console.log("Arreglo con los llamados: ",listaLlamados);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return {
        listarLlamados,
        listaLlamados
    }
})