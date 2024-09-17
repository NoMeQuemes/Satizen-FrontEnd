<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Advertencia de Sesión</h1>
                </div>
                <div class="modal-body">
                    <p>Tu sesión está por expirar en {{ countdown }} segundos.</p>
                    <p>¿Quieres extenderla?</p>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
                    <button @click="extendSession" type="button" class="btn btn-primary">Extender Sesión</button>
                    <button @click="logout" type="button" class="btn btn-primary">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logout from '@/Functions/logout';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axiosFunction from '@/Functions/axios';
import router from '@/router';
import { decodeJwt } from '@/Functions/decodeJwt';

export default {
    name: "SessionWarningModal",
    data() {
        return {
            countdown: 60,
            countDownInterval: null
        }
    },
    mounted() {
        this.startCountDown();
    },
    methods: {
        startCountDown() {
            this.countdown = 60;

            this.countDownInterval = setInterval(() => {

                this.countdown--;

                if (this.countdown === 0) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                    modal.hide();
                    this.endCountDown();
                    logout();
                    this.$nextTick(() => {
                        this.$root.showModal = false;
                    });
                }
            }, 1000)
        },

        extendSession() {
            const datosAcceso = {
                token: localStorage.getItem('token'),
                refreshToken: localStorage.getItem('refreshToken')
            }

            axiosFunction.post('Acceso/RefreshToken', datosAcceso, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resultado => {

                    const newToken = resultado.data.token;
                    const newRefreshToken = resultado.data.refreshToken;

                    localStorage.setItem('token', newToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    decodeJwt();
                    axiosFunction.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                    modal.hide();

                    this.endCountDown();

                    this.$nextTick(() => {
                        this.$root.showModal = false;
                        this.$root.expirationSession();
                    });


                })
                .catch(error => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    console.log(error);
                    router.push({ name: 'login' });
                });
        },

        logout() {
            const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
            modal.hide();
            this.endCountDown();
            logout();
            this.$nextTick(() => {
                this.$root.showModal = false;
            });
        },


        endCountDown() {
            if (this.countDownInterval) {
                clearInterval(this.countDownInterval);
                this.countDownInterval = null;
                this.countdown = 60;
            }
        }


    }
}
</script>