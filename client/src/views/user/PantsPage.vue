<template>
  <div class="category-page">
    <!-- Phần banner -->
    <div class="banner">
      <img src="https://file.hstatic.net/1000253775/collection/quan_21e5189d2b274104a6c7b15d6cc52d59_master.png" alt="Shirts Banner" />
    </div>
    
    <!-- Phần sắp xếp sản phẩm -->
    <div class="sort-section">
      <label for="sort">Sắp xếp:</label>
      <select id="sort" v-model="sortOption" @change="sortProducts">
        <option value="featured">Sản phẩm nổi bật</option>
        <option value="price-asc">Giá: Tăng dần</option>
        <option value="price-desc">Giá: Giảm dần</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
      </select>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <router-link
        v-for="product in paginatedProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-item"
      >
        <div class="product-image">
          <img :src="product.image" alt="Product Image" />
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price.toLocaleString() }}₫</p>
        </div>
      </router-link>
    </div>

    <!-- Phân trang -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">❮</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const shirts = ref([]);
const sortOption = ref('featured');
const currentPage = ref(1);  // Trang hiện tại
const itemsPerPage = ref(12); // Số sản phẩm mỗi trang
const totalPages = ref(1); // Tổng số trang
const paginatedProducts = ref([]); // Sản phẩm phân trang

// Lấy danh sách sản phẩm từ API
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:1007/products');
    shirts.value = response.data.filter((product) => product.category.toLowerCase().includes('quần'));

    // Cập nhật số lượng trang
    totalPages.value = Math.ceil(shirts.value.length / itemsPerPage.value);

    // Phân trang lần đầu
    paginateProducts();
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
  }
});

// Hàm sắp xếp sản phẩm
const sortProducts = () => {
  let sorted = [...shirts.value];
  switch (sortOption.value) {
    case 'price-asc':
      sorted.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
      break;
    case 'price-desc':
      sorted.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  shirts.value = sorted;
  paginateProducts(); // Phân trang lại sau khi sắp xếp
};

// Phân trang
const paginateProducts = () => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  paginatedProducts.value = shirts.value.slice(start, end);
};

// Chuyển sang trang trước
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    paginateProducts();
  }
};

// Chuyển sang trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    paginateProducts();
  }
};
</script>

<style scoped>
/* Styles cho trang CategoryPage */
.category-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

/* Layout danh sách sản phẩm */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

/* Mỗi sản phẩm */
.product-item {
  width: 23%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
}

.product-item:hover {
  transform: scale(1.05);
}

/* Hình ảnh sản phẩm */
.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Thông tin sản phẩm */
.product-info {
  padding: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: capitalize;
  color: #333;
}

.product-price {
  color: #ff0000;
  font-size: 16px;
  font-weight: bold;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.banner img {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

/* CSS cho phần sắp xếp */
.sort-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sort-section select {
  padding: 10px;
  border-radius: 5px;
  margin-left: 10px;
  border: 1px solid #ccc;
}
</style>
