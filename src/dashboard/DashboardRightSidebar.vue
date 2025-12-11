<script setup lang="ts">
import { MoreHorizontal, Maximize2, AudioWaveform, Play } from 'lucide-vue-next'
import { ref, defineProps } from 'vue'

const props = defineProps(['currentTrackInfo'])

const sidebarWidth = ref(350)
const minSidebarWidth = 280
const maxSidebarWidth = 500
const isResizing = ref(false)

const startResize = () => {
  isResizing.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing.value) return
  let newWidth = window.innerWidth - e.clientX - 16
  if (newWidth < minSidebarWidth) newWidth = minSidebarWidth
  if (newWidth > maxSidebarWidth) newWidth = maxSidebarWidth
  sidebarWidth.value = newWidth
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}
</script>

<template>
  <aside
    class="hidden xl:flex flex-col flex-shrink-0 bg-[#1E212E]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 overflow-y-auto custom-scrollbar relative z-10"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <div
      @mousedown="startResize"
      class="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-pink-500/50 transition z-50"
    ></div>

    <div class="flex justify-between items-center mb-6">
      <h3 class="font-bold text-gray-300">Now Playing</h3>
      <button class="text-gray-500 hover:text-white"><MoreHorizontal class="w-5 h-5" /></button>
    </div>

    <div
      class="w-full aspect-square bg-gradient-to-b from-gray-700 to-black rounded-2xl mb-6 shadow-2xl relative overflow-hidden group"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <AudioWaveform class="w-24 h-24 text-white/20" />
      </div>
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-4"
      >
        <button class="text-white hover:scale-110 transition"><Maximize2 class="w-8 h-8" /></button>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold leading-tight mb-1">{{ currentTrackInfo.title }}</h2>
      <a href="#" class="text-pink-400 hover:text-pink-300 transition">{{
        currentTrackInfo.artist
      }}</a>
    </div>

    <div class="flex-1 bg-[#151720]/50 rounded-2xl p-4 border border-white/5">
      <h4 class="font-bold text-sm text-gray-400 uppercase tracking-wider mb-4">Up Next</h4>
      <div class="space-y-4">
        <div
          v-for="(track, idx) in currentTrackInfo.nextUp"
          :key="idx"
          class="flex items-center gap-3 group cursor-pointer"
        >
          <div
            :class="`w-10 h-10 ${track.cover} rounded-lg flex-shrink-0 relative overflow-hidden`"
          >
            <div
              class="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center"
            >
              <Play class="w-3 h-3 fill-white" />
            </div>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold truncate group-hover:text-pink-500 transition">
              {{ track.title }}
            </p>
            <p class="text-xs text-gray-500 truncate">{{ track.artist }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
