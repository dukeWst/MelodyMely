<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 to-black text-white"
  >
    <div
      class="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl my-10 border border-white/5"
    >
      <div class="text-center mb-6">
        <h2
          class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
        >
          Create Account
        </h2>
        <p class="text-gray-400 text-sm mt-2">Join MelodyMely and feel the beat</p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSignUp">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              v-model="form.fullName"
              type="text"
              class="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              v-model="form.email"
              type="text"
              class="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full pl-10 pr-12 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="Create a password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition"
            >
              <svg
                v-if="!showPassword"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="Repeat your password"
            />
          </div>
        </div>

        <div class="flex items-start mt-2">
          <div class="flex items-center h-5">
            <input
              v-model="form.agreed"
              id="terms"
              type="checkbox"
              class="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-pink-500 text-pink-500 cursor-pointer"
            />
          </div>
          <label
            for="terms"
            class="ml-2 text-sm font-medium text-gray-300 cursor-pointer select-none"
          >
            I agree to the
            <a href="#" class="text-pink-400 hover:underline">Terms of Service</a> and
            <a href="#" class="text-pink-400 hover:underline">Privacy Policy</a>
          </label>
        </div>

        <div
          v-if="errorMessage"
          class="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center font-medium"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold text-white shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
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
            Processing...
          </span>
          <span v-else>Create Account</span>
        </button>

        <div class="relative flex py-2 items-center">
          <div class="flex-grow border-t border-gray-600"></div>
          <span class="flex-shrink-0 mx-4 text-gray-400 text-sm">Or sign up with</span>
          <div class="flex-grow border-t border-gray-600"></div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 bg-black/30 border border-gray-600 rounded-lg hover:bg-white/10 transition text-gray-300"
          >
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 bg-black/30 border border-gray-600 rounded-lg hover:bg-white/10 transition text-gray-300"
          >
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </button>
        </div>
      </form>

      <p class="text-center text-gray-400 mt-6 text-sm">
        Already have an account?
        <RouterLink
          to="/login"
          class="font-medium text-pink-400 hover:text-pink-500 transition hover:underline"
          >Log In</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreed: false,
})

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleSignUp = async () => {
  errorMessage.value = ''

  // VALIDATION
  if (!form.fullName) {
    errorMessage.value = 'Full Name is required!'
    return
  }
  if (!form.email) {
    errorMessage.value = 'Email is required!'
    return
  }
  if (!isValidEmail(form.email)) {
    errorMessage.value = 'Invalid email format!'
    return
  }
  if (!form.password) {
    errorMessage.value = 'Password is required!'
    return
  }
  if (form.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters!'
    return
  }
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Confirm Password does not match!'
    return
  }
  if (!form.agreed) {
    errorMessage.value = 'Please agree to the Terms of Service!'
    return
  }

  // SUPABASE CALL
  try {
    isLoading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          avatar_url: '',
        },
      },
    })

    if (error) throw error

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      errorMessage.value = 'Email already exists. Please log in.'
    } else {
      // CHUYỂN HƯỚNG TRUYỀN EMAIL
      router.push({ path: '/verify', query: { email: form.email } })
    }
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
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
