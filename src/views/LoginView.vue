<template>
    <div class="contenedor">
        <div class="spinner-container">
            <Spinner :isLoading="loginStore.IsLoading" :can-cancel="false" :is-full-page="false"
                @update:isLoading="loginStore.IsLoading = $event" />
        </div>

        <div class="caja">
            <!-- Formulario -->
            <div class="cajaFormulario">
                <!-- <h4 class="titulo">Inicia sesión en tu cuenta</h4> -->
                <form class="formulario">
                    <div class="opciones">
                        <label class="form-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
                            </svg>
                            Usuario
                        </label>
                        <input type="text" class="form-control" v-model="usuario.nombreUsuario">
                    </div>
                    <div class="opciones">
                        <label class="form-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M9 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2" />
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M5.25 8v1.303q-.34.023-.642.064c-.9.12-1.658.38-2.26.981c-.602.602-.86 1.36-.981 2.26c-.117.867-.117 1.97-.117 3.337v.11c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h8.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26s-1.36-.86-2.26-.981a10 10 0 0 0-.642-.064V8a6.75 6.75 0 0 0-13.5 0M12 2.75A5.25 5.25 0 0 0 6.75 8v1.253q.56-.004 1.195-.003h8.11q.635 0 1.195.003V8c0-2.9-2.35-5.25-5.25-5.25m-7.192 8.103c-.734.099-1.122.28-1.399.556c-.277.277-.457.665-.556 1.4c-.101.755-.103 1.756-.103 3.191s.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h8c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191s-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.277-.277-.665-.457-1.4-.556c-.755-.101-1.756-.103-3.191-.103H8c-1.435 0-2.437.002-3.192.103"
                                    clip-rule="evenodd" />
                            </svg>
                            Contraseña
                        </label>
                        <input type="password" name="" id="" class="form-control" v-model="usuario.password">
                    </div>
                    <p class="enlace">¿Olvidaste tu contraseña? <router-link :to="`/restaurarContraseña`">Entrá aquí</router-link> </p>
                    <div class="cajitaBoton">
                        <button class="btn btn-success" @click.prevent="login()">Iniciar Sesión</button>
                    </div>
                </form>
            </div>

            <!-- Logo -->
            <div class="cajaLogo">
                <img src="../assets/Logo-satizen.png">
            </div>


        </div>

    </div>
</template>

<script setup>
import { useLoginStore } from '@/store/login';
import { reactive } from 'vue';
import Spinner from '@/components/Spinner.vue';

const loginStore = useLoginStore();

const usuario = reactive({
    nombreUsuario: "",
    password: ""
});

const login = () => {
    loginStore.login(usuario)
}

</script>

<style scoped>
.contenedor {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.caja {
    display: flex;
    height: 80vh;
    width: 70vw;
    -webkit-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    box-shadow: 13px 17px 22px -4px rgba(0, 0, 0, 0.48);
    border-radius: 20px;
}

.cajaFormulario {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
}

.form-label{
    display: flex;
}

.form-label{
    margin-top: 10px;
}

.form-label svg{
    margin-right: 5px;
}

.cajitaBoton {
    display: flex;
    align-items: center;
    justify-content: center;
}

.enlace{
    font-size: 13px;
    padding: 5px;
}

.cajaFormulario button {
    margin-top: 20px;
}

.cajaLogo {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(237, 108, 119, 1);
    border-radius: 20px;
}
</style>