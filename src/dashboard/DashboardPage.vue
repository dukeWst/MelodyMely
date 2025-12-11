<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { Heart, SkipBack, Play, SkipForward, ListMusic } from 'lucide-vue-next'

// Import Components
import DashboardLeftSidebar from './DashboardLeftSidebar.vue'
import DashboardMainContent from './DashboardMainContent.vue'
import DashboardRightSidebar from './DashboardRightSidebar.vue'

const router = useRouter()
const currentView = ref('home')
const fullName = ref('Loading...')
const avatarUrl = ref<string | null>(null)
const isMenuOpen = ref(false)

const recentMixes = ref([
  { title: 'Chill Vibes', artist: 'Relax Daily', color: 'from-blue-500 to-indigo-600' },

  { title: 'Top Hits 2024', artist: 'Global Charts', color: 'from-rose-500 to-pink-600' },

  { title: 'Coding Focus', artist: 'Lo-Fi Girl', color: 'from-emerald-500 to-teal-600' },

  { title: 'Workout Energy', artist: 'Gym Motivation', color: 'from-orange-500 to-amber-600' },
])

const recommended = ref([
  { title: 'Midnight City', artist: 'M83', cover: 'bg-purple-600' },

  { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'bg-red-600' },

  { title: 'Levitating', artist: 'Dua Lipa', cover: 'bg-yellow-500' },

  { title: 'Stay', artist: 'Kid LAROI', cover: 'bg-green-500' },
])

const publicPlaylists = ref([
  { title: 'My Gym Mix', author: 'You', cover: 'bg-orange-600' },

  { title: 'Late Night Drive', author: 'You', cover: 'bg-blue-900' },

  { title: 'Coding Mode', author: 'You', cover: 'bg-green-700' },

  { title: 'Sad Boi Hours', author: 'You', cover: 'bg-gray-700' },
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

// --- RESIZE LOGIC (Cập nhật cho layout có padding) ---

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

  // Trừ đi khoảng padding bên phải (16px) để tính toán chính xác hơn

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

// --- LOGIC ---

const getUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    fullName.value = user.user_metadata.full_name || user.email?.split('@')[0] || 'User'
    // Lấy avatar từ metadata và thêm timestamp để tránh cache khi load trang
    const rawUrl = user.user_metadata.avatar_url
    avatarUrl.value = rawUrl ? `${rawUrl}?t=${new Date().getTime()}` : null
  } else {
    router.push('/login')
  }
}

const handleProfileUpdate = (updatedData: { fullName: string; avatarUrl: string | null }) => {
  fullName.value = updatedData.fullName
  avatarUrl.value = updatedData.avatarUrl // Cập nhật URL mới -> Các con sẽ tự render lại ảnh
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (view: string) => {
  currentView.value = view

  isMenuOpen.value = false
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
  <div
    class="flex h-screen bg-[#0F111A] p-3 gap-3 font-sans overflow-hidden relative selection:bg-pink-500 selection:text-white"
    @click="closeMenu"
  >
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]"
      ></div>
    </div>

    <DashboardLeftSidebar
      :currentView="currentView"
      @navigate="navigateTo"
      @toggleMenu="toggleMenu"
    />

    <DashboardMainContent
      :currentView="currentView"
      :fullName="fullName"
      :avatarUrl="avatarUrl"
      :isMenuOpen="isMenuOpen"
      :recentMixes="recentMixes"
      :recommended="recommended"
      :publicPlaylists="publicPlaylists"
      @toggleMenu="toggleMenu"
      @navigate="navigateTo"
      @logout="handleLogout"
      @profile-updated="handleProfileUpdate"
    />

    <DashboardRightSidebar :currentTrackInfo="currentTrackInfo" />

    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-[#151720]/90 backdrop-blur-2xl border border-white/10 rounded-full p-3 shadow-2xl z-50 flex items-center justify-between group hover:scale-[1.01] transition duration-300"
    >
      <div class="flex items-center gap-4 w-[30%] pl-2">
        <div
          class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 animate-spin-slow"
          style="animation-duration: 10s"
        >
          <div class="w-4 h-4 bg-pink-500 rounded-full"></div>
        </div>
        <div class="hidden sm:block overflow-hidden">
          <h4 class="text-sm font-bold truncate text-white cursor-pointer hover:underline">
            {{ currentTrackInfo.title }}
          </h4>
          <p class="text-xs text-gray-400 truncate cursor-pointer hover:underline">
            {{ currentTrackInfo.artist }}
          </p>
        </div>
        <button class="text-gray-400 hover:text-pink-500 transition">
          <Heart class="w-5 h-5" />
        </button>
      </div>

      <div class="flex flex-col items-center w-[40%]">
        <div class="flex items-center gap-6 mb-1">
          <button class="text-gray-400 hover:text-white transition hover:-translate-x-1">
            <SkipBack class="w-5 h-5" />
          </button>
          <button
            class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition text-black"
          >
            <Play class="w-5 h-5 fill-black ml-1" />
          </button>
          <button class="text-gray-400 hover:text-white transition hover:translate-x-1">
            <SkipForward class="w-5 h-5" />
          </button>
        </div>
        <div class="w-full max-w-xs flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <span>0:42</span>
          <div class="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer group/bar">
            <div class="w-1/3 h-full bg-pink-500 rounded-full group-hover/bar:bg-pink-400"></div>
          </div>
          <span>3:15</span>
        </div>
      </div>

      <div class="w-[30%] flex justify-end pr-4 gap-3">
        <div class="hidden sm:flex items-center gap-2 w-24">
          <div class="h-1 flex-1 bg-gray-700 rounded-full">
            <div class="w-2/3 h-full bg-white rounded-full"></div>
          </div>
        </div>
        <button class="text-gray-400 hover:text-white"><ListMusic class="w-5 h-5" /></button>
      </div>
    </div>
  </div>
</template>

<style>
/* LƯU Ý: Không dùng 'scoped' ở đây để các class này (font, scrollbar) 
  có thể áp dụng xuống các component con (LeftSidebar, MainContent, RightSidebar) 
*/

/* 1. Import Font hiện đại (Outfit) */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Outfit', sans-serif;
}

/* 2. Tùy chỉnh thanh cuộn (Dùng chung cho cả 3 cột) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px; /* Thanh cuộn mảnh hơn */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1); /* Màu tối mờ */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3); /* Sáng hơn khi hover */
}

/* 3. Animation xuất hiện nội dung (Fade In Up) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 4. Animation xoay đĩa nhạc ở Player Bar */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
</style>
