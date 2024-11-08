<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear institución</h1>
                    <button @click="limpiarArreglo" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="">
                            <label class="form-label">Nombre de institución: </label>
                            <input type="text" class="form-control" v-model="institucion.nombreInstitucion" required>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Dirección: </label>
                            <input type="text" class="form-control" v-model="institucion.direccionInstitucion" required>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Teléfono: </label>
                            <input type="number" class="form-control" v-model="institucion.telefonoInstitucion" required>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Correo: </label>
                            <input type="email" class="form-control" v-model="institucion.correoInstitucion" required>
                        </div>
                        <div class="">
                            <label for="" class="form-label">Celular: </label>
                            <input type="number" class="form-control" v-model="institucion.celularInstitucion" value="null" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button @click="limpiarArreglo" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="crearInstitucion">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { reactive, defineEmits } from 'vue';
import { toast } from 'vue3-toastify'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

let institucion = reactive({
    nombreInstitucion: null,
    direccionInstitucion: null,
    telefonoInstitucion: null,
    correoInstitucion: null,
    celularInstitucion: null

});

const emit = defineEmits(['actualizarUsuarios']);


function crearInstitucion() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
    axiosFunction.post("Institucion/CrearInstitucion", institucion)
        .then(() => {
            limpiarArreglo();
            emit('actualizarUsuarios')
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

function limpiarArreglo() {
    institucion.nombreInstitucion = "";
    institucion.direccionInstitucion = "";
    institucion.telefonoInstitucion = 0;
    institucion.correoInstitucion = "";
    institucion.celularInstitucion = 0;
}


</script>