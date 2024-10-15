<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Institución</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <input type="hidden" v-model="institucion.idInstitucion">
                        </div>
                        <div class="">
                            <label class="form-label">Nombre de institución: </label>
                            <input type="text" class="form-control" v-model="institucion.nombreInstitucion">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Dirección: </label>
                            <input type="text" class="form-control" v-model="institucion.direccionInstitucion">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Teléfono: </label>
                            <input type="number" class="form-control" v-model="institucion.telefonoInstitucion">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Correo: </label>
                            <input type="email" class="form-control" v-model="institucion.correoInstitucion">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Celular: </label>
                            <input type="number" class="form-control" v-model="institucion.celularInstitucion">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="actualizarInstitucion(idInstitucion)" type="button" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { reactive, defineProps, toRef, onMounted, watch, defineEmits } from 'vue';
import { toast } from 'vue3-toastify';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

let institucion = reactive({
    idInstitucion: 0,
    nombreInstitucion: "",
    direccionInstitucion: "",
    telefonoInstitucion: 0,
    correoInstitucion: "",
    celularInstitucion: 0
})

const props = defineProps({
    idInstitucion: {
        type: Number,
        Required: true
    }
})


const emit = defineEmits(['actualizarInstitucion']);
const idInstitucion = toRef(props, 'idInstitucion');

onMounted(() => {
    identificarInstitucion(idInstitucion.value)
})

watch(idInstitucion, (nuevaInstitucion) => {
    identificarInstitucion(nuevaInstitucion)
}), { inmediate: true }

function identificarInstitucion(id){
    axiosFunction.get(`Institucion/ListarPorId/${id}`)
        .then(resultado => {
            const data = resultado.data;
            institucion.idInstitucion = data.idInstitucion;
            institucion.nombreInstitucion = data.nombreInstitucion;
            institucion.direccionInstitucion = data.direccionInstitucion;
            institucion.telefonoInstitucion = data.telefonoInstitucion;
            institucion.correoInstitucion = data.correoInstitucion;
            institucion.celularInstitucion = data.celularInstitucion;
        })
        .catch((error) => {
            console.log(error);
        })
}

function actualizarInstitucion(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModalUpdate'));
    modal.hide();
    axiosFunction.put(`Institucion/ActualizarInstitucion/${id}`, institucion )
        .then(() => {
            emit('actualizarInstitucion')
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


</script>