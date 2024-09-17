import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default {
  methods: {
    expirationSession() {
      const infoUser = JSON.parse(localStorage.getItem("dataUser"));

      const expirationTime = infoUser.expToken * 1000;
      const warningTime = expirationTime - 4 * 60 * 1000;
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
          // Espera a que el DOM se actualice
          const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
          modal.show();
        });
      }
    },
  },
};
