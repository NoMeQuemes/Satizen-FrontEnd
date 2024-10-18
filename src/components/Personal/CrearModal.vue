<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Personal</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <label for="" class="form-label">Nombre: </label>
                            <input type="text" class="form-control" v-model="personal.nombrePersonal">
                        </div>
                        <div class="select">
                            <label class="form-label">Institucion:</label>
                            <select v-model="personal.idInstitucion" class="form-select" aria-label="Default select example">
                                <option v-for="institucion in listaInstituciones" :key="institucion.idInstitucion" :value="institucion.idInstitucion">
                                    {{ institucion.nombreInstitucion }}
                                </option>
                            </select>
                        </div>
                        <div class="select">
                            <label class="form-label">Usuario:</label>
                            <select v-model="personal.idUsuario" class="form-select" aria-label="Default select example">
                                <option v-for="usuario in listaUsuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                                    {{ usuario.nombreUsuario }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label class="form-label">Celular: </label>
                            <input type="number" class="form-control" v-model="personal.celularPersonal">
                        </div>
                        <div class="">
                            <label class="form-label">Telefono: </label>
                            <input type="number" class="form-control" v-model="personal.telefonoPersonal">
                        </div>
                        <div class="">
                            <label class="form-label">Correo: </label>
                            <input type="email" class="form-control" v-model="personal.correoPersonal">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button @click="crearPersonal" type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { reactive, onMounted, ref, defineEmits } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'vue3-toastify'


let personal = reactive({
    idInstitucion: 0,
    idUsuario: 0,
    nombrePersonal: "",
    celularPersonal: 0,
    telefonoPersonal: 0,
    correoPersonal: ""
})
let listaInstituciones = ref([]);
let listaUsuarios = ref([]);

const emit = defineEmits(['actualizarPersonal'])

onMounted(() => {
    listarInstituciones(),
    listarUsuarios()
})

function crearPersonal(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    axiosFunction.post("Personal/CrearPersonal", personal)
        .then(() => {
            emit('actualizarPersonal')
            toast.success("Realizado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((error) => {
            console.log(error);
            toast.danger("Error", {
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

function listarUsuarios(){
    axiosFunction.get("Usuarios/ListarUsuarios")
        .then(resultado => {
            listaUsuarios.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>