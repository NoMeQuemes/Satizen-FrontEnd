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
                    <p>Tu sesión está por expirar en {{ sessionWarningStore.countdown }} segundos.</p>
                    <p>¿Quieres extenderla?</p>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
                    <button @click="sessionWarningStore.extendSession" type="button" class="btn btn-primary">Extender Sesión</button>
                    <button @click="sessionWarningStore.redirectLogout" type="button" class="btn btn-primary">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSessionWarning } from '@/store/sessionWarning';
import { onMounted } from 'vue';

const sessionWarningStore = useSessionWarning();

onMounted(() => {
    sessionWarningStore.startCountDown();
});



</script>