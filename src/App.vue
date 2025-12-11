<template>
  <GlobalLoader :visible="isLoading" />

  <TheHeader v-if="!route.meta.hideLayout" />

  <main class="content-wrapper">
    <RouterView />
  </main>

  <TheFooter v-if="!route.meta.hideLayout" />
</template>

<script setup>
import TheHeader from './layout/TheHeader.vue'
import TheFooter from './layout/TheFooter.vue'
// [NEW] Import GlobalLoader (Đảm bảo đường dẫn đúng)
import GlobalLoader from '@/GlobalLoader.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const isLoading = ref(false)

// [NEW] Logic kích hoạt loading khi chuyển trang
watch(
  () => route.path,
  () => {
    // Kiểm tra meta showLoader
    if (route.meta.showLoader) {
      isLoading.value = true

      // Chạy màn hình đen trong 1 giây (hoặc tùy chỉnh)
      setTimeout(() => {
        isLoading.value = false
      }, 1000)
    } else {
      // Nếu là trang not-found, tắt ngay
      isLoading.value = false
    }
  },
  { immediate: true },
)
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #151720; /* Giữ màu nền để tránh nháy trắng */
  color: white;
}
</style>
