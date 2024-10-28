<template>
    <div class="admin-layout">
      <!-- Menu bên trái -->
      <Menu />
      <div class="main-content">
        <!-- Header phía trên -->
        <Header />
        <!-- Nội dung trang thay đổi ở giữa -->
        <div class="page-content">
          <router-view />  <!-- Nội dung các trang Dashboard, Products, Settings... -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Menu from './Menu.vue'
  import Header from './Header.vue'
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .page-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

  </style>
  