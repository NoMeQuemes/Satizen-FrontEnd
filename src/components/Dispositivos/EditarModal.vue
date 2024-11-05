<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Dispositivo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <input type="hidden" v-model="dispositivo.idDispositivo">
                        </div>
                        <div class="select">
                            <label class="form-label">Personal Asignado:</label>
                            <select v-model="dispositivo.idPersonal" class="form-select"
                                aria-label="Default select example">
                                <option v-for="personal in listaPersonal" :key="personal.idPersonal"
                                    :value="personal.idPersonal">
                                    {{ personal.nombrePersonal }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label class="form-label">Celular: </label>
                            <input type="text" class="form-control" v-model="dispositivo.numDispositivo">
                        </div>
                        <div class="">
                            <label class="form-label">Observaciones del Dispositivo: </label>
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="editarDispositivo(idDispositivo)" type="button" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive, ref, toRef, onMounted, watch, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import { toast } from 'vue3-toastify';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';



let dispositivo = reactive({
    idDispositivo: 0,
    idPersonal: 0,
    numDispositivo: 0,
    observacionDispositivo: "",
    estadoDispositivo:""
    
});

let listaPersonal= ref([]);
const props = defineProps({
    idDispositivo: {
        type: Number,
        required: true
    },
    listaPersonal: {
        type: Array,
        required: true
    }

})
const idDispositivo = toRef(props, 'idDispositivo');
const emits = defineEmits(["actualizarDispositivo"]);

onMounted(() => {
    listarPersonal();
    if (idDispositivo.value) {
        identificarDispositivo(idDispositivo.value);
    }
})

watch(idDispositivo, (nuevoId) => {
    if (nuevoId) {
        identificarDispositivo(nuevoId);
    }
}, { immediate: true });


function identificarDispositivo(id) {
    axiosFunction.get(`Dispositivos/ListarPorId/${id}`)
        .then(resultado => {
            const data = resultado.data.resultado;
            dispositivo.idDispositivo = data.idDispositivo;
            dispositivo.idPersonal = data.idPersonal;
            dispositivo.numDispositivo = data.numDispositivo;
            dispositivo.observacionDispositivo = data.observacionDispositivo;
            dispositivo.estadoDispositivo = data.estadoDispositivo;
        })
        .catch((error) => {
            console.log("Error al obtener el dispositivo", error);
        })
}

function editarDispositivo(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    axiosFunction.put(`Dispositivos/ActualizarDispositivo/${id}`, dispositivo)
        .then(() => {
            emits('actualizarDispositivo')
            toast.success("Realizado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })

        })
        .catch((error) => {
            console.log("Error al editar dispositivo", error);
            toast.error("Error al actualizar", {
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