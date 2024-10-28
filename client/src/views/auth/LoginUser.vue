<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="text" 
          v-model="email" 
          placeholder="Nhập email" 
          :class="{ 'is-invalid': emailError }" />
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input 
          type="password" 
          v-model="password" 
          placeholder="Nhập mật khẩu" 
          :class="{ 'is-invalid': passwordError }" />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
      </div>
      <button type="submit">Đăng nhập</button>
      <p>
        Chưa có tài khoản? <router-link to="/register">Tạo tài khoản</router-link>
      </p>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref(null);
const router = useRouter();

const validateForm = () => {
  let valid = true;
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = '*Email không được để trống';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = '*Email không đúng định dạng';
    valid = false;
  }

  if (!password.value) {
    passwordError.value = '*Mật khẩu không được để trống';
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const response = await axios.get('http://localhost:1007/customers');
    const user = response.data.find(
      (customer) => customer.email === email.value && customer.password === password.value
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.reload(); // Reload lại trang
      router.push('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
    } else {
      errorMessage.value = '*Thông tin đăng nhập không chính xác.';
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = '*Có lỗi xảy ra, vui lòng thử lại.';
  }
};
</script>


<style scoped>
/* Container tổng thể */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Tiêu đề */
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
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
  color: #141313;
}

/* Input field */
.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #000;
  outline: none;
  transition: all 0.3s ease;
}

/* Hiệu ứng khi focus */
.form-group input:focus {
  border-color: #141414;
  box-shadow: 0 0 5px rgba(34, 34, 34, 0.5);
}

/* Thông báo lỗi */
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
}

/* Invalid input border color */
.is-invalid {
  border-color: red;
}

/* Button */
button {
  width: 100%;
  padding: 10px;
  background-color: #070707;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Link */
a {
  color: #5367d5;
  text-decoration: underline;
}

a:hover {
  color: #3f51b5;
}
</style>
