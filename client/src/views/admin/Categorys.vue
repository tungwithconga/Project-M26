<template>
  <div class="categorys">
    <div class="header">
      <h1>Categories</h1>
      <div class="actions">
        <button class="btn add-category" @click="openAddCategoryForm">+ Add Category</button>
      </div>
    </div>

    <!-- Nền mờ khi form thêm Category mở -->
    <div v-if="isAddingCategory" class="overlay" @click="closeAddCategoryForm"></div>

    <!-- Form thêm hoặc chỉnh sửa Category (modal) -->
    <div v-if="isAddingCategory" class="add-category-form modal">
      <h2>{{ isEditing ? 'Edit Category' : 'Add Category' }}</h2>
      <input v-model="newCategory.name" type="text" placeholder="Tên Category" />
      <input v-model="newCategory.description" type="text" placeholder="Mô tả" />
      <button @click="isEditing ? updateCategory() : addCategory()">
        {{ isEditing ? 'Update' : 'Lưu' }}
      </button>
      <button @click="closeAddCategoryForm">Hủy</button>
    </div>

    <!-- Bảng hiển thị Category -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in displayedCategories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button class="btn edit" @click="editCategory(category)">Edit</button>
            <button class="btn delete" @click="deleteCategory(category.id)">Delete</button>
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

const categories = ref([]) // Lưu trữ danh sách category
const currentPage = ref(1) // Trang hiện tại cho phân trang
const itemsPerPage = 5 // Số mục trên mỗi trang
const totalPages = ref(0) // Tổng số trang cho phân trang
const isAddingCategory = ref(false) // Kiểm tra trạng thái hiển thị form thêm/sửa category
const isEditing = ref(false) // Trạng thái xác định chỉnh sửa hoặc thêm mới
const editingCategoryId = ref(null) // ID của category đang chỉnh sửa

// Biến lưu trữ Category mới hoặc đang chỉnh sửa
const newCategory = ref({
  name: '',
  description: ''
})

// Hàm mở form thêm Category
const openAddCategoryForm = () => {
  isAddingCategory.value = true
  isEditing.value = false // Không phải đang chỉnh sửa
  resetNewCategoryForm() // Reset form trước khi thêm mới
}

// Hàm đóng form thêm Category
const closeAddCategoryForm = () => {
  isAddingCategory.value = false
}

// Hàm thêm Category mới
const addCategory = async () => {
  if (newCategory.value.name && newCategory.value.description) {
    const maxId = categories.value.length > 0 
      ? Math.max(...categories.value.map(category => parseInt(category.id, 10)))
      : 0

    const newCat = {
      id: (maxId + 1).toString(),
      name: newCategory.value.name,
      description: newCategory.value.description
    }

    try {
      await axios.post('http://localhost:1007/categories', newCat)
      categories.value.push(newCat)
      closeAddCategoryForm()
      resetNewCategoryForm()
    } catch (error) {
      console.error('Error adding category:', error)
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!')
  }
}

// Hàm cập nhật Category hiện có
const updateCategory = async () => {
  if (newCategory.value.name && newCategory.value.description) {
    const updatedCat = {
      id: editingCategoryId.value,
      name: newCategory.value.name,
      description: newCategory.value.description
    }

    try {
      await axios.put(`http://localhost:1007/categories/${editingCategoryId.value}`, updatedCat)
      const index = categories.value.findIndex(cat => cat.id === editingCategoryId.value)
      if (index !== -1) {
        categories.value[index] = updatedCat
      }
      closeAddCategoryForm()
      resetNewCategoryForm()
    } catch (error) {
      console.error('Error updating category:', error)
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!')
  }
}

// Hàm reset form thêm Category
const resetNewCategoryForm = () => {
  newCategory.value = {
    name: '',
    description: ''
  }
}

// Hàm lấy danh sách Category
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:1007/categories')
    categories.value = response.data
    totalPages.value = Math.ceil(categories.value.length / itemsPerPage)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Hàm thay đổi trang
const changePage = (page) => {
  currentPage.value = page
}

// Hiển thị Category theo trang
const displayedCategories = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return categories.value.slice(startIndex, startIndex + itemsPerPage)
})

// Hàm chỉnh sửa Category
const editCategory = (category) => {
  isAddingCategory.value = true
  isEditing.value = true
  editingCategoryId.value = category.id
  newCategory.value = { ...category } // Đổ dữ liệu vào form để chỉnh sửa
}

// Hàm xóa Category
const deleteCategory = async (id) => {
  try {
    await axios.delete(`http://localhost:1007/categories/${id}`)
    categories.value = categories.value.filter(category => category.id !== id)
  } catch (error) {
    console.error('Error deleting category:', error)
  }
}

onMounted(fetchCategories) // Tải danh sách Category khi component được mount
</script>

<style scoped>
.categorys {
  padding: 20px;
  background-color: #fff;
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

.add-category {
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
  border-collapse: collapse;
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

.btn {
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
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
/* Modal hiển thị form thêm Category */
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
