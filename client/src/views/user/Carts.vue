<template>
  <div class="cart-page">
    <h2>Giỏ hàng</h2>

    <div class="cart-item" v-for="item in cart" :key="item.id">
      <!-- Phần ảnh sản phẩm -->
      <div class="cart-item-image">
        <img :src="item.image" alt="Product Image" />
      </div>
      
      <!-- Phần thông tin sản phẩm -->
      <div class="cart-item-details">
        <h3>{{ item.name }}</h3>
        <p>Size: {{ item.size }}</p>
        <p>Giá: {{ item.price.toLocaleString() }}₫</p>

        <!-- Phần thay đổi số lượng -->
        <div class="quantity-selector">
          <button @click="decreaseQuantity(item)">-</button>
          <input type="number" v-model="item.quantity" min="1" />
          <button @click="increaseQuantity(item)">+</button>
        </div>

        <!-- Tổng giá cho sản phẩm -->
        <p class="total-price">Tổng: {{ (parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString() }}₫</p>
        
        <!-- Nút xóa sản phẩm -->
        <button class="remove-button" @click="removeItem(item)">Xóa</button>
      </div>
    </div>

    <!-- Hiển thị tổng giá trị của giỏ hàng -->
    <div class="cart-summary">
      <p>Tổng giá trị giỏ hàng: {{ totalAmount.toLocaleString() }}₫</p>
      <button class="clear-cart-button" @click="clearCart">Xóa hết</button>
      <button class="checkout-button" @click="openCheckoutForm">Thanh toán</button>
    </div>

    <!-- Modal thanh toán -->
    <div v-if="showCheckoutForm" class="checkout-modal">
      <div class="checkout-form">
        <h2>Thông tin thanh toán</h2>
        
        <label for="name">Họ và tên:</label>
        <input type="text" v-model="order.name" id="name" required />
        
        <label for="email">Email:</label>
        <input type="email" v-model="order.email" id="email" required />
        
        <label for="phone">Số điện thoại:</label>
        <input type="tel" v-model="order.phone" id="phone" required />
        
        <label for="address">Địa chỉ:</label>
        <textarea v-model="order.address" id="address" required></textarea>
        
        <label for="payment">Phương thức thanh toán:</label>
        <select v-model="order.paymentMethod" id="payment">
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="Credit Card">Thẻ tín dụng</option>
        </select>

        <div class="order-summary">
          <h3>Tóm tắt đơn hàng</h3>
          <div v-for="item in cart" :key="item.id">
            <p>{{ item.name }} - {{ item.price.toLocaleString() }}₫ x {{ item.quantity }}</p>
          </div>
          <p>Tổng tiền: {{ totalAmount.toLocaleString() }}₫</p>
        </div>

        <div class="form-buttons">
          <button @click="submitOrder">Xác nhận thanh toán</button>
          <button @click="closeCheckoutForm">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

// Dữ liệu giỏ hàng lấy từ localStorage
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
const showCheckoutForm = ref(false);

// Thông tin đơn hàng
const order = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'COD',
  items: cart.value, // Lưu các sản phẩm trong giỏ hàng
  total: 0,
});

// Hàm giảm số lượng sản phẩm
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    saveCart();
  }
};

// Hàm tăng số lượng sản phẩm
const increaseQuantity = (item) => {
  item.quantity++;
  saveCart();
};

// Hàm xóa sản phẩm
const removeItem = (item) => {
  cart.value = cart.value.filter(cartItem => cartItem.id !== item.id || cartItem.size !== item.size);
  saveCart();
};

// Hàm xóa toàn bộ sản phẩm trong giỏ hàng
const clearCart = () => {
  cart.value = [];
  saveCart();
};

// Hàm lưu giỏ hàng vào localStorage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

// Tính tổng giá trị giỏ hàng
const totalAmount = computed(() => {
  return cart.value.reduce((total, item) => {
    const price = parseInt(item.price.replace(/,/g, ''));  // Chuyển price từ chuỗi sang số
    return total + price * item.quantity;
  }, 0);
});

// Mở form thanh toán
const openCheckoutForm = () => {
  order.value.total = totalAmount.value; // Cập nhật tổng tiền cho đơn hàng
  showCheckoutForm.value = true;
};

// Đóng form thanh toán
const closeCheckoutForm = () => {
  showCheckoutForm.value = false;
};

// Hàm xử lý thanh toán
const submitOrder = async () => {
  order.value.items = cart.value;
  try {
    // Gửi dữ liệu đơn hàng lên server (trang admin)
    await axios.post('http://localhost:1007/orders', order.value);

    // Sau khi thanh toán thành công, xóa giỏ hàng và đóng form
    localStorage.removeItem('cart');
    cart.value = [];
    showCheckoutForm.value = false;
    alert('Thanh toán thành công!');
  } catch (error) {
    console.error('Lỗi khi xử lý thanh toán:', error);
  }
};
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #333;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.cart-item-image img {
  width: 150px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.cart-item-details {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item-details h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.cart-item-details p {
  margin: 5px 0;
  color: #555;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-selector button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quantity-selector button:hover {
  background-color: #ddd;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.total-price {
  font-weight: bold;
  margin-top: 10px;
  color: #e53935;
  font-size: 18px;
}

.remove-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: auto; 
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: 0;
}

.remove-button:hover {
  background-color: #c0392b;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-summary p {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.checkout-button,
.clear-cart-button {
  padding: 15px 30px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.checkout-button:hover,
.clear-cart-button:hover {
  background-color: #333;
}
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.checkout-form label {
  font-weight: bold;
  margin-top: 10px;
}

.checkout-form input,
.checkout-form textarea,
.checkout-form select {
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
}

.order-summary {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
}

.order-summary h3 {
  margin-bottom: 10px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #000;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}
</style>
