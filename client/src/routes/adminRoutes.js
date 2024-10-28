import AdminLayout from '@/layouts/admin/AdminLayout.vue';
import Customers from '@/views/admin/Customers.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import Orders from '@/views/admin/Orders.vue';
import Products from '@/views/admin/Products.vue';
import Settings from '@/views/admin/Categorys.vue';

export default [
  {
    path: '/admin',
    redirect:"/admin/dashboard",
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (user) {
        next();
      } else {
        alert('Please log in first');
        next('/login-admin');
      }
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        component: Products
      },
      {
        path: 'orders',
        component: Orders
      },
      {
        path: 'customers',
        component: Customers
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  }
];
