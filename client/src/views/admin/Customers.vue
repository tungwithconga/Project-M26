<template>
  <div class="customers">
    <div class="header">
      <h1>Customers</h1>
      <div class="actions">
        <button class="btn add-user" @click="openAddUserForm">+ Add User</button>
      </div>
    </div>

    <!-- Nền mờ khi form thêm user mở -->
    <div v-if="isAddingUser" class="overlay" @click="closeAddUserForm"></div>

    <!-- Form thêm user (modal) -->
    <div v-if="isAddingUser" class="add-user-form modal">
      <h2> User</h2>
      <input v-model="newUser.name" type="text" placeholder="Tên đăng nhập" />
      <input v-model="newUser.email" type="email" placeholder="Email" />
      <input v-model="newUser.role" type="text" placeholder="Role" />
      <button @click="addUser">Lưu</button>
      <button @click="closeAddUserForm">Hủy</button>
    </div>

    <!-- Bảng hiển thị customers -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in displayedCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.role }}</td>
          <td>{{ customer.date }}</td>
          <td>
            <button class="btn view">View</button>
            <label class="switch">
                <input type="checkbox" :checked="customer.status === 'Active'" @change="toggleStatus(customer)">
               <span  class="slider"></span><!-- v-if="customer.role=='User'" cố tình lỗi -->
            </label>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const customers = ref([])
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = ref(0)
const sortBy = ref('id')

const isAddingUser = ref(false)

const newUser = ref({
  name: '',
  email: '',
  role: ''
})

const openAddUserForm = () => {
  isAddingUser.value = true
}

const closeAddUserForm = () => {
  isAddingUser.value = false
}

const addUser = async () => {
  if (newUser.value.name && newUser.value.email && newUser.value.role) {
    const maxId = customers.value.length > 0 
      ? Math.max(...customers.value.map(customer => parseInt(customer.id, 10)))
      : 0;

    const newCustomer = {
      id: (maxId + 1).toString(),
      name: newUser.value.name,
      email: newUser.value.email,
      role: newUser.value.role,
      date: new Date().toLocaleDateString(),
      status: 'Active'
    };

    try {
      await axios.post('http://localhost:1007/customers', newCustomer)
      customers.value.push(newCustomer)
      closeAddUserForm();
      resetNewUserForm();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!');
  }
}

const resetNewUserForm = () => {
  newUser.value = {
    name: '',
    email: '',
    role: ''
  }
}

const fetchCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:1007/customers')
    customers.value = response.data
    totalPages.value = Math.ceil(customers.value.length / itemsPerPage)
  } catch (error) {
    console.error('Error fetching customers:', error)
  }
}

const changePage = (page) => {
  currentPage.value = page
}

const displayedCustomers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return customers.value.slice(startIndex, startIndex + itemsPerPage)
})
// Hàm cập nhật trạng thái
const toggleStatus = async (customer) => {
  customer.status = customer.status === 'Active' ? 'Inactive' : 'Active';

  try {
    // Cập nhật trạng thái mới vào cơ sở dữ liệu
    await axios.patch(`http://localhost:1007/customers/${customer.id}`, {
      status: customer.status
    });
  } catch (error) {
    console.error('Error updating status:', error);
  }
}


onMounted(fetchCustomers)
</script>


<style scoped>
.customers {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
}

select {
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}

.btn.add-user {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

table {
  width: 100%;
  border-collapse: collapse; /* Đảm bảo không có khoảng cách giữa các ô */
}

thead th {
  background-color: #f5f5f5;
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
  border-bottom: 2px solid #ddd;
}

tbody td {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  border-radius: 8px;
}

tbody tr {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Căn chỉnh các cột */
tbody td:nth-child(1) {
  text-align: center; /* Căn giữa cột ID */
}

tbody td:nth-child(4), tbody td:nth-child(5), tbody td:nth-child(6) {
  text-align: center; /* Căn giữa cho Role, Date, và Action */
}

.btn.view {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background-color: #1E88E5;
  color: white;
  transition: background-color 0.3s ease;
}

.btn.view:hover {
  background-color: #1565C0; /* Màu khi hover */
}

/* Thanh gạt */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-left: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:checked + .slider:before {
  transform: translateX(18px);
}

/* Phân trang */
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

.pagination button:hover {
  background-color: #f0f0f0; /* Màu khi hover */
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 400px;
}

.modal h2 {
  margin-bottom: 20px;
}

.modal input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.modal button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal button:first-of-type {
  background-color: #007bff;
  color: white;
  margin-right: 10px;
}

.modal button:last-of-type {
  background-color: #6c757d;
  color: white;
}

/* Nền mờ khi modal mở */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Làm mờ nền */
  z-index: 1000;
}
</style>

