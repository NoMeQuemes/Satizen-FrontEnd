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
                <div class="">
                    <input placeholder="Contraseña nueva" class="form-control" type="password"
                        v-model="newPassword.password">
                </div>
                <div class="">
                    <input placeholder="Repite tu contraseña" class="form-control" type="password"
                        v-model="newPassword.repeatedPassword">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <router-link :to="{ name: 'login' }" class="btn btn-primary"> Cancelar </router-link>
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