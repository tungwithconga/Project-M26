<template>
  <div class="home-page">
    <!-- Banner Carousel -->
    <section class="main-banner">
      <div class="carousel">
        <div
          class="carousel-item"
          v-for="(banner, index) in banners"
          :key="index"
          :class="{ active: index === currentBannerIndex }"
        >
          <img :src="banner" alt="Banner Image" />
        </div>
      </div>

      <!-- Buttons for navigation -->
      <button class="carousel-control prev" @click="prevSlide">❮</button>
      <button class="carousel-control next" @click="nextSlide">❯</button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

const products = ref([]);
const currentBannerIndex = ref(0);
const banners = ref([
  'https://file.hstatic.net/1000253775/file/banner_desktop_813dba8018af45f3a1fabb0b53e3132a.jpg',
  'https://file.hstatic.net/1000253775/file/banner_desktop_160.jpg',
  'https://file.hstatic.net/1000253775/file/collection_dk_a0f3794304b844739844339d51e617bc.jpg'
]);

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:1007/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

let intervalId;
const startAutoSlide = () => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 5000);
};

const nextSlide = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
};

const prevSlide = () => {
  currentBannerIndex.value =
    (currentBannerIndex.value - 1 + banners.value.length) % banners.value.length;
};

onMounted(() => {
  fetchProducts();
  startAutoSlide();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Home Page Layout */
.home-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Banner Section */
.main-banner {
  width: 100%;
  height: 500px; /* Đảm bảo chiều cao của banner */
  margin-bottom: 20px;
  position: relative;
  overflow: hidden; /* Đảm bảo không bị tràn */
}

.carousel {
  display: flex;
  width: 100%;
  height: 100%; /* Đảm bảo chiều cao đầy đủ của carousel */
  position: relative;
}

.carousel-item {
  min-width: 100%;
  transition: opacity 1s ease-in-out; /* Hiệu ứng mượt mà */
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%; /* Đảm bảo chiều cao đầy đủ của mỗi banner */
}

.carousel-item.active {
  opacity: 1;
  position: relative;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo hình ảnh co giãn mà không bị méo */
  border-radius: 10px;
}

/* Carousel Control Buttons */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3); /* Làm mờ nút */
  color: white;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 100;
  opacity: 0.5; /* Độ mờ của nút */
  transition: opacity 0.3s ease; /* Hiệu ứng mượt mà khi hover */
}

.carousel-control:hover {
  opacity: 1; /* Hiển thị rõ hơn khi hover */
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

/* Product Section */
.product-section {
  margin-top: 40px;
}

.product-section h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.product-item {
  width: 23%;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
  text-align: center;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  color: #ff0000;
  font-size: 16px;
}
</style>
