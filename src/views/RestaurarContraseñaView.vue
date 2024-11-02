<template>
    <div class="contenedor">
        <h2>Recuperar contraseña</h2>
        <div class="cuerpo">
            <p>Recuerde verificar su correo antes de enviarlo</p>
            <form>
            <div class="">
                <label class="form-label">Ingrese su correo: </label>
                <input  class="form-control" type="email" v-model="correo">
            </div>
            <div class="mt-2">
                <button @click.prevent="restaurarContraseña" class="btn btn-success">Enviar</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import axiosFunction from '@/Functions/axios';
import axios from 'axios';

let correo = ref("")

function restaurarContraseña(){
    axios.
    console.log("Correo para restaurar contraseña: ", correo)
}

</script>

<style scoped>
.contenedor{
    display: flex;
    flex-direction: column;
    padding: 50px;
}

h2{
    align-items: center;
    text-align: center;
}

.cuerpo{
    margin-top: 50px;
    width: 500px;
}

</style>