<template>
  <div class="menu">
    <div class="logo">Admin</div>
    <nav>
      <ul>
        <li>
          <router-link to="/admin/dashboard">
            <i class="bi bi-card-heading"></i> Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/admin/products">
            <i class="bi bi-bag-heart-fill"></i> Products
          </router-link>
        </li>
        <li>
          <router-link to="/admin/orders">
            <i class="bi bi-box-seam-fill"></i> Orders
          </router-link>
        </li>
        <li>
          <router-link to="/admin/customers">
            <i class="bi bi-people-fill"></i> Customers
          </router-link>
        </li>
        <li>
          <router-link to="/admin/settings">
            <i class="bi bi-back"></i> Categorys
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="logout">
      <button @click="logout">
        <i class="bi bi-box-arrow-left"></i> Log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')  // Xóa thông tin người dùng khỏi localStorage
  router.push('/login-admin')  // Điều hướng về trang đăng nhập
}
</script>

<style scoped>
.menu {
  width: 250px;
  background-color: #1d1d1d;  /* Màu nền sidebar */
  height: 100vh;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;  /* Đảm bảo menu luôn ở trên cùng */
}

.menu .logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  color: white;
}

.menu nav ul {
  list-style: none;
  padding: 0;
  margin: 0;  /* Đảm bảo không có khoảng cách thừa */
}

.menu nav ul li {
  margin-bottom: 20px;
}

.menu nav ul li a {
  display: flex;
  align-items: center;  /* Căn chỉnh icon và văn bản theo chiều ngang */
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s;
  padding: 10px 15px;
  border-radius: 5px;
}

.menu nav ul li a i {
  margin-right: 10px;  /* Khoảng cách giữa icon và văn bản */
}

.menu nav ul li a:hover,
.menu nav ul li a.active {
  background-color: #3f51b5; /* Màu nền khi hover hoặc active */
}

.logout {
  margin-top: auto;  /* Đẩy nút Log out xuống cuối */
  text-align: center;
  width: 100%;
}

.logout button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout i {
  margin-right: 8px;
}
</style>
