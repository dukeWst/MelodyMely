import AuthLogin from '@/auth/AuthLogin.vue'
import AuthSignUp from '@/auth/AuthSignUp.vue'
import VerifyEmail from '@/auth/VerifyEmail.vue'
import DashboardPage from '@/dashboard/DashboardPage.vue'
import HomePage from '@/home/HomePage.vue'
import NotFoundPage from '@/not_found/NotFoundPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthLogin,
      meta: { hideLayout: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthSignUp,
      meta: { hideLayout: true },
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyEmail,
      meta: { hideLayout: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { hideLayout: true }, // Dashboard thường có layout riêng
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: { hideLayout: true },
    },
  ],
})

// --- THÊM PHẦN NÀY ---
router.beforeEach((to, from, next) => {
  // 1. Kiểm tra trạng thái đăng nhập
  // (Ví dụ: kiểm tra xem có token trong localStorage không)
  const isAuthenticated = localStorage.getItem('access_token') // Thay bằng logic auth thực tế của bạn

  // Danh sách các trang mà người dùng đã đăng nhập không nên vào lại (Home, Login, Signup)
  const guestPages = ['home', 'login', 'signup', 'verify']

  if (isAuthenticated) {
    // KỊCH BẢN 1: Đã đăng nhập
    if (guestPages.includes(to.name)) {
      // Nếu cố vào Home/Login/Signup -> Chuyển hướng sang Dashboard
      next({ name: 'dashboard' })
    } else {
      // Nếu vào các trang khác (ví dụ Dashboard) -> Cho phép
      next()
    }
  } else {
    // KỊCH BẢN 2: Chưa đăng nhập
    if (to.name === 'dashboard') {
      // Nếu cố vào Dashboard mà chưa đăng nhập -> Đẩy về Login
      next({ name: 'login' })
    } else {
      // Cho phép vào Home, Login, Signup...
      next()
    }
  }
})

export default router
