<template>
    <div class="contenedor">
        <Spinner :isLoading="IsLoading" :can-cancel="false" :is-full-page="false"
            @update:isLoading="IsLoading = $event" />
        <div class="header">
            <NavBarUsuario></NavBarUsuario>
        </div>
        <div class="cuerpo">
            <!-- Encabezado del bloque -->
            <div class="headerTbl">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 10c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m6.39 8.56C16.71 11.7 14.53 11 12 11s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 15.22V22h2v-6.78c0-.38.2-.72.5-.88C7.71 13.73 9.63 13 12 13c.76 0 1.47.07 2.13.2l-1.55 3.3H9.75C8.23 16.5 7 17.73 7 19.25S8.23 22 9.75 22H18c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66M10.94 20H9.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.89zM18 20h-4.85l2.94-6.27c.54.2 1.01.41 1.41.61c.3.16.5.5.5.88z" />
                </svg>
                <h5>¿Tienes un problema?</h5>
            </div>
            <!-- Cuerpo del bloque -->
            <div class="bodyTbl">
                <p class="textBodyTbl">
                    Llena el campo de abajo describiendo tu problema para que sea atendido por el personal médico
                </p>
                <form>
                    <div class="form-floating">
                        <textarea class="form-control" v-model="llamado.observacionLlamado"></textarea>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end botones">
                        <input type="reset" value="Reiniciar" class="btn btn-primary me-md-2">
                        <button @click="realizarLLamado" class="btn btn-success" type="button">Enviar</button>
                    </div>
                </form>
            </div>
            <!-- Pie del bloque -->
            <div class="pieTbl">
                <div class="" @click="realizarLlamadoUrgente">
                    <svg class="btnAlert" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 16 16">
                        <rect width="16" height="16" fill="none" />
                        <path fill="currentColor"
                            d="M.584 2.223a.5.5 0 0 1 .693-.14l1.5 1.001a.5.5 0 0 1-.554.832l-1.5-1a.5.5 0 0 1-.139-.693M8 2a4.5 4.5 0 0 0-4.5 4.5v2.401l-.964 2.413A.5.5 0 0 0 3 12h10a.5.5 0 0 0 .464-.685L12.5 8.9V6.5A4.5 4.5 0 0 0 8 2m0 12.5A2 2 0 0 1 6.063 13h3.874A2 2 0 0 1 8 14.5m6.723-12.416a.5.5 0 0 1 .554.832l-1.5 1a.5.5 0 0 1-.554-.832zM0 6.5A.5.5 0 0 1 .5 6H2a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5M15.5 6a.5.5 0 0 1 0 1H14a.5.5 0 0 1 0-1z" />
                    </svg>
                </div>
                <p>Si tienes una urgencia presiona el botón rojo</p>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <ModalCrearLLamada v-if="modalCrearLLamada"></ModalCrearLLamada>


</template>

<script setup>
import NavBarUsuario from '@/components/NavBarUsuario.vue';
import { reactive, ref, nextTick } from 'vue';
import axiosFunction from '@/Functions/axios';
import Spinner from '@/components/Spinner.vue';
import { toast } from "vue3-toastify";
import ModalCrearLLamada from '@/components/ModalCrearLLamada.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const dataUser = JSON.parse(localStorage.getItem('dataUser'));
let IsLoading = ref(false);
let modalCrearLLamada = ref(false);

let llamado = reactive({
    idPaciente: dataUser.idUsuario,
    observacionLlamado: ""
});

function realizarLLamado() {
    IsLoading.value = true;
    axiosFunction.post("Llamado/AgregarLlamadoPaciente", llamado)
        .then(() => {
            toast.success("Realizado con exito", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
            limpiarCampo();
            IsLoading.value = false;
        })
        .catch((error) => {
            toast.error("Error al realizar la petición", {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(error)
            IsLoading.value = false;
        })
}



function limpiarCampo() {
    llamado.idPaciente = 0;
    llamado.observacionLlamado = ""
}

function realizarLlamadoUrgente() {
    modalCrearLLamada.value = true;
    nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById("staticModalLlamado"));
        modal.show();
    })
}

</script>

<style scoped>
.cuerpo {
    display: flex;
    width: 70%;
    min-height: 380px;
    margin: 130px auto;
    -webkit-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    border-radius: 20px;
    flex-direction: column;
    padding: 10px;
}

.headerTbl {
    display: flex;
    padding-left: 10px;
}

h5 {
    padding-left: 10px;
}

.bodyTbl {
    margin-top: 20px;
}

.textBodyTbl {
    font-size: small;
    flex-grow: 1;
}

textarea {
    resize: none;
}

.botones {
    margin-top: 10px;
}

.pieTbl {
    margin-top: 90px;
    display: flex;
    align-items: center;
}

.btnAlert {
    background-color: red;
    border-radius: 50%;
    padding: 5px;
    color: white;
    cursor: pointer;
}

.btnAlert:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.pieTbl p {
    width: 200px;
    margin-left: 10px;
    line-height: 15px;
}

@media (max-width: 480px) {
    h5 {
        font-size: 0.9rem;
    }

    .btnAlert {
        width: 36px;
        height: 36px;
    }

    .pieTbl p {
        font-size: 0.8rem;
    }
}
</style>