import UserLayout from '@/layouts/user/UserLayout.vue'
import LoginUser from '@/views/auth/LoginUser.vue'
import RegisterUser from '@/views/auth/RegisterUser.vue'
import Carts from '@/views/user/Carts.vue'
import CategoryPage from '@/views/user/CategoryPage.vue'
import Favourite from '@/views/user/Favourite.vue'
import Home from '@/views/user/Home.vue'
import PantsPage from '@/views/user/PantsPage.vue'
import ProductDetail from '@/views/user/ProductDetail.vue'
import Products from '@/views/user/Products.vue'
import ShirtsPage from '@/views/user/ShirtsPage.vue'
import UserDetail from '@/views/user/UserDetail.vue'

const userRoutes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path:'login',
        name: 'LoginUser',
        component:LoginUser,
      },
      {
        path:'register',
        name: 'RegisterUser',
        component: RegisterUser,
      },
      {
        path:'cart',
        name: 'Cart',
        component:Carts
      },
      {
        path:'user-detail',
        name:'user-detail',
        component: UserDetail,
      },
      {
        path:'ao-nam',
        name:'ao-nam',
        component: ShirtsPage,
      },
      {
        path:'quan-nam',
        name:'quan-nam',
        component: PantsPage,
      },
      {
        path: 'category/:id', // Dùng :id để bắt giá trị id của danh mục
        name: 'CategoryPage',
        component: CategoryPage,
        props: true // Để truyền params vào component dưới dạng props
      },
      {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
      },
      {
        path:'/favourites',
        name:'favourites',
        component:Favourite,
      }
      // Thêm các route khác 
    ],
  },
]

export default userRoutes
