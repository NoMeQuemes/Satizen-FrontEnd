<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Correo Enviado</h1>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <p>Se envío un correo a <b>{{ correo }}</b>. Ve a tu bandeja de correos para seguir con el proceso</p>
                </div>
                <div class="modal-footer">
                    <button @click.prevent="redirigir" type="button" class="btn btn-primary">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue';
import { useRouter } from 'vue-router';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const router = useRouter();

const props = defineProps({
    correo: {
        type: Text,
        Required: true
    }
});

const correo = toRef(props, 'correo');

function redirigir(){
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticModal'));
    modal.hide();
    router.push({ name: 'login' })

}
</script>