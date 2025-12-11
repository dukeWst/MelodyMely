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
      // [NEW] Thêm cờ showLoader
      meta: { showLoader: true },
    },
    {
      path: '/login',
      name: 'login',
      component: AuthLogin,
      meta: { hideLayout: true, showLoader: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthSignUp,
      meta: { hideLayout: true, showLoader: false },
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyEmail,
      meta: { hideLayout: true, showLoader: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { hideLayout: true, showLoader: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      // [NEW] Không có showLoader (hoặc false)
      meta: { hideLayout: true, showLoader: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  const guestPages = ['home', 'login', 'signup', 'verify']

  if (isAuthenticated) {
    if (guestPages.includes(to.name)) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    if (to.name === 'dashboard') {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

export default router
