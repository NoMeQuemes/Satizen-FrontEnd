<template>
    <div class="contenedor">
        <div class="spinner-container">
            <Spinner :isLoading="IsLoading" :can-cancel="false" :is-full-page="false"
                @update:isLoading="IsLoading = $event" />
        </div>
        <div class="cuerpo">
            <h4>Cambiar Contraseña</h4>
            <div class="linea"></div>
            <p>Ingresa tu contraseña nueva</p>
            <form>
                <div class="input-container">
                    <input placeholder="Contraseña nueva" class="form-control" type="password"
                        v-model="newPassword.password">
                </div>
                <div class="input-container">
                    <input placeholder="Repite tu contraseña" class="form-control" type="password"
                        v-model="newPassword.repeatedPassword">
                </div>
                <div class="botones">
                    <router-link :to="{ name: 'login' }" class="btn btn-primary">Cancelar</router-link>
                    <button @click.prevent="cambiarPassword" class="btn btn-success">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axiosFunction from '@/Functions/axios';
import { onMounted, ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from "vue3-toastify";
import { useRouter } from 'vue-router';

const newPassword = reactive({
    password: "",
    repeatedPassword: ""
});
const route = useRoute();
const recoveryToken = ref('');
const router = useRouter();
let IsLoading = ref(false);

onMounted(() => {
    recoveryToken.value = route.query.token
})

const isPasswordMatch = computed(() => {
    return newPassword.password === newPassword.repeatedPassword && newPassword.password !== "";
});

function cambiarPassword() {
    if (isPasswordMatch.value) {
        IsLoading.value = true;
        axiosFunction.patch("Acceso/CambiarContraseña", { password: newPassword.password, recoveryToken: recoveryToken.value })
            .then(() => {
                IsLoading.value = false;
                router.push({ name: 'login', query: { toast: 'success' } });
            })
            .catch((error) => {
                IsLoading.value = false;
                console.log(error)
                router.push({ name: 'login', query: { toast: 'error'} });
            })

    } else {
        toast.error("Las contraseñas no coinciden o son invalidas", {
            autoClose: 5000,
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
}




</script>


<style scoped>
.contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 0 1rem; /* Espaciado lateral para pantallas pequeñas */
}

.cuerpo {
    width: 100%;
    max-width: 500px; /* Tamaño máximo para pantallas más grandes */
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
    width: 100%;
}

.botones {
    display: flex;
    flex-direction: column; /* Botones apilados en móviles */
    gap: 0.5rem;
    justify-content: space-between;
}

.botones .btn {
    width: 100%; /* Botones ocupan todo el ancho en móviles */
}

@media (min-width: 768px) {
    .botones {
        flex-direction: row; /* Botones en línea en pantallas grandes */
    }

    .botones .btn {
        width: auto; /* Restaurar tamaño automático en botones */
    }
}
</style>