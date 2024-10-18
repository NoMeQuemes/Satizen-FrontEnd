<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Personal</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de querer eliminar este personal?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="eliminarPersonal" type="button" class="btn btn-primary">Sí, eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { defineProps, defineEmits} from 'vue';
import { toast } from "vue3-toastify";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const props = defineProps({
    idPersonal: {
        type: Number,
        Required: true
    }
});

const emit = defineEmits(['actualizarPersonal'])

function eliminarPersonal(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalDelete'));
    modal.hide();
    axiosFunction.patch(`Personal/EliminarPersonal/${props.idPersonal}`)
        .then(() => {
            emit('actualizarPersonal')
            toast.success("Usuario eliminado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Error", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        })
    
}

</script>