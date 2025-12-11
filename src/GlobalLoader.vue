<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  visible: boolean
}>()
</script>

<template>
  <Transition name="fade-slow">
    <div
      v-if="visible"
      class="fixed inset-0 z-[99999] bg-[#151720] flex items-center justify-center pointer-events-none"
    >
      <div class="flex flex-col items-center animate-pulse">
        <div
          class="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 mb-6 shadow-[0_0_50px_rgba(236,72,153,0.6)] animate-spin-slow"
        ></div>
        <span class="text-white/60 text-xs font-bold tracking-[0.4em] uppercase">
          Loading Melody
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Hiệu ứng Fade Out chậm */
.fade-slow-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.fade-slow-leave-from {
  opacity: 1;
}
.fade-slow-leave-to {
  opacity: 0;
}

/* Hiệu ứng xoay */
.animate-spin-slow {
  animation: spin 3s linear infinite;
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
