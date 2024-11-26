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
                <div class="input-container">
                    <input placeholder="Correo Electrónico..." class="form-control" type="email" v-model="correo">
                </div>
                <div class="botones">
                    <router-link :to="{ name: 'login' }" class="btn btn-primary">Cancelar</router-link>
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
    padding: 0 1rem; /* Espaciado lateral en pantallas pequeñas */
}

.cuerpo {
    width: 100%;
    max-width: 500px; /* Tamaño máximo para pantallas grandes */
    padding: 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    background-color: #fff;
}

.cuerpo h4 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.linea {
    border: 1px solid gray;
    margin-bottom: 1rem;
}

.cuerpo p {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
}

.input-container {
    margin-bottom: 1.5rem;
}

.cuerpo input {
    height: 45px;
    padding: 0.5rem;
    border-radius: 8px;
    font-size: 0.95rem;
}

.botones {
    display: flex;
    flex-direction: column; /* Default para pantallas pequeñas */
    gap: 0.5rem;
    justify-content: space-between;
}

.botones .btn {
    width: 100%; /* Botones a pantalla completa en móviles */
}

@media (min-width: 768px) {
    .botones {
        flex-direction: row; /* Botones en línea para pantallas medianas y grandes */
    }

    .botones .btn {
        width: auto; /* Restaurar tamaño automático para botones */
    }
}
</style>