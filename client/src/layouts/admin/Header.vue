<template>
    <div class="header">
      <input type="text" placeholder="Search" class="search-input" />
    </div>
  </template>
  
  <style scoped>
  .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ddd;
}

.search-input {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  width: 300px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #3f51b5;  /* Đổi màu khi focus */
  box-shadow: 0 0 5px rgba(63, 81, 181, 0.5);
}

  </style>
  