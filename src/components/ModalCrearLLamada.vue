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
                    <button type="button" class="btn btn-primary">Sí</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axiosFunction from '@/Functions/axios';
// import { reactive, defineEmits } from 'vue';
// import { toast } from "vue3-toastify";

// const dataUser = JSON.parse(localStorage.getItem('dataUser'));

// let llamado = reactive({
//     idPaciente: dataUser.idUsuario
// });

// const emit = defineEmits(['actualizarPaciente'])

// function enviarLlamadoURgente(){
//     axiosFunction.post("Llamado/AgregarLlamadoPaciente", llamado)
//         .then(() => {
//             emit('actualizarPaciente')
//             toast.success("Realizado con exito", {
//                 autoClose: 5000,
//                 position: toast.POSITION.BOTTOM_RIGHT
//             })
//         })
// }


</script>