<template>
  <router-view />
  <session-warning-modal v-if="showModal"></session-warning-modal>
</template>

<script>
import SessionWarningModal from './components/SessionWarningModal.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default {
  name: 'AppView',
  components: {
    'session-warning-modal': SessionWarningModal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    expirationSession() {
      let infoUser = null;
      infoUser = JSON.parse(localStorage.getItem("dataUser"));

      const expirationTime = infoUser.expToken * 1000;
      const warningTime = expirationTime - 1 * 60 * 1000;
      const currentTime = Date.now();

      if (currentTime < warningTime) {
        setTimeout(() => {
          this.showModal = true;
          this.$nextTick(() => {
            const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
            modal.show();
          });
        }, warningTime - currentTime);
      } else if (currentTime >= warningTime && currentTime < expirationTime) {
        this.showModal = true;
        this.$nextTick(() => {
          const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
          modal.show();
        });
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;

}
</style>
