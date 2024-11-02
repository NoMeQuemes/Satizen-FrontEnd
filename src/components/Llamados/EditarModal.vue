<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar LLamado</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <label>Paciente: </label>
                            <select v-model="llamado.idPaciente" class="form-select"
                                aria-label="Default select example">
                                <option v-for="paciente in listaPacientes" :key="paciente.idPaciente"
                                    :value="paciente.idPaciente">
                                    {{ paciente.nombrePaciente }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label>Personal: </label>
                            <select v-model="llamado.idPersonal" class="form-select"
                                aria-label="Default select example">
                                <option v-for="personal in listaPersonal" :key="personal.idPersonal"
                                    :value="personal.idPersonal">
                                    {{ personal.nombrePersonal }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label class="form-label">Estado del llamado: </label>
                            <select v-model="llamado.estadoLlamado" class="form-select" aria-label="Default select example">
                                <option>Pendiente</option>
                                <option>En progreso</option>
                                <option>Completado</option>
                            </select>
                        </div>
                        <div class="">
                            <label class="form-label">Prioridad: </label>
                            <select v-model="llamado.prioridadLlamado" class="form-select" aria-label="Default select example">
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                                <option>Informativa</option>
                            </select>
                        </div>
                        <div class="">
                            <label class="form-label">Observación: </label>
                            <input type="text" class="form-control" v-model="llamado.observacionLlamado">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="editarLlamado(idLlamado)" type="button" class="btn btn-primary">Guardar
                        Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, toRef, reactive, ref, onMounted, watch, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'vue3-toastify'


let llamado = reactive({
    idLlamado: 0,
    idPaciente: 0,
    idPersonal: null,
    estadoLlamado: "",
    prioridadLlamado: "",
    observacionLlamado: ""
})
const props = defineProps({
    idLlamado: {
        type: Number,
        Required: true
    }
})
let listaPacientes = ref([]);
let listaPersonal = ref([]);

const idLlamado = toRef(props, 'idLlamado');
const emits = defineEmits(['actualizarLlamados']);

onMounted(() => {
    listarPacientes(),
    listarPersonal(),
    identificarLlamado(idLlamado.value)
})

watch(idLlamado, (nuevoLlamado) => {
    identificarLlamado(nuevoLlamado)
}), {inmediate : true };

function editarLlamado(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    axiosFunction.put(`Llamado/ActualizarLlamado/${id}`, llamado)
        .then(() => {
            emits('actualizarLlamados')
            toast.success("Realizado con exito", {
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

function identificarLlamado(id){
    axiosFunction.get(`Llamado/ListarPorID/${id}`)
        .then(resultado => {
            const data = resultado.data;
            llamado.idLlamado = data.idLlamado;
            llamado.idPaciente = data.idPaciente;
            llamado.idPersonal = data.idPersonal;
            llamado.estadoLlamado = data.estadoLlamado;
            llamado.prioridadLlamado = data.prioridadLlamado;
            llamado.observacionLlamado = data.observacionLlamado;
        })
        .catch((error) => {
            console.log(error);
        })
}

function listarPacientes(){
    axiosFunction.get("/Llamado/ListarPacientes")
        .then(resultado => {
            listaPacientes.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error)
        })
}

function listarPersonal(){
    axiosFunction.get("Llamado/ListarPersonal")
        .then(resultado => {
            listaPersonal.value = resultado.data.resultado
        })
        .catch((error) => {
            console.log(error)
        })
}

</script>