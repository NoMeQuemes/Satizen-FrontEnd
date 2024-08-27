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
                    <p>Tu sesión está por expirar</p>
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

export default {
    name: "SessionWarningModal",
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {
        logout() {
            const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            modal.hide();
            logout();
            window.location.reload();
        },
        countDown(){

        }

        


    }
}
</script>