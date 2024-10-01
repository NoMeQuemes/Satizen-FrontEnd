import { defineStore } from "pinia";
import { nextTick, ref } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axiosFunction from '@/Functions/axios';
import router from '@/router';
import { useLogoutStore } from "./logout";
import { useExpirationSession } from "./expirationSession";
// import { decodeJwt } from "@/Functions/decodeJwt";
import { useDecodeJwT } from "./decodeJwt";

export const useSessionWarning = defineStore("sessionWarning", () => {
    const decodeJwtStore = useDecodeJwT();
    const expirationSession = useExpirationSession();
    const logoutStore = useLogoutStore();
    let countDownInterval = null;
    let countdown = ref(60);

    function startCountDown() {
        countdown.value = 60;
    
        countDownInterval = setInterval(() => {
    
            countdown.value--;
    
            if (countdown.value === 0) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                modal.hide();
                endCountDown();
                logoutStore.logout();
                nextTick(() => {
                    expirationSession.showModal = false
                });
            }
        }, 1000)
    }

    function extendSession() {
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
                decodeJwtStore.decodeJwt();
                axiosFunction.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    
                const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                modal.hide();
    
                endCountDown();
    
                nextTick(() => {
                    expirationSession.showModal = false;
                    expirationSession.expirationSession();
                });
    
    
            })
            .catch(error => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                console.log(error);
                router.push({ name: 'login' });
            });
    }

    function redirectLogout() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
        endCountDown();
        logoutStore.logout();
        nextTick(() => {
            expirationSession.showModal = false;
        });
    }

    function endCountDown() {
        console.log("Entrando a la función endCountDown...")
        if (countDownInterval) {
            console.log("Entrando a la condición de endCountDown...")
            clearInterval(countDownInterval);
            countDownInterval = null;
            countdown.value = 60;
        }
    }


    return {
        countDownInterval,
        countdown,
        startCountDown,
        extendSession,
        redirectLogout,
        endCountDown
    }
})