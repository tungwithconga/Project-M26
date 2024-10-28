<template>
  <div class="register-container">
    <h2>Đăng ký</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Họ và Tên</label>
        <input type="text" v-model="name" placeholder="Nhập họ tên" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" placeholder="Nhập email" />
        <p v-if="error && errorType === 'email'" class="error-message">{{ error }}</p> <!-- Hiển thị lỗi email -->
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input type="password" v-model="password" placeholder="Nhập mật khẩu" />
      </div>
      <button type="submit">Đăng ký</button>
      <p v-if="error && errorType === 'general'" class="error-message">{{ error }}</p> <!-- Hiển thị lỗi chung -->
      <p>
        Đã có tài khoản? 
        <router-link to="/login">Đăng nhập</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);
const errorType = ref(null); // Để xác định loại lỗi (email hoặc general)
const router = useRouter();

// Hàm format ngày hiện tại thành chuỗi với định dạng dd/mm/yyyy
const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên cần +1
  const yyyy = today.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
};

const handleRegister = async () => {
  try {
    // Reset lỗi
    error.value = null;
    errorType.value = null;

    // Validate dữ liệu
    if (!name.value || !email.value || !password.value) {
      error.value = '*Vui lòng điền đầy đủ thông tin.';
      errorType.value = 'general';
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      error.value = '*Email không đúng định dạng.';
      errorType.value = 'email'; // Đặt loại lỗi là email
      return;
    }

    // Lấy danh sách người dùng hiện tại
    const response = await axios.get('http://localhost:1007/customers');
    const users = response.data;

    // Tìm ID lớn nhất hiện tại và tạo ID mới
    const maxId = users.reduce((max, user) => Math.max(max, parseInt(user.id)), 0);
    const newId = maxId + 1;

    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = users.find(user => user.email === email.value);
    if (existingUser) {
      error.value = '*Email đã được sử dụng';
      errorType.value = 'email';
      return;
    }

    // Thêm người dùng mới với ngày hiện tại
    await axios.post('http://localhost:1007/customers', {
      id: newId.toString(),
      name: name.value,
      email: email.value,
      password: password.value,
      role: 'User',
      status: 'Active',
      date: getCurrentDate(), // Thêm trường ngày đăng ký
    });

    error.value = null;
    alert('Đăng ký thành công!');
    router.push('/login'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
  } catch (err) {
    console.error(err);
    error.value = 'Có lỗi xảy ra, vui lòng thử lại.';
    errorType.value = 'general';
  }
};
</script>

<style scoped>
/* Tổng thể */
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff; /* Nền trắng */
  color: #000; /* Chữ đen */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.error-message {
  color: #e74c3c; 
  margin-top: 10px; 
  font-size: 14px;
  font-weight: bold; 
  text-align: left; 
}
/* Tiêu đề */
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #000; /* Chữ đen */
}

/* Form group */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

/* Label */
.form-group label {
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #000; /* Chữ đen */
}

/* Input field */
.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f8f8f8; /* Nền xám nhạt */
  color: #000; /* Chữ đen */
  outline: none;
  transition: all 0.3s ease;
}

/* Hiệu ứng khi focus vào input */
.form-group input:focus {
  border-color: #000; /* Đổi màu viền đen khi focus */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Hiệu ứng ánh sáng */
}

/* Button đăng ký */
button {
  width: 100%;
  padding: 10px;
  background-color: #000; /* Nền đen */
  color: #fff; /* Chữ trắng */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Hiệu ứng khi hover vào button */
button:hover {
  background-color: #333; /* Nền đen nhạt hơn khi hover */
  color: #fff; /* Chữ vẫn trắng */
}

/* Thông báo lỗi */
p[v-if="error"] {
  color: #ff0000; /* Màu đỏ cho thông báo lỗi */
  margin-top: 10px;
}
</style>
