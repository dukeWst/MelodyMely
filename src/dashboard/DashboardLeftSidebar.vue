<script setup lang="ts">
import { AudioWaveform, Home, Search, Library, PlusSquare, Heart, User } from 'lucide-vue-next'
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['currentView'])
const emit = defineEmits(['navigate', 'toggleMenu'])
</script>

<template>
  <aside
    class="w-20 lg:w-64 bg-[#1E212E]/60 backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col flex-shrink-0 z-10 transition-all duration-300"
  >
    <div class="p-6 flex justify-center lg:justify-start">
      <RouterLink to="/dashboard" class="flex items-center gap-3 font-bold tracking-wide group">
        <div class="relative">
          <div
            class="absolute inset-0 bg-pink-500 blur-lg opacity-40 group-hover:opacity-60 transition"
          ></div>
          <AudioWaveform class="w-8 h-8 text-pink-500 relative z-10" />
        </div>
        <span class="text-xl text-white hidden lg:block font-display">MelodyMely</span>
      </RouterLink>
    </div>

    <nav class="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
      <RouterLink
        to="/dashboard"
        @click.prevent="emit('navigate', 'home')"
        class="flex items-center gap-4 px-3 lg:px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden"
        :class="
          currentView === 'home'
            ? 'bg-white/10 text-white shadow-lg shadow-white/5'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        "
      >
        <Home class="w-6 h-6 flex-shrink-0" />
        <span class="font-medium hidden lg:block">Home</span>
        <div
          v-if="currentView === 'home'"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full"
        ></div>
      </RouterLink>

      <a
        href="#"
        class="flex items-center gap-4 px-3 lg:px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition"
      >
        <Search class="w-6 h-6 flex-shrink-0" />
        <span class="font-medium hidden lg:block">Search</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-4 px-3 lg:px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition"
      >
        <Library class="w-6 h-6 flex-shrink-0" />
        <span class="font-medium hidden lg:block">Library</span>
      </a>

      <div class="my-4 border-t border-white/5 mx-2"></div>

      <a
        href="#"
        class="flex items-center gap-4 px-3 lg:px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition"
      >
        <div class="w-6 h-6 bg-gray-700/50 rounded flex items-center justify-center flex-shrink-0">
          <PlusSquare class="w-4 h-4" />
        </div>
        <span class="font-medium hidden lg:block">Create Playlist</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-4 px-3 lg:px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition"
      >
        <div
          class="w-6 h-6 bg-gradient-to-br from-purple-700 to-blue-500 rounded flex items-center justify-center flex-shrink-0 opacity-80"
        >
          <Heart class="w-3 h-3 text-white fill-white" />
        </div>
        <span class="font-medium hidden lg:block">Liked Songs</span>
      </a>
    </nav>

    <div class="p-4 mt-auto border-t border-white/5 lg:hidden flex justify-center">
      <button
        @click="emit('toggleMenu')"
        class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
      >
        <User class="w-4 h-4 text-white" />
      </button>
    </div>
  </aside>
</template>
