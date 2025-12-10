import AuthLogin from '@/auth/AuthLogin.vue'
import AuthSignUp from '@/auth/AuthSignUp.vue'
import VerifyEmail from '@/auth/VerifyEmail.vue'
import HomePage from '@/home/HomePage.vue'
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
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthSignUp,
    },
    {
      path: '/verify',
      name: 'verify',
      component: VerifyEmail,
    },
  ],
})

export default router
