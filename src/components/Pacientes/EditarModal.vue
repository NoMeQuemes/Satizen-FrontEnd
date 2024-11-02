<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Paciente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
                        <div class="">
                            <input type="hidden" v-model="paciente.idPaciente">
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Nombre: </label>
                            <input type="text" class="form-control" v-model="paciente.nombrePaciente">
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Apellido: </label>
                            <input type="text" class="form-control" v-model="paciente.apellido">
                        </div>
                        <div class="select col-md-6">
                            <label class="form-label">Institucion:</label>
                            <select v-model="paciente.idInstitucion" class="form-select"
                                aria-label="Default select example">
                                <option v-for="institucion in listaInstituciones" :key="institucion.idInstitucion"
                                    :value="institucion.idInstitucion">
                                    {{ institucion.nombreInstitucion }}
                                </option>
                            </select>
                        </div>
                        <div class="select col-md-6">
                            <label class="form-label">Usuario:</label>
                            <select v-model="paciente.idUsuario" class="form-select"
                                aria-label="Default select example">
                                <option v-for="usuario in listaUsuarios" :key="usuario.idUsuario"
                                    :value="usuario.idUsuario">
                                    {{ usuario.nombreUsuario }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Dni: </label>
                            <input type="number" class="form-control" v-model="paciente.dni">
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Dirección: </label>
                            <input type="text" class="form-control" v-model="paciente.direccionPaciente">
                        </div>
                        <div class="">
                            <label for="" class="form-label">N° Habitación: </label>
                            <input type="number" class="form-control" v-model="paciente.numeroHabitacionPaciente">
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Celular: </label>
                            <input type="number" class="form-control" v-model="paciente.celularPaciente">
                        </div>
                        <div class="col-md-6">
                            <label for="" class="form-label">Celular Acompañante: </label>
                            <input type="number" class="form-control" v-model="paciente.celularAcompañante">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Observación: </label>
                            <textarea class="form-control" v-model="paciente.observacionPaciente"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="editarPaciente(idPaciente)" type="button" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, defineProps, toRef, watch, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import { toast } from 'vue3-toastify'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

let paciente = reactive({
    idPaciente: 0,
    idInstitucion: 0,
    idUsuario: 0,
    nombrePaciente: "",
    apellido: "",
    dni: 0,
    numeroHabitacionPaciente: 0,
    observacionPaciente: "",
    direccionPaciente: "",
    celularPaciente: 0,
    celularAcompañante: null
})
let listaInstituciones = ref([]);
let listaUsuarios = ref([]);
const props = defineProps({
    idPaciente: {
        type: Number,
        Required: true
    }
})
const idPaciente = toRef(props, 'idPaciente');
const emits = defineEmits(['actualizarPacientes']);

onMounted(() => {
    listarInstituciones();
    listarUsuarios();
    identificarPaciente(idPaciente.value)
})

watch(idPaciente, (nuevoPaciente) => {
    identificarPaciente(nuevoPaciente)
}), {inmediate : true };

function identificarPaciente(id){
    axiosFunction.get(`Pacientes/ListarPorId/${id}`)
        .then(resultado => {
            const data = resultado.data;
            paciente.idUsuario = data.idUsuario;
            paciente.idInstitucion = data.idInstitucion;
            paciente.nombrePaciente = data.nombrePaciente;
            paciente.apellido = data.apellido;
            paciente.dni = data.dni;
            paciente.numeroHabitacionPaciente = data.numeroHabitacionPaciente;
            paciente.observacionPaciente = data.observacionPaciente;
            paciente.celularPaciente = data.celularPaciente;
            paciente.celularAcompañante = data.celularAcompañante;
        })
        .catch((error) => {
            console.log(error)
        })
}

function editarPaciente(id){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    axiosFunction.put(`Pacientes/ActualizarPaciente/${id}`, paciente)
        .then(() => {
            emits('actualizarPacientes')
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

function listarInstituciones() {
    axiosFunction.get("Institucion/ListarInstituciones")
        .then(resultado => {
            listaInstituciones.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error);
        })
}

function listarUsuarios() {
    axiosFunction.get("Usuarios/ListarUsuarios")
        .then(resultado => {
            listaUsuarios.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error)
        })
}

</script>