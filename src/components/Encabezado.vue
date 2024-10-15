<template>
  <header class="top-bar">
    <div class="top-bar-container">
      <div class="menu-button">
        <i class="fas fa-bars"></i>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Buscar..." class="search-input" />
        <i class="fas fa-search search-icon"></i>
      </div>
      <div class="profile-section">
        <i class="fas fa-bell"></i>
        <div class="profile-pic">
          <img src="@/assets/Ellipse.png" alt="Perfil" class="profile-img" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
};
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 10px;
  left: 20%;
  right: 0;
  height: auto;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  padding: 10px;
  max-width: 75%;
  z-index: 1;
}

.top-bar-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Tres columnas: Menú, Buscador, Perfil */
  align-items: center;
  gap: 20px; /* Espacio entre los elementos */
  max-width: 1200px; /* Limita el ancho total del navbar */
  margin: 0 auto; /* Centra el contenido */
  width: 100%;
}

.menu-button i {
  font-size: 24px;
  cursor: pointer;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-self: start; /* Coloca el buscador más a la izquierda */
}

.search-input {
  width: 100%;
  padding: 8px 40px 8px 15px; /* Deja espacio para el ícono dentro del input */
  border: none;
  border-radius: 50px;
  font-size: 16px;
  background-color: #D9D9D9;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
  cursor: pointer;
}

.profile-section {
  display: flex;
  justify-self: end; /* Alinea el perfil a la derecha */
  align-items: center;
}

.profile-pic {
  margin-left: 20px;
}

.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
