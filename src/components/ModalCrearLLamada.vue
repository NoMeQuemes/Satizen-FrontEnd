<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalLlamado" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Llamado de emergencia</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de querer realizar un llamado urgente?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="enviarLlamadoUrgente" type="button" class="btn btn-primary">Sí</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { reactive } from 'vue';
import { toast } from "vue3-toastify";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const dataUser = JSON.parse(localStorage.getItem('dataUser'));

let llamado = reactive({
    idPaciente: dataUser.idUsuario,
    prioridadLlamado: null
});

function enviarLlamadoUrgente(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalLlamado'));
    modal.hide();
    axiosFunction.post("Llamado/AgregarLlamadoPaciente", llamado)
        .then(() => {
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
            });
        })
    // console.log("Datos del pedido urgente: ", JSON.stringify(llamado) )
}


</script>