<template>
    <div class="contenedor">
        <div class="spinner-container">
            <Spinner :isLoading="IsLoading" :can-cancel="false" :is-full-page="false"
                @update:isLoading="IsLoading = $event" />
        </div>
        <div class="cuerpo">
            <h4>Recuperar tu cuenta</h4>
            <div class="linea"></div>
            <p>Ingresa tu correo electrónico para buscar tu cuenta.</p>
            <form>
                <div class="">
                    <input placeholder="Correo Electrónico..." class="form-control" type="email" v-model="correo">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <router-link :to="{ name: 'login' }" class="btn btn-primary"> Cancelar </router-link>
                    <button @click.prevent="restaurarContraseña" class="btn btn-success">Enviar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal -->
    <RestaurarPasswordModal v-if="IsShowModal" :correo="correo"></RestaurarPasswordModal>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import axiosFunction from '@/Functions/axios';
import Spinner from '@/components/Spinner.vue';
import { toast } from "vue3-toastify";
import RestaurarPasswordModal from '@/components/RestaurarPasswordModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


let correo = ref("");
let IsLoading = ref(false);
let IsShowModal = ref(false);

function restaurarContraseña() {
    IsLoading.value = true;
    axiosFunction.patch("Acceso/RecuperarContraseña", {correo: correo.value})
        .then(resultado => {
            console.log(resultado)
            IsLoading.value = false;
            IsShowModal.value = true;
            nextTick(() => {
                const modal = new bootstrap.Modal(document.getElementById("staticModal"));
                modal.show();
            })
        })
        .catch((error) => {
            console.log(error)
            IsLoading.value = false;
            toast.error(`${error.response.data.errorMessages}`, {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        })
}

</script>

<style scoped>
.contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.cuerpo {
    width: 500px;
    padding: 1rem;
    -webkit-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    border-radius: 20px
}

.cuerpo h4 {
    text-align: center;
}

.linea {
    border: 1px solid gray;
}

.cuerpo p {
    margin-top: 15px;
}

.cuerpo input {
    height: 45px;
    margin-bottom: 20px
}
</style>