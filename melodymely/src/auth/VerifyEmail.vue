<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 to-black text-white"
  >
    <div
      class="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl my-10 border border-white/5"
    >
      <div class="flex justify-center mb-6">
        <div
          class="relative flex items-center justify-center w-20 h-20 bg-black/30 rounded-full border border-gray-700 shadow-inner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div class="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-20"></div>
        </div>
      </div>

      <div class="text-center mb-8">
        <h2
          class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3"
        >
          Verify your email
        </h2>
        <p class="text-gray-300 text-sm">We've sent a verification link to</p>

        <p class="text-white font-medium text-lg mt-1">{{ email }}</p>

        <p class="text-gray-400 text-sm mt-3">
          Please check your inbox and click the link to verify your account.
        </p>
      </div>

      <div
        v-if="message"
        class="mb-4 text-center text-sm font-medium"
        :class="isError ? 'text-red-400' : 'text-green-400'"
      >
        {{ message }}
      </div>

      <button
        type="button"
        @click="handleResendEmail"
        :disabled="isResending"
        class="block w-full py-3 text-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold text-white shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span v-if="isResending" class="flex items-center">
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
        <span v-else>Click to resend</span>
      </button>

      <div class="mt-8 pt-6 border-t border-gray-600/50 text-center">
        <p class="text-gray-400 text-sm">
          <span class="mr-1">←</span>
          <RouterLink
            to="/login"
            class="font-medium text-pink-400 hover:text-pink-500 transition hover:underline"
          >
            Back to log in
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase'

const route = useRoute()

// Lấy email từ URL Query, nếu không có thì hiện fallback text
const email = (route.query.email as string) || 'your email address'

const isResending = ref(false)
const message = ref('')
const isError = ref(false)

const handleResendEmail = async () => {
  if (!email || email === 'your email address') {
    message.value = 'Email address not found. Please try signing up again.'
    isError.value = true
    return
  }

  isResending.value = true
  message.value = ''
  isError.value = false

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (error) throw error

    message.value = 'Verification email sent! Please check your inbox.'
    isError.value = false
  } catch (error: any) {
    if (error.status === 429) {
      message.value = 'Please wait a minute before requesting another email.'
    } else {
      message.value = error.message
    }
    isError.value = true
  } finally {
    isResending.value = false
  }
}
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #2e1065 inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
