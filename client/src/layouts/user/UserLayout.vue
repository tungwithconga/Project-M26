<template>
    <div>
      <Header/>
      <main>
        <router-view></router-view>
      </main>
      <Footer/>
    </div>
  </template>
  
  <script setup>
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  </script>
  
  <style scoped>
  main {
    padding: 20px;
    background-color: #f4f4f4;
    min-height: calc(100vh - 200px); 
  }
  </style>
  