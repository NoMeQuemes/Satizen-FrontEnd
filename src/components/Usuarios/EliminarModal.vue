<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de querer eliminar este usuario?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="eliminarDoctor()" type="button" class="btn btn-primary">Sí, eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import axiosFunction from '@/Functions/axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from "vue3-toastify";


const props = defineProps({
    idUsuario: {
        type: Number,
        Required: true
    }
});

const emit = defineEmits(['actualizarUsuarios']);

function eliminarDoctor() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalDelete'));
    modal.hide();
    const token = localStorage.getItem("token");
    axiosFunction.patch(`Usuarios/EliminarUsuario/${props.idUsuario}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(() => {
            emit('actualizarUsuarios')
            toast.success("Usuario eliminado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
        .catch((error) => {
            console.log(error)
        })
}

</script>