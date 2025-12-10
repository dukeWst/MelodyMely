<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 to-black text-white"
  >
    <div class="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h2 class="text-3xl font-bold text-center mb-8 text-pink-400">Login to MelodyMely</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2"
            >Email or Username</label
          >
          <input
            id="email"
            v-model="formData.email"
            type="text"
            required
            class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="enter your email or username"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2"
            >Password</label
          >
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="enter your password"
          />
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-pink-300 hover:text-pink-500 transition"
            >Forgot Password?</a
          >
        </div>

        <button
          type="submit"
          class="w-full px-8 py-3 bg-pink-500 rounded-lg text-lg font-semibold hover:bg-pink-600 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/50"
        >
          Sign In
        </button>
      </form>

      <p class="text-center text-gray-400 mt-6">
        Don't have an account?
        <a href="#" class="font-medium text-pink-400 hover:text-pink-500 transition">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Khởi tạo trạng thái form (dùng ref hoặc reactive)
const formData = ref({
  email: '',
  password: '',
})

// Hàm xử lý logic đăng nhập
const handleLogin = () => {
  console.log('Attempting to login with:', formData.value)
  // Ở đây bạn sẽ gọi API đăng nhập...

  // Ví dụ: Reset form sau khi gửi (hoặc xử lý thành công/thất bại)
  // formData.value.email = '';
  // formData.value.password = '';
}
</script>

<style scoped>
/* Không cần thiết lập style nếu bạn chỉ dùng Tailwind CSS, 
   nhưng nếu có style tùy chỉnh thì nên đặt ở đây */
</style>
