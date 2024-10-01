import { defineStore } from "pinia";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ref, nextTick } from "vue";
import { useDecodeJwT } from "./decodeJwt";

export const useExpirationSession = defineStore("expirationSession", () => {
    const decodeJwtStore = useDecodeJwT();
    let showModal = ref(false);
    let countDownExpirationSession = ref(null);

    function expirationSession() {
        let infoUser = null;
        // infoUser = JSON.parse(localStorage.getItem("dataUser"));
        infoUser = decodeJwtStore.dataUser;
  
        const expirationTime = infoUser.expToken * 1000;
        const warningTime = expirationTime - 1 * 60 * 1000;
        const currentTime = Date.now();
  
        if (currentTime < warningTime) {
          countDownExpirationSession.value = setTimeout(() => {
            showModal.value = true;
            nextTick(() => {
              const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
              modal.show();
            });
          }, warningTime - currentTime);
        } else if (currentTime >= warningTime && currentTime < expirationTime) {
          showModal.value = true;
          nextTick(() => {
            const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
            modal.show();
          });
        }
      }

      function stopCountDownExpirationSession(){
        if(countDownExpirationSession.value !== null) {
          clearTimeout(countDownExpirationSession.value);
          countDownExpirationSession.value = null;
        }
      }

    return {
        showModal,
        countDownExpirationSession,
        expirationSession,
        stopCountDownExpirationSession
    }
})