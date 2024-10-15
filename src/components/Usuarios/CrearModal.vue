<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear usuario</h1>
                    <button @click="limpiarArreglo" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <label class="form-label">Nombre de usuario: </label>
                            <input type="text" class="form-control" v-model="usuario.nombreUsuario" autocomplete="of">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Correo: </label>
                            <input type="email" class="form-control" v-model="usuario.correo" autocomplete="of">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Contraseña: </label>
                            <input type="password" class="form-control" v-model="usuario.password" autocomplete="of">
                        </div>
                        <div class="select">
                            <label class="form-label">Roles:</label>
                            <select v-model="usuario.idRoles" class="form-select" aria-label="Default select example">
                                <option v-for="rol in listaRoles" :key="rol.idRol" :value="rol.idRol">
                                    {{ rol.nombre }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="limpiarArreglo" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="crearUsuario">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { ref, reactive, onMounted, defineEmits } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'vue3-toastify'

const emit = defineEmits(['actualizarUsuarios']);

let listaRoles = ref([]);

let usuario = reactive({
    nombreUsuario: "",
    correo: "",
    password: "",
    idRoles: 0
});

onMounted(() => {
    listarRoles()
})

function crearUsuario() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    const token = localStorage.getItem("token");
    axiosFunction.post("Acceso/RegistrarUsuario", usuario, {
        Headers: {
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

function limpiarArreglo() {
    usuario.nombreUsuario = "";
    usuario.correo = "";
    usuario.password = "";
    usuario.idRoles = 0;
}

function listarRoles() {
    const token = localStorage.getItem("token");
    axiosFunction.get("Usuarios/ListarRoles", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(resultado => {
            listaRoles.value = resultado.data.resultado;
        })
        .catch((error) => {
            console.log(error);
        })
}

</script>