<template>
  <div class="orders-page">
    <h2>Orders</h2>
    <table class="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Email</th>
          <th>Điện thoại</th>
          <th>Địa chỉ</th>
          <th>Phương thức thanh toán</th>
          <th>Tổng tiền</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in paginatedOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>{{ order.total.toLocaleString() }}₫</td>
          <td class="order-actions">
            <!-- Nút Chi tiết -->
            <button class="view-button" @click="showDetails(order)">Chi tiết</button>
            <!-- Nút Duyệt -->
            <button class="toggle-button" @click="approveOrder(order)" :disabled="order.status === 'Approved'">
              Duyệt
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
    </div>

    <!-- Modal Chi tiết đơn hàng -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Chi tiết đơn hàng</h3>
        <ul>
          <li v-for="item in selectedOrder.items" :key="item.id">
            {{ item.name }} - {{ item.quantity }} x {{ item.price.toLocaleString() }}₫
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5); // Số lượng đơn hàng trên mỗi trang
const totalPages = ref(1);
const paginatedOrders = ref([]);

// Biến để hiển thị modal và lưu đơn hàng được chọn
const showModal = ref(false);
const selectedOrder = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:1007/orders');
    orders.value = response.data;
    
    // Tính toán tổng số trang
    totalPages.value = Math.ceil(orders.value.length / itemsPerPage.value);
    
    // Hiển thị đơn hàng phân trang
    paginateOrders();
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
  }
});

// Hàm phân trang
const paginateOrders = () => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  paginatedOrders.value = orders.value.slice(start, end);
};

// Chuyển sang trang trước
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    paginateOrders();
  }
};

// Chuyển sang trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    paginateOrders();
  }
};

// Hiển thị chi tiết đơn hàng
const showDetails = (order) => {
  selectedOrder.value = order;
  showModal.value = true;
};

// Đóng modal
const closeModal = () => {
  showModal.value = false;
};

// Duyệt đơn hàng
const approveOrder = (order) => {
  order.status = 'Approved';
  // Có thể thực hiện gửi yêu cầu API để cập nhật trạng thái đơn hàng trên server
};
</script>

<style scoped>
/* Thêm CSS để trang Orders.vue đẹp hơn */
.orders-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th, .orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.orders-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.view-button, .toggle-button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.view-button {
  background-color: #3498db;
  color: white;
}

.toggle-button {
  background-color: #2ecc71;
  color: white;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.pagination button.active {
  background-color: #333;
  color: white;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-content {
  width: 400px;
}

.modal .close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
