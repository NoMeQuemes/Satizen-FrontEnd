<template>
  <div class="alertas" data-simplebar>
    <h2>Alertas Médicas</h2>
    <div class="cards-container">
      <div class="card-wrapper" v-for="(alert, index) in alerts" :key="index">
        <!-- Aplicar color dinámico a outer-card y card -->
        <div :class="['outer-card', alertLevelClass(alert.level)]">
          <div class="user-name">{{ alert.userName }}</div>

          <div :class="['card', alertLevelClass(alert.level)]">
            <div class="profile-pic"></div>
            <div class="card-content">
              <div class="card-details">
                <div>
                  <span>Doctor de cabecera:</span>
                  {{ alert.doctor }}
                </div>
                <div>
                  <span>Dirección: </span>
                  {{ alert.address }}
                </div>
                <div>
                  <span>Celular:</span>
                  {{ alert.phone }}
                </div>
                <div>
                  <span>Diagnóstico:</span>
                  {{ alert.diagnosis }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "AlertasMedicas",
  data() {
    return {
      alerts: [
        {
          userName: "Alex",
          doctor: "Sanches Carlos",
          address: "San Juan",
          phone: "2645259424",
          diagnosis: "Hepatitis",
          level: "alta", 
        },
        
        {
          userName: "Tony Stark",
          doctor: "Pérez Juan",
          address: "Buenos Aires",
          phone: "2645111122",
          diagnosis: "Anemia",
          level: "media", 
        },
      ],
    };
  },
  methods: {
    alertLevelClass(level) {
      switch (level) {
        case "alta":
          return "alerta-alta";
        case "media":
          return "alerta-media";
        case "baja":
          return "alerta-baja";
        case "informativa":
          return "alerta-informativa";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
/* =====================CONTENEDOR PRINCIPAL====================== */
.alertas {
  width: 100%;
  padding: 30px 100px 100px 100px;
  background-color: #ffffff;
  border-radius: 10px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* ======================TARJETAS DE ALERTAS======================= */
.alertas h2 {
  font-size: 22px; 
  color: #333;
  margin-bottom: 15px; 
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.card-wrapper {
  position: relative;
  width: 100%;
}

.outer-card {
  border-radius: 15px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .5); 
  padding: 5px 0 0 0; 
  overflow: hidden;
  border: none;
  margin-bottom: 20px;
  
  
}

.alerta-alta {
  background-color: #ff4c4c;
}

.alerta-media {
  background-color: #ffa500;
}

.alerta-baja {
  background-color: #ffe100;
}

.alerta-informativa {
  background-color: #5bc0de;
}

.user-name {
  font-size: 18px; 
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px; 
  margin-left: 80px; 
}

.card {
  display: grid;
  grid-template-columns: 80px 1fr; 
  border-radius: 8px; 
  width: 100%;
  border: none;
}

.profile-pic {
  width: 60px; 
  height: 60px; 
  border-radius: 50%;
  background-color: #ccc;
  margin: 5px; 
}

.card-content {
  background-color: #f9f9f9;
  padding: 6px; 
  border-radius: 30px 0 0;
  border: none;
}

.card-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px; 
}

.card-details div {
  padding: 1px; 
  border-radius: 5px;
  text-align: left;
  background-color: #f9f9f900;
  color: #555;
  margin-left: 5px;
}

.card-details div span {
  display: block;
  font-weight: bold;
  color: #333;
  font-size: 14px; 
}

/* ======================MEDIAQUERY PARA MONITERES DE 20 PULGADAS PARA ABAJO======================= */


@media (max-width: 20in) {
  .alertas {
    padding: 20px; 
  }

  .cards-container {
    gap: 5px; 
  }

  .card {
    grid-template-columns: 60px 1fr; 
  }

  .profile-pic {
    width: 40px; 
    height: 40px;
  }

 
}
</style>
