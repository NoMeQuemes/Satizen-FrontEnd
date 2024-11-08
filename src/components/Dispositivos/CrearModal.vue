<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Dispositivo</h1>
                    <button @click="limpiarArreglo" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <label class="form-label">Personal Asignado: </label>
                            <select v-model="dispositivo.idPersonal" class="form-select" aria-label="Default select example">
                                <option v-for="personal in listaPersonal" :key="personal.idPersonal" :value="personal.idPersonal">
                                    {{ personal.nombrePersonal }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Celular: </label>
                            <input type="text" class="form-control" v-model="dispositivo.numDispositivo">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Observaciones del Dispositivo: </label>
                            <textarea 
                            class="form-control" 
                            v-model="dispositivo.observacionDispositivo"
                            rows="3">
                            </textarea>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Estado: </label>
                                <select class="form-control" v-model="dispositivo.estadoDispositivo">
                                    <option value="" disabled>Selecciona un estado</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="limpiarArreglo" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="crearDispositivos">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { reactive, defineEmits } from 'vue';
import { toast } from 'vue3-toastify'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ref } from 'vue';
import { onMounted } from 'vue';

let dispositivo = reactive({
    idPersonal: 0,
    numDispositivo: 0,
    observacionDispositivo: "",
    estadoDispositivo: ""
    
});

const emit = defineEmits(['actualizarDispositivo']);

let listaPersonal = ref([]);

onMounted(() => {
    listarPersonal()
})


function crearDispositivos(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    axiosFunction.post("Dispositivos/CrearDispositivo", dispositivo)
        .then(() => {
            emit('actualizarDispositivo')
            toast.success("Realizado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((error) => {
            console.log(error);
            toast.error("Error", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
}
function listarPersonal() {
    axiosFunction.get("Personal/ListarPersonal")
        .then(resultado => {
            listaPersonal.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error);
        })
}


</script>