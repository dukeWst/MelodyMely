<script setup lang="ts">
interface Props {
  icon: any
  status: string
  content: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="bg-white/10 p-6 rounded-xl backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
  >
    <h4 class="flex gap-2 text-xl font-semibold mb-2">
      <slot name="icon"></slot>
      {{ props.status }}
    </h4>
    <p class="text-gray-300 text-sm">{{ content }}</p>
  </div>
</template>
