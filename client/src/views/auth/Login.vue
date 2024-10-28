<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <div class="options">
          <div class="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label for="rememberMe">Remember me</label>
          </div>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const loginUser = async () => {
  try {
    const response = await axios.get('http://localhost:1007/users', {
      params: {
        email: email.value,
        password: password.value
      }
    })

    const user = response.data.find(
      u => u.email === email.value && u.password === password.value
    )

    if (user) {
      alert('Login successful!')
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/admin/dashboard')
    } else {
      alert('Invalid email or password')
    }
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<style scoped>
/* Trang login chung */
.login-page {
  background-image: url('https://img.freepik.com/free-vector/vector-neon-fisher-village-night-countryside_1441-3152.jpg?w=1380&t=st=1729440578~exp=1729441178~hmac=6764cb87dddd9662c714bc39f2f4e14a509c0bf009213e6d30ef8eb68c699805');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Container cho form login */
.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* Tiêu đề */
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Input cho email và password */
.input-group {
  margin-bottom: 15px;
  position: relative;
}

input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Nhóm tùy chọn (Remember me và Forgot Password) */
.options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me label {
  margin-left: 5px;
  font-size: 14px;
  color: #333;
}

.forgot-password {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Nút đăng nhập */
button {
  width: 100%;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Đoạn text đăng ký */
p {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}
</style>
