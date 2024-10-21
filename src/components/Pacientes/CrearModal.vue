<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Paciente</h1>
                    <button @click="limpiarArreglo()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
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
                        <div class="">
                            <label for="" class="form-label">Dni: </label>
                            <input type="number" class="form-control" v-model="paciente.dni">
                        </div>
                        <div class="">
                            <label for="" class="form-label">N° Habitación: </label>
                            <input type="number" class="form-control" v-model="paciente.numeroHabitacionPaciente">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Observación: </label>
                            <textarea class="form-control" v-model="paciente.observacionPaciente"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="limpiarArreglo()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="crearUsuario" type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'vue3-toastify'

let paciente = reactive({
    idUsuario: 0,
    idInstitucion: 0,
    nombrePaciente: "",
    apellido: "",
    dni: 0,
    numeroHabitacionPaciente: 0,
    observacionPaciente: ""
})
let listaInstituciones = ref([]);
let listaUsuarios = ref([]);

const emit = defineEmits(['actualizarPacientes']);

onMounted(() => {
    listarInstituciones(),
    listarUsuarios()
})

function crearUsuario() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    axiosFunction.post("Pacientes/CrearPaciente", paciente)
        .then(() => {
            limpiarArreglo();
            emit('actualizarPacientes')
            toast.success("Realizado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((error) => {
            limpiarArreglo();
            console.log(error);
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

function limpiarArreglo(){
    paciente.idUsuario = 0,
    paciente.idInstitucion = 0,
    paciente.nombrePaciente = "",
    paciente.apellido = "",
    paciente.dni = 0,
    paciente.numeroHabitacionPaciente = 0,
    paciente.observacionPaciente = ""
}

</script>