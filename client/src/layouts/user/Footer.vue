<template>
    <footer class="footer">
  <div class="container">
    <div class="newsletter">
      <label for="email">ĐĂNG KÍ NHẬN TIN</label>
      <input type="email" id="email" placeholder="Email">
      <button>ĐĂNG KÝ</button>
    </div>
    
    <div class="footer-content">
      <div class="footer-section">
        <h4>GIỚI THIỆU</h4>
        <p>160STORE - Chuỗi Phân Phối Thời Trang Nam Chuẩn Hiệu</p>
        <ul>
          <li><i class="bi bi-telephone"></i> 02871006789</li>
          <li><i class="bi bi-envelope"></i> cs@160store.com</li>
          <li><i class="bi bi-clock"></i> Giờ mở cửa: 08:30 - 22:00</li>
          <li><i class="bi bi-headset"></i> Nhân viên tư vấn phản hồi tin nhắn đến 24:00 (Mỗi ngày)</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>CHÍNH SÁCH</h4>
        <ul>
          <li>Hướng dẫn đặt hàng</li>
          <li>Thông tin chuyển khoản</li>
          <li>Chính sách</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>ĐỊA CHỈ CỬA HÀNG</h4>
        <ul>
          <li><i class="bi bi-geo-alt"></i> Hồ Chí Minh (10 CH)</li>
          <li><i class="bi bi-geo-alt"></i> Hà Nội (2 CH)</li>
          <li><i class="bi bi-geo-alt"></i> Cần Thơ (2 CH)</li>
        </ul>
        <a href="#">Xem tất cả cửa hàng</a>
      </div>
    </div>
  </div></footer>
</template>
  
  <script setup>
  </script>
  
  <style scoped>
  .footer {
  background-color: #000;
  color: #fff;
  padding: 40px 0;
  font-size: 14px;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.newsletter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.newsletter input[type="email"] {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
}

.newsletter button {
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-section {
  width: 22%;
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 15px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li i {
  margin-right: 10px;
}

.footer-section img {
  max-width: 100%;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #333;
  padding-top: 20px;
}

.footer-bottom .payment-methods img {
  width: 50px;
  margin-left: 10px;
}

  </style>
  