<template>
  <header class="header">
    <!-- Vùng chứa thông báo freeship và voucher -->
    <div class="header-top">
      <div class="marquee-container">
        <div class="marquee-content">
          <span class="marquee-item">🚛 FREESHIP ĐƠN TỪ 399K</span>
          <span class="marquee-item">🚛 VOUCHER 10% TỐI ĐA 10K</span>
          <span class="marquee-item">🚛 VOUCHER 50K ĐƠN TỪ 699K</span>
          <span class="marquee-item">🚛 VOUCHER 80K ĐƠN TỪ 999K</span>
        </div>
      </div>
    </div>

    <!-- Phần chính của header chứa logo, tìm kiếm và biểu tượng -->
    <div class="header-main">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo">
          <img src="https://file.hstatic.net/1000253775/file/logo_no_bf-05_3e6797f31bda4002a22464d6f2787316.png" alt="Logo">
        </div>

        <!-- Thanh tìm kiếm -->
        <div class="search-bar">
          <input type="text" placeholder="Bạn đang tìm gì...">
          <button class="search-button">
            <i class="bi bi-search"></i>
          </button>
        </div>

        <!-- Các biểu tượng tài khoản, giỏ hàng -->
        <div class="nav-icons">
          <router-link to="/store"><i class="bi bi-geo-alt-fill"></i> Cửa hàng</router-link>
          <div v-if="loggedInUser" @click="toggleUserMenu" class="user-menu">
            Hi, {{ loggedInUser.name }} <span v-if="showLogout">▼</span>
            <div v-if="showLogout" class="logout-menu">
              <router-link to="/user-detail">
                <button>Xem chi tiết</button>
              </router-link>
              <button @click="handleLogout">Đăng xuất</button>
            </div>
          </div>
          <router-link v-else to="/login"><i class="bi bi-person-fill"></i> Đăng nhập</router-link>
          <div class="favourite">
            <router-link to="/favourites">
              <i class="bi bi-box2-heart-fill"></i> Yêu thích
              <span v-if="favouriteCount > 0" class="favourite-count">{{ favouriteCount }}</span>
            </router-link>
          </div>
          <div class="cart">
            <router-link to="/cart"><i class="bi bi-cart-fill"></i> Giỏ hàng</router-link>
            <span class="cart-count">{{ cartCount }}</span>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Thanh menu chính -->
    <nav class="main-nav">
      <ul>
        <li><router-link to="/">HOME</router-link></li>
        <li class="dropdown" @mouseover="showCategories = true" @mouseleave="showCategories = false">
          <router-link to="/ao-nam">ÁO NAM</router-link>
          <ul v-if="showCategories" class="dropdown-menu">
            <li v-for="category in maleCategories" :key="category.id">
              <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
            </li>
          </ul>
        </li>
        <li class="dropdown" @mouseover="showPantsCategories = true" @mouseleave="showPantsCategories = false">
          <router-link to="/quan-nam">QUẦN NAM</router-link>
          <ul v-if="showPantsCategories" class="dropdown-menu">
            <li v-for="category in pantsCategories" :key="category.id">
              <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
            </li>
          </ul>
        </li>
        <li><router-link to="/outlet-thang-10">OUTLET THÁNG 10</router-link></li>
        <li><router-link to="/procool-collection">PROCOOL COLLECTION</router-link></li>
        <li><router-link to="/bst-marvel">BST MARVEL</router-link></li>
        <li><router-link to="/tin-thoi-trang">TIN THỜI TRANG</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loggedInUser = ref(null);
const showLogout = ref(false);

const showCategories = ref(false);
const maleCategories = ref([]);

const showPantsCategories = ref(false); 
const pantsCategories = ref([]);

// Số lượng hiển thị trên thanh Header
const cartCount = ref(0);
const favouriteCount = ref(0);

onMounted(() => {
  // Kiểm tra người dùng đã đăng nhập
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user) {
    loggedInUser.value = user; 
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng và yêu thích
  getCartCount();
  getFavouriteCount(); // Cập nhật số lượng sản phẩm yêu thích

  // Lấy danh sách danh mục (categories) từ API
  axios.get('http://localhost:1007/categories')
    .then(response => {
      const categories = response.data;

      // Lọc danh mục 'Áo' và 'Quần'
      maleCategories.value = categories.filter(category => 
        category.name.toLowerCase().includes('áo')
      );
      pantsCategories.value = categories.filter(category => 
        category.name.toLowerCase().includes('quần')
      );
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu danh mục:', error);
    });

  // Theo dõi sự thay đổi của localStorage (khi thêm/xóa sản phẩm vào giỏ hoặc yêu thích)
  window.addEventListener('storage', () => {
    getCartCount();
    getFavouriteCount(); // Gọi hàm này mỗi khi có sự thay đổi
  });
});

// Hàm toggle menu người dùng
const toggleUserMenu = () => {
  showLogout.value = !showLogout.value;
};

// Hàm đăng xuất
const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  loggedInUser.value = null;
  showLogout.value = false; // Đóng menu Log out
};

// Hàm lấy số lượng sản phẩm trong giỏ hàng
const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.value = cart.reduce((total, item) => total + item.quantity, 0); // Tính tổng số lượng sản phẩm trong giỏ
};

// Hàm lấy số lượng sản phẩm yêu thích
const getFavouriteCount = () => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  favouriteCount.value = favourites.length; // Tính tổng số sản phẩm yêu thích
};
</script>


<style scoped>
  /* Phần thông báo freeship và voucher */
  .header-top {
    background-color: #fff;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    color: #000;
  }
  
  .header-announcement {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header-announcement p {
    margin: 0;
  }
  
  /* Phần chính của header */
  .header-main {
    background-color: #000;
    padding: 15px 0;
    color: white;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo img {
    width: 120px;
  }
  
  /* Thanh tìm kiếm */
  .search-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 20px;
  }
  
  .search-bar input {
    width: 400px;
    padding: 10px 12px;
    border-radius: 5px;
    border: none;
  }
  
  .search-button {
    background-color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  /* Các biểu tượng điều hướng */
  .nav-icons {
    display: flex;
    align-items: center;
  }
  
  .nav-icons a {
    color: white;
    text-decoration: none;
    margin-left: 15px;
    font-weight: bold;
    position: relative;
  }
  
  .nav-icons i {
    margin-right: 5px;
  }
  /*Cart và Favourite count*/
  .cart {
    position: relative;
  }
  
  .cart-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    position: absolute;
    top: -5px;
    right: -10px;
  }
  .favourite {
  position: relative;
  }

  .favourite-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    position: absolute;
    top: -5px;
    right: -10px;
  }

  
  /* Thanh menu chính */
  .main-nav {
    background-color: white;
  }
  
  .main-nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    margin: 0;
  }
  
  .main-nav ul li {
    margin: 0 15px;
  }
  
  .main-nav ul li a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
    transition: color 0.3s ease;
  }
  
  .main-nav ul li a:hover {
    color: red;
  }
  .user-info {
  color: white;
  margin-left: 15px;
  cursor: pointer;
}

.logout-menu {
  position: absolute;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.logout-menu button {
  background-color: #070707;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}
  .marquee-container {
  overflow: hidden; /* Ẩn phần text khi nó vượt quá chiều dài của container */
  background-color: #fff;
  color: #000;
  padding: 5px 20px;
  font-size: 14px;
  white-space: nowrap;
  box-sizing: border-box;
}

.marquee-content {
  display: inline-block;
  animation: marquee 15s linear infinite; /* Animation di chuyển toàn bộ khối text */
}

.marquee-item {
  display: inline-block; /* Giữ các mục marquee nằm trên một dòng */
  padding-right: 200px; /* Khoảng cách giữa các mục */
}

@keyframes marquee {
  0% {
    transform: translateX(100%); 
  }
  100% {
    transform: translateX(-100%);
  }
}
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  border-radius: 5px;
  z-index: 1000; /* Đặt giá trị z-index cao hơn */
  display: flex;
  flex-direction: column; 
}

.dropdown-menu li {
  display:block;
  padding: 10px;
  white-space: nowrap;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
  </style>
  