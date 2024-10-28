<template>
  <div class="products">
    <div class="header">
      <h1>Products</h1>
      <div class="actions">
        <button class="add-product" @click="openAddProductForm">+ Add Product</button>
      </div>
    </div>

    <!-- Nền mờ khi form mở -->
    <div v-if="isAddingProduct || isEditingProduct || isDeletingProduct" class="overlay" @click="closeModals"></div>

    <!-- Form thêm sản phẩm mới (modal) -->
    <div v-if="isAddingProduct" class="add-product-form modal">
  <h2>Add Product</h2>
  <input v-model="newProduct.name" type="text" placeholder="Product Name" />
  
  <!-- Upload file ảnh -->
  <input type="file" @change="handleFileUpload" />
  
  <!-- Ô để dán link ảnh -->
  <input v-model="newProduct.image" type="text" placeholder="Hoặc có thể dùng link image" />
  
  <input v-model="newProduct.status" type="text" placeholder="Status" />
  <select v-model="newProduct.category">
    <option v-for="category in categories" :key="category.id" :value="category.name">
      {{ category.name }}
    </option>
  </select>
  <input v-model="newProduct.price" type="text" placeholder="Price" />
  <button @click="addProduct">Save</button>
  <button @click="closeAddProductForm">Cancel</button>
</div>


    <!-- Form chỉnh sửa sản phẩm (modal) -->
<!-- Form chỉnh sửa sản phẩm (modal) -->
<div v-if="isEditingProduct" class="edit-product-form modal">
  <h2>Edit Product</h2>
  <input v-model="editingProduct.name" type="text" placeholder="Product Name" />
  
  <!-- Upload file ảnh -->
  <input type="file" @change="handleFileUploadEdit" />
  
  <!-- Ô để dán link ảnh -->
  <input v-model="editingProduct.image" type="text" placeholder="Hoặc có thể dùng link image" />
  
  <input v-model="editingProduct.status" type="text" placeholder="Status" />
  <select v-model="editingProduct.category">
    <option v-for="category in categories" :key="category.id" :value="category.name">
      {{ category.name }}
    </option>
  </select>
  <input v-model="editingProduct.price" type="text" placeholder="Price" />
  <button @click="saveEditedProduct">Update</button>
  <button @click="closeEditProductForm">Cancel</button>
</div>


    <!-- Delete confirmation modal -->
    <div v-if="isDeletingProduct" class="delete-confirm-modal modal">
      <p>Bạn có chắc chắn muốn xóa sản phẩm ?</p>
      <button @click="confirmDeleteProduct">Đồng ý</button>
      <button @click="closeDeleteProductModal">Hủy</button>
    </div>
    <!-- Bảng hiển thị sản phẩm -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Status</th>
          <th>Category</th>
          <th>Price(VNĐ)</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in displayedProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td><img :src="product.image" alt="product image" class="product-image" /></td>
          <td>{{ product.status }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.date }}</td>
          <td>
            <button class="btn view">View</button>
            <button class="btn edit" @click="openEditProductForm(product)">Edit</button>
            <button class="btn delete" @click="openDeleteProductModal(product.id)">Delete</button>
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref([]); // Biến lưu danh sách sản phẩm
const categories = ref([]); // Biến lưu danh sách categories
const currentPage = ref(1); // Trang hiện tại cho phân trang
const itemsPerPage = 5; // Số sản phẩm mỗi trang
const totalPages = ref(0); // Tổng số trang
const isAddingProduct = ref(false); // Trạng thái mở form thêm sản phẩm
const isEditingProduct = ref(false); // Trạng thái mở form sửa sản phẩm
const isDeletingProduct = ref(false); // Trạng thái hiển thị modal xóa
const selectedProduct = ref(null); // Biến lưu sản phẩm được chọn để sửa hoặc xóa

// Dữ liệu sản phẩm mới hoặc cần sửa
const newProduct = ref({
  name: '',
  image: '',
  status: '',
  category: '',
  price: ''
});

const editingProduct = ref({
  name: '',
  image: '',
  status: '',
  category: '',
  price: ''
});

// Lấy dữ liệu sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:1007/products');
    products.value = response.data; // Lưu dữ liệu sản phẩm vào biến products
    totalPages.value = Math.ceil(products.value.length / itemsPerPage); // Tính tổng số trang
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Lấy danh mục (categories)
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:1007/categories');
    categories.value = response.data; // Lưu dữ liệu categories vào biến categories
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Hàm thêm sản phẩm mới
const addProduct = async () => {
  if (newProduct.value.name && newProduct.value.status && newProduct.value.category && newProduct.value.price) {
    const newProductData = {
      ...newProduct.value,
      id: (Math.max(...products.value.map(p => parseInt(p.id))) + 1).toString(), // Tự động tăng id
      date: new Date().toLocaleDateString() // Thêm ngày tạo
    };

    try {
      await axios.post('http://localhost:1007/products', newProductData);
      products.value.push(newProductData); // Cập nhật danh sách sản phẩm
      closeAddProductForm(); // Đóng form sau khi thêm
    } catch (error) {
      console.error('Error adding product:', error);
    }
  } else {
    alert('Please fill in all fields!');
  }
};

// Hàm sửa sản phẩm
const openEditProductForm = (product) => {
  editingProduct.value = { ...product }; // Điền thông tin sản phẩm vào form chỉnh sửa
  isEditingProduct.value = true;
};

// Hàm cập nhật sản phẩm
const saveEditedProduct = async () => {
  try {
    await axios.put(`http://localhost:1007/products/${editingProduct.value.id}`, editingProduct.value);
    const index = products.value.findIndex(p => p.id === editingProduct.value.id);
    products.value[index] = { ...editingProduct.value }; // Cập nhật sản phẩm trong danh sách
    closeEditProductForm();
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Hàm mở modal xóa
const openDeleteProductModal = (productId) => {
  selectedProduct.value = products.value.find(p => p.id === productId);
  isDeletingProduct.value = true;
};

// Hàm xác nhận xóa sản phẩm
const confirmDeleteProduct = async () => {
  try {
    await axios.delete(`http://localhost:1007/products/${selectedProduct.value.id}`);
    products.value = products.value.filter(product => product.id !== selectedProduct.value.id);
    closeDeleteProductModal(); // Đóng modal sau khi xóa
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Mở form thêm sản phẩm
const openAddProductForm = () => {
  isAddingProduct.value = true;
};

// Đóng form thêm sản phẩm
const closeAddProductForm = () => {
  isAddingProduct.value = false;
  resetNewProductForm();
};

// Đóng form sửa sản phẩm
const closeEditProductForm = () => {
  isEditingProduct.value = false;
};

// Đóng modal xóa sản phẩm
const closeDeleteProductModal = () => {
  isDeletingProduct.value = false;
};

// Đóng tất cả modal (overlay)
const closeModals = () => {
  closeAddProductForm();
  closeEditProductForm();
  closeDeleteProductModal();
};

// Hiển thị sản phẩm theo trang
const displayedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(startIndex, startIndex + itemsPerPage); // Trả về sản phẩm của trang hiện tại
});

// Thay đổi trang phân trang
const changePage = (page) => {
  currentPage.value = page;
};

// Hàm upload file ảnh
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    newProduct.value.image = e.target.result; // Lưu URL của file ảnh vào newProduct
    editingProduct.value.image = e.target.result; // Lưu URL vào khi edit
  };

  reader.readAsDataURL(file);
};

// Reset form sau khi thêm hoặc sửa sản phẩm
const resetNewProductForm = () => {
  newProduct.value = {
    name: '',
    image: '',
    status: '',
    category: '',
    price: ''
  };
};

// Lifecycle hook
onMounted(() => {
  fetchProducts(); // Gọi hàm fetchProducts khi component mounted
  fetchCategories(); // Gọi hàm fetchCategories khi component mounted
});
</script>

<style scoped>
.products {
  padding: 20px;
  background-color: #f9fafb; /* Màu nền nhẹ nhàng hơn */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Độ bóng nhẹ */
}
.product-image {
  width: 50px; /* Điều chỉnh kích thước theo ý bạn */
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 600; /* Tăng độ đậm của chữ */
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
}

.add-product {
  background-color: #000000; /* Màu xanh nổi bật */
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 15px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}
select {
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
  border-spacing: 0;
  margin-top: 20px;
}

thead th {
  background-color: #f1f3f5; /* Màu nền nhẹ cho phần tiêu đề */
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: 600; /* Tăng độ đậm */
  border-bottom: 2px solid #e9ecef;
}

tbody td {
  background-color: #fff;
  padding: 15px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
}

tbody tr {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02); /* Hiệu ứng bóng nhẹ giữa các hàng */
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #f8f9fa; /* Màu nền khi hover */
}

.btn {
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view {
  background-color: #1E88E5;
  color: white;
  margin-right: 5px;
}

.edit {
  background-color: #FFC107;
  color: black;
  margin-right: 5px;
}

.delete {
  background-color: #F44336;
  color: white;
}

.view:hover {
  background-color: #1565C0;
}

.edit:hover {
  background-color: #ffca28;
}

.delete:hover {
  background-color: #e53935;
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
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #f0f0f0;
}

.pagination button.active {
  background-color: #333;
  color: white;
}
/* Modal hiển thị form thêm sản phẩm */
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

.modal input,
.modal select {
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
