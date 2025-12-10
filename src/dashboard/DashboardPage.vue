<script setup lang="ts">
import {
  AudioWaveform,
  Home,
  Search,
  Library,
  PlusSquare,
  Heart,
  User,
  LogOut,
  Play,
  SkipForward,
  SkipBack,
  Settings,
  MoreHorizontal,
  ListMusic,
  X,
} from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const searchQuery = ref('') // <--- THÊM BIẾN NÀY

// --- STATE ---
const recentMixes = ref([
  { title: 'Chill Vibes', artist: 'Relax Daily', color: 'bg-indigo-500' },
  { title: 'Top Hits 2024', artist: 'Global Charts', color: 'bg-pink-500' },
  { title: 'Coding Focus', artist: 'Lo-Fi Girl', color: 'bg-blue-600' },
  { title: 'Workout Energy', artist: 'Gym Motivation', color: 'bg-orange-500' },
])

const recommended = ref([
  { title: 'Midnight City', artist: 'M83', cover: 'bg-purple-600' },
  { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'bg-red-600' },
  { title: 'Levitating', artist: 'Dua Lipa', cover: 'bg-yellow-500' },
  { title: 'Stay', artist: 'Kid LAROI', cover: 'bg-green-500' },
])

const currentTrackInfo = ref({
  title: 'Neon Lights',
  artist: 'Synthwave Boy',
  album: 'Retro Future Nights',
  releaseYear: '2023',
  writers: ['Max Martin', 'Synthwave Boy'],
  producers: ['Metro Boomin'],
  nextUp: [
    { title: 'Starboy', artist: 'The Weeknd', cover: 'bg-red-500' },
    { title: 'Get Lucky', artist: 'Daft Punk', cover: 'bg-yellow-600' },
    { title: 'Nightcall', artist: 'Kavinsky', cover: 'bg-blue-800' },
  ],
})

const fullName = ref('Loading...')
const isMenuOpen = ref(false)

// --- RESIZE LOGIC ---
const sidebarWidth = ref(320)
const minSidebarWidth = 250
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
  let newWidth = window.innerWidth - e.clientX
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

// --- LOGIC ---
const getUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    fullName.value = user.user_metadata.full_name || user.email?.split('@')[0] || 'User'
  } else {
    router.push('/login')
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('access_token')
  router.push('/login')
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  getUserProfile()
})
</script>

<template>
  <div class="flex flex-col h-screen bg-black text-white font-sans" @click="closeMenu">
    <header
      class="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0 z-30 gap-4"
    >
      <div class="flex items-center gap-8 w-64">
        <RouterLink to="/" class="flex items-center gap-2 font-bold tracking-wide">
          <AudioWaveform class="w-8 h-8 text-pink-500" />
          <span class="text-xl text-white hidden md:block">MelodyMely</span>
        </RouterLink>
      </div>

      <div class="flex-1 flex justify-center max-w-2xl">
        <div class="relative w-full text-gray-400 focus-within:text-white transition-colors">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search class="w-5 h-5" />
          </div>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="What do you want to play?"
            class="block w-full py-2.5 pl-10 pr-10 bg-[#1f1f1f] border border-transparent rounded-full text-sm placeholder-gray-400 text-white focus:outline-none focus:bg-[#2a2a2a] focus:ring-2 focus:ring-white/20 hover:bg-[#2a2a2a] transition-all"
          />

          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="relative w-64 flex justify-end items-center" @click.stop>
        <button
          @click="toggleMenu"
          class="flex items-center gap-2 bg-black hover:bg-[#282828] transition p-1 rounded-full cursor-pointer focus:outline-none"
        >
          <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
            <User class="text-white w-5 h-5" />
          </div>
        </button>

        <div
          v-if="isMenuOpen"
          class="absolute right-0 top-full mt-3 w-56 bg-[#282828] rounded-md shadow-xl py-1 border border-gray-700 z-50 animate-fade-in-down"
        >
          <div class="flex flex-col gap-1 px-4 py-2 border-b border-gray-700">
            <p class="text-xs text-gray-400">Signed in as</p>
            <p class="text-sm font-bold text-white truncate">{{ fullName }}</p>
          </div>
          <button
            class="flex items-center w-full cursor-pointer px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            <User2 class="w-4 h-4 mr-2" /> Profile
          </button>
          <button
            class="flex items-center w-full cursor-pointer px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            <Settings class="w-4 h-4 mr-2" /> Settings
          </button>

          <div class="border-t border-gray-700 my-1"></div>
          <button
            @click="handleLogout"
            class="w-full text-left flex items-center cursor-pointer px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            <LogOut class="w-4 h-4 mr-2" /> Log out
          </button>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden relative">
      <aside
        class="w-64 bg-black flex flex-col border-r border-gray-800 flex-shrink-0 pb-24 overflow-y-auto"
      >
        <nav class="flex-1 px-4 py-6 space-y-2">
          <a
            href="#"
            class="flex items-center gap-4 px-4 py-3 text-white bg-gray-800 rounded-lg transition"
          >
            <Home class="w-6 h-6" /> <span class="font-medium">Home</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition"
          >
            <Search class="w-6 h-6" /> <span class="font-medium">Search</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition"
          >
            <Library class="w-6 h-6" /> <span class="font-medium">Your Library</span>
          </a>

          <div class="mt-8 pt-4 border-t border-gray-800 space-y-2">
            <a
              href="#"
              class="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-white transition"
            >
              <PlusSquare class="w-6 h-6" /> <span>Create Playlist</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-white transition"
            >
              <Heart class="w-6 h-6 text-pink-500" /> <span>Liked Songs</span>
            </a>
          </div>
        </nav>
      </aside>

      <main
        class="flex-1 relative overflow-y-auto bg-gradient-to-b from-purple-900 via-black to-black pb-24"
      >
        <div class="px-8 py-8">
          <section class="mb-10">
            <h2 class="text-3xl font-bold mb-6">Good evening</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div
                v-for="(item, index) in recentMixes"
                :key="index"
                class="group flex items-center bg-white/10 hover:bg-white/20 transition rounded overflow-hidden cursor-pointer"
              >
                <div :class="`w-20 h-20 ${item.color} shadow-lg flex items-center justify-center`">
                  <AudioWaveform class="text-white/50 w-10 h-10" />
                </div>
                <div class="px-4 font-bold truncate">{{ item.title }}</div>
                <div
                  class="ml-auto mr-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-105"
                >
                  <Play class="fill-black text-black ml-1 w-5 h-5" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="flex justify-between items-end mb-6">
              <h3 class="text-2xl font-bold">Made for You</h3>
              <a
                href="#"
                class="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider"
                >Show all</a
              >
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <div
                v-for="(track, index) in recommended"
                :key="index"
                class="bg-gray-900/60 p-4 rounded-xl hover:bg-gray-800 transition cursor-pointer group"
              >
                <div
                  :class="`w-full aspect-square ${track.cover} rounded-md mb-4 shadow-lg relative`"
                >
                  <div
                    class="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Play class="fill-black text-black ml-1" />
                  </div>
                </div>
                <h4 class="font-bold truncate mb-1">{{ track.title }}</h4>
                <p class="text-sm text-gray-400 truncate">{{ track.artist }}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <aside
        class="bg-black border-l border-gray-800 hidden xl:flex flex-col flex-shrink-0 p-6 overflow-y-auto pb-24 relative group/sidebar"
        :style="{ width: sidebarWidth + 'px' }"
      >
        <div
          @mousedown="startResize"
          class="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-pink-500 hover:w-1.5 transition-all z-50 bg-transparent"
          :class="{ 'bg-pink-500 w-1.5': isResizing }"
        ></div>

        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg">Now Playing</h3>
          <MoreHorizontal class="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
        </div>

        <div
          class="w-full aspect-square bg-pink-600 rounded-lg mb-6 shadow-2xl flex items-center justify-center relative overflow-hidden"
        >
          <AudioWaveform class="text-white/50 w-1/3 h-1/3" />
        </div>

        <div class="mb-6">
          <h2
            class="text-2xl font-bold hover:underline cursor-pointer mb-1 break-words leading-tight"
          >
            {{ currentTrackInfo.title }}
          </h2>
          <p class="text-gray-400 text-lg hover:underline cursor-pointer break-words">
            {{ currentTrackInfo.artist }}
          </p>
        </div>

        <div class="bg-gray-900/60 rounded-xl p-4 mb-8">
          <div class="flex justify-between items-center mb-4">
            <span class="font-bold text-sm">Credits</span>
            <span class="text-xs text-gray-400 font-bold uppercase">Show all</span>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-gray-400 text-xs uppercase font-bold mb-1">Album</p>
              <p class="font-medium text-sm truncate">{{ currentTrackInfo.album }}</p>
            </div>
            <div>
              <p class="text-gray-400 text-xs uppercase font-bold mb-1">Written By</p>
              <p class="font-medium text-sm truncate">{{ currentTrackInfo.writers.join(', ') }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900/40 rounded-xl p-4">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-bold text-md flex items-center gap-2">
              <ListMusic class="w-4 h-4" /> Next Up
            </h4>
            <span class="text-xs text-gray-400 hover:text-white cursor-pointer font-bold"
              >Open Queue</span
            >
          </div>
          <div class="space-y-3">
            <div
              v-for="(track, idx) in currentTrackInfo.nextUp"
              :key="idx"
              class="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition"
            >
              <div class="relative flex-shrink-0">
                <div :class="`w-10 h-10 ${track.cover} rounded flex items-center justify-center`">
                  <AudioWaveform class="w-4 h-4 text-white/50" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold truncate text-white">{{ track.title }}</p>
                <p class="text-xs text-gray-400 truncate">{{ track.artist }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div
      class="fixed bottom-0 left-0 right-0 h-24 bg-black border-t border-gray-800 px-6 flex items-center justify-between z-50"
      @click.stop
    >
      <div class="flex items-center gap-4 w-1/3">
        <div class="w-14 h-14 bg-pink-600 rounded"></div>
        <div>
          <h4 class="text-sm font-bold hover:underline cursor-pointer">
            {{ currentTrackInfo.title }}
          </h4>
          <p class="text-xs text-gray-400 hover:underline cursor-pointer">
            {{ currentTrackInfo.artist }}
          </p>
        </div>
        <Heart class="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer ml-2" />
      </div>

      <div class="flex flex-col items-center w-1/3">
        <div class="flex items-center gap-6 mb-2">
          <SkipBack class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <div
            class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer"
          >
            <Play class="fill-black text-black ml-1 w-5 h-5" />
          </div>
          <SkipForward class="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
        <div class="w-full flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span>0:42</span>
          <div class="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden">
            <div class="h-full w-1/3 bg-white hover:bg-green-500"></div>
          </div>
          <span>3:15</span>
        </div>
      </div>

      <div class="flex justify-end w-1/3">
        <div class="w-24 h-1 bg-gray-600 rounded-full">
          <div class="w-1/2 h-full bg-white"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
