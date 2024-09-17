<template>
    <div class="container">
        <div class="spinner-container">
            <spinner-component :isLoading="IsLoading" :can-cancel="false" :is-full-page="false"
                @update:isLoading="IsLoading = $event" />
        </div>
        <h1>Crea una cuenta para iniciar</h1>
        <form>
            <div class="">
                <label class="form-label">Usuario: </label>
                <input class="form-control" type="text" v-model="usuario.nombreUsuario">
            </div>
            <div class="">
                <label class="form-label">Correo:</label>
                <input type="email" class="form-control" v-model="usuario.correo">
            </div>
            <div class="">
                <label class="form-label">Rol</label>
                <input class="form-control" type="number" value="1" v-model="usuario.idRoles" disabled>
            </div>
            <div>
                <label for="" class="form-label">Contraseña:</label>
                <input type="password" class="form-control" v-model="usuario.password">
            </div>
            <!-- <div>
                <label for="" class="form-label">Confirma contraseña: </label>
                <input type="password" class="form-control">
            </div> -->
            <div>
                <button class="btn btn-success" @click.prevent="register()">Registrarse</button>
            </div>
        </form>
        <p>¿Ya tienes una cuenta?Registraté <router-link :to="`/`">aquí</router-link></p>
    </div>

</template>

<script>
import axiosFunction from '@/Functions/axios';
import Spinner from '@/components/Spinner.vue';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
    name: 'RegisterView',
    data() {
        return {
            usuario: {
                nombreUsuario: "",
                correo: "",
                password: "",
                idRoles: 1
            },
            IsLoading: false
        }
    },
    components:{
        "spinner-component": Spinner
    },
    methods: {
        register(){
            this.IsLoading = true;
            axiosFunction.post("Acceso/RegistrarUsuario", this.usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => {
                    console.log(resultado);
                    this.IsLoading = false;
                    if(resultado.data.statusCode == 200){
                        toast.success("Se ha registrado correctamente", {
                            autoClose: 5000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    }
                })
                .catch( error => {
                    console.log(error)
                    this.IsLoading = false;
                    if (error.response.status == 400) {
                        toast.warning("Error al registrar", {
                            autoClose: 5000,
                            position: toast.POSITION.BOTTOM_RIGHT,

                        })
                    }
                })

            console.log(this.usuario)
        }
    }
}
</script>