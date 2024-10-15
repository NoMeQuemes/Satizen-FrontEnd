<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <input type="hidden" v-model="usuario.idUsuario">
                        </div>
                        <div class="">
                            <label class="form-label">Nombre de Usuario:</label>
                            <input class="form-control" type="text" v-model="usuario.nombreUsuario">
                        </div>
                        <div class="">
                            <label class="form-label">Correo: </label>
                            <input class="form-control" type="text" v-model="usuario.correo">
                        </div>
                        <div class="select">
                            <label class="form-label">Roles:</label>
                            <select v-model="usuario.idRoles" class="form-select"
                                aria-label="Default select example">
                                <option v-for="rol in roles" :key="rol.idRol"
                                    :value="rol.idRol">
                                    {{ rol.nombre }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="actualizarUsuario(idUsuario)">Guardar
                        Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, watch, toRef, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'vue3-toastify'

let usuario = reactive({
    idUsuario: 0,
    nombreUsuario: "",
    correo: "",
    idRoles: 0
})

let roles = reactive([]);

const props = defineProps({
    idUsuario: {
        type: Number,
        Required: true
    }
})

const emit = defineEmits(['actualizarUsuarios']);
const idUsuario = toRef(props, 'idUsuario');

onMounted(() => {
    identificarUsuario(idUsuario.value);
    listarRoles();
})

watch(idUsuario, (nuevoUsuario) => {
    identificarUsuario(nuevoUsuario)
}, { inmediate: true });

function identificarUsuario(id) {
    const token = localStorage.getItem("token");
    axiosFunction.get(`Usuarios/ListarPorId/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(resultado => {
            const data = resultado.data.resultado;
            usuario.idUsuario = data.idUsuario;
            usuario.nombreUsuario = data.nombreUsuario;
            usuario.correo = data.correo;
            usuario.idRoles = data.idRoles;
        })
        .catch((error) => {
            console.log(error)
        })
}


function actualizarUsuario(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    const token = localStorage.getItem("token");
    axiosFunction.put(`Usuarios/ActualizarUsuario/${id}`, usuario, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(() => {
            emit('actualizarUsuarios')
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

function listarRoles() {
    const token = localStorage.getItem("token");
    axiosFunction.get("Usuarios/ListarRoles", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(resultado => {
            roles = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error);
        })
}

</script>