import { createRouter, createWebHistory } from 'vue-router';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';  
import authRoutes from './authRoutes';  

const routes = [
  ...adminRoutes,  // Gộp các route của admin
  ...userRoutes,  
  ...authRoutes    
];

// Tạo router với history mode
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
