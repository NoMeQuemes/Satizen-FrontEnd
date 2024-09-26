<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="top-bar">
        <div class="menu-button">
          <i class="fas fa-bars"></i>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Buscar..." class="search-input icon-button">
          <button class="icon-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="profile-section">
          <i class="fas fa-bell"></i>
          <div class="profile-pic">
            <img src="@/assets/Ellipse.png" alt="Perfil" class="profile-img">
          </div>
        </div>
      </header>
</template>

<script>
</script>

<style scoped>
  .top-bar {
    position: fixed;
    top: 20px;
    left: 300px;
    right: 20px;
    width: 80%;
    height: 80px;
    background-color: white;
    border-radius: 40px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
  }

  .menu-button i {
    font-size: 24px;
    cursor: pointer;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }
  
  .search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
  }

  .profile-section {
    display: flex;
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