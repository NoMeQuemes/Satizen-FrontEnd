<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Asignar Llamado</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <p>Asigne alguien del personal para atender el llamado</p>
                    </div>
                    <form>
                        <div class="">
                            <label for="" class="form-label">Personal</label>
                            <select v-model="asignacion.idPersonal" class="form-select"
                                aria-label="Default select example">
                                <option v-for="personal in listaPersonal" :key="personal.idPersonal"
                                    :value="personal.idPersonal">
                                    {{ personal.nombrePersonal }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="asignarLlamado(idLlamado)" type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, toRef, onMounted, ref, reactive, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import { toast } from 'vue3-toastify'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


let asignacion = reactive({
    idPersonal: 0
});

const props = defineProps({
    idLlamado: {
        type: Number,
        Required: true
    }
})

const idLlamado = toRef(props, 'idLlamado')
let listaPersonal = ref([]);
const emits = defineEmits(['actualizarLlamados']);

onMounted(() => {
    listarPersonal()
})

function asignarLlamado(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    axiosFunction.patch(`Llamado/AsignarLlamado/${id}`, asignacion)
        .then(() => {
            emits('actualizarLlamados')
            toast.success("Llamado asignado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((error) => {
            console.log(error)
            toast.error("Error", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}

function listarPersonal() {
    axiosFunction.get("Llamado/ListarPersonal")
        .then(resultado => {
            console.log("Resultado de la request de personal: ", resultado);
            listaPersonal.value = resultado.data.resultado;
            console.log("Arreglo de personales: ", listaPersonal)
        })
        .catch((error) => {
            console.log(error);
        })
}

</script>