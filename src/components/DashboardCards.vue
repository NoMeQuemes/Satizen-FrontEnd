<template>
  <div class="dashboard-container">
    <div class="dashboard-cards">
      <div class="card" v-for="card in cards" :key="card.title">
        <div class="card-info">
          <h3>{{ card.title }}</h3>
          <p>{{ card.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        cards: [
          { title: 'Asignaciones', count: 17 },
          { title: 'Personal', count: 41 },
          { title: 'Pacientes', count: 105 },
          { title: 'Sectores', count: 23 }
        ]
      }
    }
  }
  </script>
  
  <style scoped>

.dashboard-container {

  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #e0e0e000; 
  border-radius: 10px;
  margin-bottom: 5px; 
}

.dashboard-cards {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f911;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 150px; 
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
.card-info h3 {
  font-size: 16px;
  color: #333;
}

.card-info p {
  font-size: 24px;
  color: #666;
  font-weight: bold;
}

  </style>
  