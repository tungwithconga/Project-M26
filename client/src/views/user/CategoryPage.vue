<template>
  <div class="category-page">
    <h2>{{ category.name }}</h2>
    <p>{{ category.description }}</p>

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
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ product.price }}₫</p>
        </div>
      </router-link>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">❮</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// Biến lưu trạng thái
const route = useRoute();
const category = ref({});
const filteredProducts = ref([]);
const paginatedProducts = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(12); // Số sản phẩm trên mỗi trang
const totalPages = ref(1);
const categoryId = computed(() => route.params.id)

const fetchProductByCategory = async () => {
  try {
    // Fetch thông tin của danh mục theo id
    const categoryResponse = await axios.get(`http://localhost:1007/categories/${categoryId.value}`);
    category.value = categoryResponse.data;
  
    // Fetch các sản phẩm theo danh mục
    const productResponse = await axios.get('http://localhost:1007/products');
    filteredProducts.value = productResponse.data.filter(product => product.category === category.value.name);
  
    // Cập nhật số lượng trang
    totalPages.value = Math.ceil(filteredProducts.value.length / itemsPerPage.value);
  
    // Phân trang cho lần đầu
    paginateProducts();
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu:', error);
  }

}

onMounted(async () => {
  fetchProductByCategory()
});

watch(categoryId, () => {
  fetchProductByCategory()
})

// Phân trang
const paginateProducts = () => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  paginatedProducts.value = filteredProducts.value.slice(start, end);
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
</style>
