<template>
  <div class="product-detail-page">
    <!-- Phần ảnh sản phẩm -->
    <div class="product-detail-image">
      <img :src="product.image" alt="Product Image" />
      <div class="benefits-section">
        <!-- Đây là phần icon chính sách -->
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451118875_c98fff6e965c4957a2beef70df6df0f8_afcea78391a640c9bcef22ce88aca7d6.jpg" alt="Icon 1">
               <p class="title">Đổi trả tận nhà trong vòng 15 ngày</p>
             </div>
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451151763_13f64ed25050f361cfb0a70fda62b2c2_efbb28df6328412b9200cd92a795396e.jpg" alt="Icon 2">
               <p class="title">Miễn phí vận chuyển đơn từ 399k</p>
             </div>
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451129757_228e4824d8a593038b9f20d5e53d4d08_7e46b4c108bc481e8c2351f909bdcba4.jpg" alt="Icon 3">
               <p class="title">Bảo hành trong vòng 30 ngày</p>
             </div>
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451140541_2b09e178f1b8b4763b266875fd2c8db6_8b536c9ae5e24c17961fdb906d3f5022.jpg" alt="Icon 4">
               <p class="title">Hotline 0287.100.6789 hỗ trợ từ 8h30-24h</p>
             </div>
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451129712_78e0e70db6fffe43fbb9a3e680cb3ed0_a2b8379adf4843a4898c621b37c2b42a.jpg" alt="Icon 5">
               <p class="title">Giao hàng toàn quốc</p>
             </div>
             <div class="benefit-item">
               <img src="https://file.hstatic.net/1000253775/file/z4635451151761_2fe8731e9d20060a54130996be16cd2e_e8e090599dd9467abdd66feb9ba3474f.jpg" alt="Icon 6">
               <p class="title">Có cộng dồn ưu đãi KHTT</p>
             </div>
        <!-- Các icon khác sẽ tiếp tục ở đây -->
      </div>
    </div>

    <!-- Phần thông tin sản phẩm -->
    <div class="product-detail-info">
      <h1>{{ product.name }}</h1>
      <p class="price">{{ product.price }}₫</p>
      <p class="status">Trạng thái: {{ product.status }}</p>
      <p class="category">Loại: {{ product.category }}</p>

      <!-- Kích thước sản phẩm -->
      <div class="size-selector">
        <label>Kích thước:</label>
        <button 
          v-for="size in sizes" 
          :key="size" 
          @click="selectSize(size)" 
          :class="{ active: selectedSize === size }"
        >{{ size }}</button>
      </div>

      <!-- Số lượng sản phẩm -->
      <div class="quantity-selector">
        <button @click="decreaseQuantity">-</button>
        <input type="number" v-model="quantity" />
        <button @click="increaseQuantity">+</button>
      </div>

      <!-- Nút thêm vào giỏ hàng -->
      <div class="product-detail-buttons">
        <button class="add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
        <button class="favourite-button" @click="addToFavourites"><i class="bi bi-suit-heart-fill"></i></button>
      </div>

      <!-- Bảng size -->
      <div class="size-chart">
        <h3>Xem bảng size</h3>
        <img :src="sizeChartImage" alt="Size Chart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// Lấy id sản phẩm từ URL
const route = useRoute();
const product = ref({});
const sizes = ['S', 'M', 'L', 'XL'];
const selectedSize = ref('L');
const quantity = ref(1);
const sizeChartImage = ref('https://product.hstatic.net/1000253775/product/ao_thun_regular_fe2a6153fe864cc6a3624e55aff4581b_1024x1024.jpg');

// Hàm lấy chi tiết sản phẩm
onMounted(async () => {
  const productId = route.params.id; // Lấy id sản phẩm từ URL
  try {
    const response = await axios.get(`http://localhost:1007/products/${productId}`);
    product.value = response.data; // Gán dữ liệu sản phẩm
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
  }
});

// Chọn kích thước sản phẩm
const selectSize = (size) => {
  selectedSize.value = size;
};

// Giảm số lượng sản phẩm
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

// Tăng số lượng sản phẩm
const increaseQuantity = () => {
  quantity.value++;
};

// Hàm thêm vào giỏ hàng
const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = cart.find(item => item.id === product.value.id && item.size === selectedSize.value);

  if (existingProduct) {
    // Nếu sản phẩm đã có, chỉ tăng số lượng
    existingProduct.quantity += quantity.value;
  } else {
    // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
    cart.push({
      ...product.value,
      size: selectedSize.value,
      quantity: quantity.value
    });
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Thông báo thành công và cập nhật giỏ hàng
  alert('Sản phẩm đã được thêm vào giỏ hàng!');
  window.dispatchEvent(new Event('storage')); // Kích hoạt sự kiện cập nhật giỏ hàng
};

// Hàm thêm vào yêu thích
const addToFavourites = () => {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  const existingFavourite = favourites.find(fav => fav.id === product.value.id);

  if (!existingFavourite) {
    favourites.push({...product.value, size: selectedSize.value});
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Đã thêm vào danh sách yêu thích');
  } else {
    alert('Sản phẩm này đã có trong danh sách yêu thích');
  }
  window.dispatchEvent(new Event('storage'));

};

</script>

<style scoped>
.product-detail-page {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-detail-image {
  flex: 1; 
  margin-right: 20px;
}

.product-detail-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.product-detail-info {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-detail-info h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-detail-info .price {
  font-size: 24px;
  font-weight: bold;
  color: red;
  margin-bottom: 20px;
}

.product-detail-info .status, 
.product-detail-info .category, 
.product-detail-info .date {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

/* Khu vực kích thước sản phẩm */
.size-selector {
  margin: 20px 0;
}

.size-selector label {
  font-weight: bold;
  margin-right: 10px;
}

.size-selector button {
  padding: 10px 15px;
  margin-right: 5px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  cursor: pointer;
  transition: background-color 0.2s;
}

.size-selector button:hover {
  background-color: #ddd;
}

.size-selector button.active {
  background-color: #000;
  color: white;
}

/* Khu vực số lượng */
.quantity-selector {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  cursor: pointer;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  font-size: 18px;
  margin: 0 10px;
}

.quantity-selector button:hover {
  background-color: #ddd;
}

/* Nút thêm vào giỏ hàng và mua ngay */
.product-detail-buttons {
  display: flex;
  gap: 20px;
  border: 1px solid black;
}

.product-detail-buttons button {
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  flex: 1;
  border: none;
  transition: background-color 0.2s;
}

.product-detail-buttons button.add-to-cart {
  background-color: #000;
  color: white;
}

.product-detail-buttons button.buy-now {
  background-color: #fff;
  border: 1px solid #000;
}

.product-detail-buttons button.add-to-cart:hover {
  background-color: #333;
}

.product-detail-buttons button.buy-now:hover {
  background-color: #f7f7f7;
}

/* Phần bảng size */
.size-chart {
  margin-top: 20px;
}

.size-chart img {
  width: 100%;
  border-radius: 10px;
}

/* Phần khuyên mãi */
.benefits-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px; 
}

.benefit-item {
  flex-basis: 30%;
  margin-bottom: 20px;
  text-align: center; 
  background-color: white;
  padding: 15px;
  border-radius: 10px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
}

.benefit-item img {
  width: 40px;
  height: 40px;
  margin-bottom: 10px; 
}

.benefit-item p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.benefit-item .title {
  font-weight: bold;
}

</style>
