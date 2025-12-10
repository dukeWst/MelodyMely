<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#0e1012] text-white">
    <div class="w-full max-w-md p-8 shadow-2xl my-10 border border-white/5">
      <div class="text-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 mx-auto mb-3 text-pink-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-white">Verify Your Email</h2>
        <p class="text-gray-400 text-sm mt-2">
          We've sent a verification link to
          <br />
          <span class="font-bold text-white">{{ email }}</span>
        </p>
      </div>

      <div class="space-y-4">
        <div class="p-4 text-gray-300 text-sm text-center">
          Please check your inbox (and spam folder) to complete your registration.
        </div>

        <button
          @click="handleResend"
          :disabled="isLoading"
          class="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold text-white shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
          <span v-else>Resend Verification Email</span>
        </button>

        <div
          v-if="message"
          :class="[
            'p-3 rounded-lg text-sm text-center font-medium',
            isError
              ? 'bg-red-500/10 border border-red-500/50 text-red-400'
              : 'bg-green-500/10 border border-green-500/50 text-green-400',
          ]"
        >
          {{ message }}
        </div>
      </div>

      <p class="text-center text-gray-400 mt-6 text-sm">
        Go back to
        <RouterLink
          to="/login"
          class="font-bold text-pink-400 hover:text-pink-500 transition hover:underline"
          >Log In</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// Giả định bạn đã import supabase
// import { supabase } from '@/supabase'

const route = useRoute()
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)

// Lấy email từ query params (được truyền từ AuthSignUp.vue)
const email = (route.query.email as string) || 'your email address'

const handleResend = async () => {
  message.value = ''
  isError.value = false

  if (!email || email === 'your email address') {
    isError.value = true
    message.value = 'Email address not found. Please go back to the sign up page.'
    return
  }

  // GIẢ LẬP GỌI API GỬI LẠI EMAIL XÁC THỰC (Dựa trên cách sử dụng Supabase)
  try {
    isLoading.value = true

    // Logic thực tế với Supabase (Ví dụ):
    /*
    const { error } = await supabase.auth.resend({
      type: 'signup', // Hoặc 'email_change', 'invite'
      email: email,
    })

    if (error) throw error
    */

    // Giả lập thành công
    await new Promise((resolve) => setTimeout(resolve, 1500))

    isError.value = false
    message.value = 'Verification email successfully resent! Please check your inbox.'
  } catch (error: any) {
    isError.value = true
    message.value = error.message || 'Failed to resend email. Please try again later.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Không cần style cho autofill vì không có input field */
</style>
