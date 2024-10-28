<template>
  <div class="favourites-page">
    <h2>Danh sách sản phẩm yêu thích</h2>
    <div class="favourite-item" v-for="item in favourites" :key="item.id">
      <!-- Phần ảnh sản phẩm -->
      <div class="favourite-item-image">
        <img :src="item.image" alt="Product Image" @click="goToProductDetail(item.id)" />
      </div>
      
      <!-- Phần thông tin sản phẩm -->
      <div class="favourite-item-details">
        <h3>{{ item.name }}</h3>
        <p>Giá: {{ item.price.toLocaleString() }}₫</p>
        
        <!-- Nút xóa sản phẩm -->
        <button class="remove-button" @click="removeFromFavourites(item.id)">Xóa</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Lấy danh sách sản phẩm yêu thích từ localStorage
const favourites = ref(JSON.parse(localStorage.getItem('favourites')) || []);
const router = useRouter();

// Điều hướng đến trang chi tiết sản phẩm
const goToProductDetail = (id) => {
  router.push(`/product/${id}`);
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
const removeFromFavourites = (id) => {
  favourites.value = favourites.value.filter(item => item.id !== id);
  localStorage.setItem('favourites', JSON.stringify(favourites.value));
};
</script>

<style scoped>
.favourites-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.favourite-item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.favourite-item-image img {
  width: 150px;
  border-radius: 8px;
  cursor: pointer;
}

.favourite-item-details {
  flex: 1;
  padding-left: 20px;
}

.favourite-item-details h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.favourite-item-details p {
  margin: 5px 0;
}

.remove-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #e53935;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
