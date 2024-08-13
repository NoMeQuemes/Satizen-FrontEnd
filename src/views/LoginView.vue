<template>
    <div class="container">
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

export default {
    name: 'LoginView',
    data() {
        return {
            // listarUsuarios: [],
            usuario: {
                nombreUsuario: '',
                password: ''
            }
        }
    },
    // setup() {
    //     //Toast
    //     toast("Primera tostada", {
    //         autoClose: 2000,
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //     });
    // },
    methods: {
        login() {
            // axiosFunction.get("Usuarios/ListarUsuarios")
            //     .then(resultado => {
            //         this.listarUsuarios = resultado.data.resultado;
            //         console.log(this.listarUsuarios);
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     });

            axiosFunction.post("Acceso/Login", this.usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => {
                    localStorage.setItem('token', resultado.data.token);
                    localStorage.setItem('refreshToken', resultado.data.refreshToken);
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

                });


        }


    }
}




</script>

<style></style>