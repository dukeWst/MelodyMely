<script setup lang="ts">
import {
  Search,
  X,
  Bell,
  User,
  User2,
  Settings,
  LogOut,
  Play,
  AudioWaveform,
  Edit,
  MoreHorizontal,
  ListMusic,
  Link as LinkIcon,
  Camera,
  Loader2,
} from 'lucide-vue-next'
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'
import { supabase } from '@/supabase'

// 1. Nhận Props từ cha
const props = defineProps<{
  currentView: string
  fullName: string
  avatarUrl?: string | null
  isMenuOpen: boolean
  recentMixes: any[]
  recommended: any[]
  publicPlaylists: any[]
}>()

const emit = defineEmits(['toggleMenu', 'navigate', 'logout', 'profile-updated'])

// --- STATE ---
const searchQuery = ref('')
const isProfileOptionsOpen = ref(false)
const isEditProfileModalOpen = ref(false)
const isLoading = ref(false) // Loading cho nút Save

// State Loading cho nội dung (Skeleton)
// Không còn showIntro (màn hình đen) ở đây nữa
const isPageLoading = ref(true)

// State cho form edit
const editForm = ref({
  name: '',
  avatarUrl: null as string | null,
})

// State xử lý ảnh
const previewAvatar = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
let selectedFile: File | null = null

// --- LOGIC ---

onMounted(async () => {
  // Bắt đầu hiển thị Skeleton
  isPageLoading.value = true

  try {
    // Giả lập thời gian tải dữ liệu (Skeleton sẽ chạy trong lúc này)
    // Màn hình đen (GlobalLoader) sẽ chạy ở lớp trên cùng do App.vue quản lý
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    // Tắt Skeleton -> Hiện nội dung thật
    isPageLoading.value = false
  }
})

// Đồng bộ dữ liệu khi Props thay đổi
watch(
  () => props.fullName,
  (newVal) => {
    editForm.value.name = newVal
  },
  { immediate: true },
)

const toggleProfileOptions = () => {
  isProfileOptionsOpen.value = !isProfileOptionsOpen.value
}

// Mở Modal và Reset dữ liệu
const openEditProfileModal = () => {
  isProfileOptionsOpen.value = false
  isEditProfileModalOpen.value = true
  editForm.value.name = props.fullName
  previewAvatar.value = props.avatarUrl || null
  selectedFile = null
}

const copyProfileLink = () => {
  console.log('Copied link to profile')
  isProfileOptionsOpen.value = false
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile = target.files[0]
    previewAvatar.value = URL.createObjectURL(selectedFile)
  }
}

// LƯU PROFILE LÊN SUPABASE
const handleSaveProfile = async () => {
  if (!editForm.value.name) return

  try {
    isLoading.value = true

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('No user found')

    let publicAvatarUrl = props.avatarUrl

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath)
      publicAvatarUrl = urlData.publicUrl
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: editForm.value.name,
        avatar_url: publicAvatarUrl,
      },
    })

    if (updateError) throw updateError

    isEditProfileModalOpen.value = false

    const newAvatarUrl = publicAvatarUrl
      ? `${publicAvatarUrl}?t=${new Date().getTime()}`
      : publicAvatarUrl

    emit('profile-updated', {
      fullName: editForm.value.name,
      avatarUrl: newAvatarUrl,
    })
  } catch (error: any) {
    console.error(error)
    alert('Lỗi cập nhật profile: ' + error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="h-full w-full relative">
    <div
      class="flex-1 bg-[#1E212E]/60 backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col overflow-hidden relative z-10 shadow-2xl h-full animate-fade-in"
      @click="isProfileOptionsOpen = false"
    >
      <Teleport to="body">
        <div
          v-if="isEditProfileModalOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans text-white"
        >
          <div
            class="absolute inset-0 bg-black/80 backdrop-blur-md"
            @click="isEditProfileModalOpen = false"
          ></div>

          <div
            class="relative w-full max-w-[500px] bg-[#1E212E]/60 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up border border-white/10"
          >
            <div class="flex items-center justify-between px-6 py-4">
              <h3 class="text-xl font-bold">Profile details</h3>
              <button
                @click="isEditProfileModalOpen = false"
                class="text-gray-400 hover:text-white transition bg-transparent p-1 rounded-full hover:bg-white/10"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <div class="px-6 py-4 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div
                class="group relative cursor-pointer shadow-xl rounded-full flex-shrink-0"
                @click="triggerFileInput"
              >
                <div
                  class="w-[160px] h-[160px] bg-[#3E3E3E] rounded-full flex items-center justify-center overflow-hidden shadow-lg border-2 border-transparent group-hover:border-white/20 transition"
                >
                  <img
                    v-if="previewAvatar"
                    :src="previewAvatar"
                    class="w-full h-full object-cover"
                    alt="Avatar"
                  />
                  <User v-else class="w-20 h-20 text-gray-400" />
                </div>

                <div
                  class="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <Camera class="w-10 h-10 text-white mb-2" />
                  <span class="text-xs font-bold text-white uppercase tracking-wider"
                    >Choose Photo</span
                  >
                </div>

                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  accept="image/*"
                  @change="handleFileChange"
                />
              </div>

              <div class="flex-1 w-full space-y-1 pt-2">
                <p>Current name</p>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full bg-[#1E212E] text-white px-4 py-3 rounded-md text-sm font-medium border border-transparent focus:border-white/30 focus:outline-none transition placeholder-gray-400"
                  placeholder="Add a display name"
                />
              </div>
            </div>

            <div class="flex justify-end px-6 py-6 pt-2">
              <button
                @click="handleSaveProfile"
                :disabled="isLoading"
                class="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
                Save
              </button>
            </div>

            <p class="px-6 pb-6 text-[11px] text-gray-400 font-medium text-center leading-tight">
              By proceeding, you agree to give MelodyMely access to the image you choose to upload.
              Please make sure you have the right to upload the image.
            </p>
          </div>
        </div>
      </Teleport>

      <header
        class="h-20 flex items-center justify-between px-8 flex-shrink-0 z-20 sticky top-0 bg-[#1E212E]/80 backdrop-blur-md border-b border-white/5"
      >
        <div class="flex-1 max-w-xl">
          <div class="relative group">
            <div
              class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 transition duration-500 blur"
            ></div>
            <div
              class="relative flex items-center bg-[#151720] rounded-full border border-white/10 px-4 py-2.5 shadow-inner"
            >
              <Search class="w-5 h-5 text-gray-500 group-focus-within:text-pink-500 transition" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search tracks, artists..."
                class="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full ml-3"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="text-gray-500 hover:text-white"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 ml-6">
          <button
            class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition border border-white/5"
          >
            <Bell class="w-5 h-5" />
          </button>

          <div class="relative" @click.stop>
            <button @click="emit('toggleMenu')" class="flex items-center gap-3 pl-1">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[2px]"
              >
                <div
                  class="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="props.avatarUrl"
                    :src="props.avatarUrl"
                    class="w-full h-full object-cover"
                  />
                  <User v-else class="text-white" />
                </div>
              </div>
            </button>

            <div
              v-if="isMenuOpen"
              class="absolute right-0 top-full mt-4 w-64 bg-[#1E212E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 transform origin-top-right transition-all"
            >
              <div class="px-5 py-3 border-b border-white/5">
                <p class="text-xs text-gray-500 uppercase font-bold tracking-wider">Signed in as</p>
                <p class="text-white font-bold truncate">{{ fullName }}</p>
              </div>
              <div class="p-2">
                <button
                  @click="emit('navigate', 'profile')"
                  class="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                >
                  <User2 class="w-4 h-4 mr-3 text-pink-500" /> Profile
                </button>
                <button
                  class="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                >
                  <Settings class="w-4 h-4 mr-3 text-purple-500" /> Settings
                </button>
              </div>
              <div class="border-t border-white/5 p-2">
                <button
                  @click="emit('logout')"
                  class="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition"
                >
                  <LogOut class="w-4 h-4 mr-3" /> Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar p-8 pb-32">
        <div v-if="currentView === 'home'" class="animate-fade-in-up">
          <div
            v-if="isPageLoading"
            class="w-full h-[300px] bg-white/5 rounded-3xl mb-10 animate-pulse relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer"
            ></div>
          </div>
          <div
            v-else
            class="relative bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 mb-10 overflow-hidden group"
          >
            <div
              class="absolute right-0 top-0 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition duration-700"
            ></div>
            <div class="relative z-10">
              <h2 class="text-4xl font-black mb-2 text-white tracking-tight">Weekly Discover</h2>
              <p class="text-gray-300 mb-6 max-w-lg">
                Fresh new music updated every Monday. Specially curated for your taste.
              </p>
              <button
                class="px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition shadow-lg shadow-white/20 flex items-center gap-2"
              >
                <Play class="w-5 h-5 fill-black" /> Play Now
              </button>
            </div>
          </div>

          <section class="mb-10">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white">Your Mixes</h3>
              <div class="flex gap-2">
                <button
                  class="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
                >
                  <SkipBack class="w-4 h-4" />
                </button>
                <button
                  class="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
                >
                  <SkipForward class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <template v-if="isPageLoading">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="h-48 rounded-2xl bg-white/5 animate-pulse"
                ></div>
              </template>

              <template v-else>
                <div
                  v-for="(item, index) in recentMixes"
                  :key="index"
                  class="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#151720] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    :class="`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`"
                  >
                    <AudioWaveform
                      class="text-white/30 w-16 h-16 transform group-hover:scale-110 transition duration-500"
                    />
                    <div
                      class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      <button
                        class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl scale-0 group-hover:scale-100 transition-all duration-300 delay-75"
                      >
                        <Play class="w-5 h-5 fill-black text-black ml-1" />
                      </button>
                    </div>
                  </div>
                  <div class="p-4">
                    <h4 class="font-bold text-white truncate">{{ item.title }}</h4>
                    <p class="text-sm text-gray-400 mt-1">{{ item.artist }}</p>
                  </div>
                </div>
              </template>
            </div>
          </section>

          <section>
            <h3 class="text-xl font-bold mb-6 text-white">Recommended for You</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <template v-if="isPageLoading">
                <div v-for="n in 5" :key="n" class="p-3">
                  <div class="w-full aspect-square bg-white/5 rounded-xl mb-3 animate-pulse"></div>
                  <div class="h-4 w-3/4 bg-white/5 rounded animate-pulse mb-1"></div>
                  <div class="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
                </div>
              </template>

              <template v-else>
                <div
                  v-for="(track, index) in recommended"
                  :key="index"
                  class="group cursor-pointer p-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <div
                    :class="`w-full aspect-square ${track.cover} rounded-xl mb-3 shadow-lg relative overflow-hidden`"
                  >
                    <div
                      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-[2px]"
                    >
                      <Play class="w-10 h-10 text-white fill-white" />
                    </div>
                  </div>
                  <h4 class="font-bold text-sm text-white truncate">{{ track.title }}</h4>
                  <p class="text-xs text-gray-400 mt-1">{{ track.artist }}</p>
                </div>
              </template>
            </div>
          </section>
        </div>

        <div v-else-if="currentView === 'profile'" class="animate-fade-in-up">
          <template v-if="isPageLoading">
            <div
              class="h-64 bg-white/5 rounded-t-3xl relative -mt-8 -mx-8 mb-10 animate-pulse"
            ></div>
            <div class="mt-20 space-y-4">
              <div v-for="n in 3" :key="n" class="h-16 bg-white/5 rounded-xl"></div>
            </div>
          </template>

          <template v-else>
            <div
              class="h-64 bg-gradient-to-b from-gray-700 to-[#1E212E] rounded-t-3xl relative -mt-8 -mx-8 mb-10"
            >
              <div class="absolute -bottom-16 left-10 flex items-end gap-6">
                <div
                  class="w-40 h-40 rounded-full p-1 bg-[#1E212E] cursor-pointer group"
                  @click="openEditProfileModal"
                >
                  <div
                    class="w-full h-full rounded-full bg-pink-500 flex items-center justify-center shadow-2xl relative overflow-hidden"
                  >
                    <img
                      v-if="props.avatarUrl"
                      :src="props.avatarUrl"
                      class="w-full h-full object-cover"
                    />
                    <User v-else class="w-20 h-20 text-white" />

                    <div
                      class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <Edit class="w-8 h-8 text-white" />
                      <span class="text-white font-bold ml-2">Change</span>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="flex items-center gap-4">
                    <h1
                      class="text-4xl font-black text-white hover:opacity-80 transition cursor-pointer"
                      @click="openEditProfileModal"
                    >
                      {{ fullName }}
                    </h1>

                    <div class="relative">
                      <button
                        @click.stop="toggleProfileOptions"
                        class="p-2 hover:bg-white/10 rounded-full transition text-gray-300 hover:text-white"
                      >
                        <MoreHorizontal class="w-6 h-6" />
                      </button>

                      <div
                        v-if="isProfileOptionsOpen"
                        class="absolute top-full left-0 mt-2 w-48 bg-[#282828] border border-gray-700 rounded-lg shadow-xl z-50"
                      >
                        <button
                          @click="openEditProfileModal"
                          class="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition first:rounded-t-lg"
                        >
                          <Edit class="w-4 h-4 mr-3" /> Edit Profile
                        </button>
                        <button
                          @click="copyProfileLink"
                          class="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition last:rounded-b-lg"
                        >
                          <LinkIcon class="w-4 h-4 mr-3" /> Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-300 mt-1">Music Enthusiast • 12 Followers</p>
                </div>
              </div>
            </div>

            <div class="mt-20"></div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div class="text-xl font-bold mb-4 flex items-center gap-2">
                  <ListMusic class="w-5 h-5 text-pink-500" />
                  <span class="text-white">Public Playlists</span>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="(pl, idx) in publicPlaylists"
                    :key="idx"
                    class="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                  >
                    <div
                      :class="`w-12 h-12 ${pl.cover} rounded-lg flex items-center justify-center shadow-md`"
                    >
                      <ListMusic class="w-6 h-6 text-white/50" />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-white text-sm">{{ pl.title }}</h4>
                      <p class="text-xs text-gray-400">By {{ pl.author }}</p>
                    </div>
                    <button
                      class="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition"
                    >
                      <Play class="w-4 h-4 fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Keyframes cho hiệu ứng xuất hiện */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Hiệu ứng ánh sáng chạy qua Skeleton (Shimmer) */
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}
.animate-shimmer {
  animation: shimmer 2s infinite linear;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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
</style>
