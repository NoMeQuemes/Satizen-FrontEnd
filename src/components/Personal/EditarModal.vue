<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Personal</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <input type="hidden" v-model="personal.idPersonal">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Nombre: </label>
                            <input type="text" class="form-control" v-model="personal.nombrePersonal">
                        </div>
                        <div class="select">
                            <label class="form-label">Institucion:</label>
                            <select v-model="personal.idInstitucion" class="form-select"
                                aria-label="Default select example">
                                <option v-for="institucion in listaInstituciones" :key="institucion.idInstitucion"
                                    :value="institucion.idInstitucion">
                                    {{ institucion.nombreInstitucion }}
                                </option>
                            </select>
                        </div>
                        <div class="select">
                            <label class="form-label">Usuario:</label>
                            <select v-model="personal.idUsuario" class="form-select"
                                aria-label="Default select example">
                                <option v-for="usuario in listaUsuarios" :key="usuario.idUsuario"
                                    :value="usuario.idUsuario">
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="editarPersonal(idPersonal)" type="button" class="btn btn-primary">Guardar Cambios</button>
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



let personal = reactive({
    idPersonal: 0,
    idInstitucion: 0,
    idUsuario: 0,
    nombrePersonal: "",
    celularPersonal: 0,
    telefonoPersonal: 0,
    correoPersonal: ""
})
let listaInstituciones = ref([]);
let listaUsuarios = ref([]);
const props = defineProps({
    idPersonal: {
        type: Number,
        Required: true
    }
})
const idPersonal = toRef(props, 'idPersonal');
const emits = defineEmits(["actualizarPersonal"]);

onMounted(() => {
    listarInstituciones(),
    listarUsuarios(),
    identificarPersonal(idPersonal.value)
})

watch(idPersonal, (nuevoPersonal) => {
    identificarPersonal(nuevoPersonal)
}), { inmediate: true }


function identificarPersonal(id) {
    axiosFunction.get(`Personal/ListarPorId/${id}`)
        .then(resultado => {
            const data = resultado.data;
            personal.idPersonal = data.idPersonal;
            personal.idInstitucion = data.idInstitucion;
            personal.idUsuario = data.idUsuario;
            personal.nombrePersonal = data.nombrePersonal;
            personal.celularPersonal = data.celularPersonal;
            personal.telefonoPersonal = data.telefonoPersonal;
            personal.correoPersonal = data.correoPersonal;
        })
        .catch((error) => {
            console.log(error);
        })
}

function editarPersonal(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    axiosFunction.put(`Personal/ActualizarPersonal/${id}`, personal)
        .then(() => {
            emits('actualizarPersonal')
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