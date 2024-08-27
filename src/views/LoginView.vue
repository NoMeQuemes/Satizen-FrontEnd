<template>
    <div class="container">
        <div class="spinner-container">
            <spinner-component
                :isLoading="IsLoading"
                :can-cancel="false"
                :is-full-page="false"
                @update:isLoading="IsLoading = $event"
            />
        </div>
        <form>
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
    </div>
</template>

<script>
import axiosFunction from '@/Functions/axios';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Spinner from '@/components/Spinner.vue';
import { decodeJwt } from '@/Functions/decodeJwt';


export default {
    name: 'LoginView',
    data() {
        return {
            usuario: {
                nombreUsuario: '',
                password: ''
            },
            IsLoading: false
        }
    },
    components: {
        "spinner-component": Spinner
    },
    methods: {
        login() {
            this.IsLoading = true; // Se inicia el spinner
            axiosFunction.post("Acceso/Login", this.usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => {

                    //Se agrega al localStorage los token de acceso
                    localStorage.setItem('token', resultado.data.token);
                    localStorage.setItem('refreshToken', resultado.data.refreshToken);

                    decodeJwt();
                    this.IsLoading = false; //Finaliza el spinner
                    
                    this.$router.push({ name: 'home' }) 


                    
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.status == 400){
                        toast.warning("Datos Ingresados Incorrectos", {
                            autoClose: 2000,
                            position: toast.POSITION.BOTTOM_RIGHT,

                        })
                    }
                    this.IsLoading = false;


                });
        },



        
    }
}




</script>

<style></style>