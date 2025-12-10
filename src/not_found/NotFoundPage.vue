<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Disc3, Home, Music2 } from 'lucide-vue-next'
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[#0e1012] text-white relative overflow-hidden"
  >
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]"
      ></div>
    </div>

    <div class="z-10 text-center px-4">
      <div class="relative mb-8 inline-block">
        <Disc3 class="w-32 h-32 text-gray-700 animate-spin-slow" />
        <Music2
          class="w-12 h-12 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h1
        class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2"
      >
        404
      </h1>

      <h2 class="text-3xl font-bold mb-4">Lost in the Rhythm?</h2>

      <p class="text-gray-400 text-lg mb-8 max-w-md mx-auto">
        Unfortunately, the song or page you are looking for does not exist or has been removed from
        the playlist.
      </p>

      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition transform shadow-lg shadow-white/10"
      >
        <Home class="w-5 h-5" />
        Back to Home
      </RouterLink>
    </div>

    <div class="absolute bottom-8 text-gray-600 text-sm z-10">MelodyMely - Music for everyone</div>
  </div>
</template>

<style scoped>
/* Hiệu ứng xoay chậm cho đĩa nhạc */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
