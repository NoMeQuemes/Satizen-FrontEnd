<template>
    <div class="conteiner">
        <div class="spinner-container">
            <Spinner :isLoading="loginStore.IsLoading" :can-cancel="false" :is-full-page="false"
                @update:isLoading="loginStore.IsLoading = $event" />
        </div>

        <div class="row">
            <!-- Formulario -->
            <div class="col">
                <div class="formHead">
                    <h1>Inicia sesión en tu cuenta</h1>
                </div>
                <form class="formulario">
                    <div class="">
                        <label for="" class="form-label">Usuario</label>
                        <input type="text" class="form-control" v-model="usuario.nombreUsuario">
                    </div>
                    <div class="">
                        <label for="" class="form-label">Contraseña</label>
                        <input type="password" name="" id="" class="form-control" v-model="usuario.password">
                    </div>
                    <div class="">
                        <button class="btn btn-success" @click.prevent="login()">Iniciar Sesión</button>
                    </div>
                </form>
                <p>¿No tienes una cuenta? Regístrate <router-link :to="`/register`">aquí</router-link> </p>
            </div>

            <!-- Logo -->
            <div class="col">

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