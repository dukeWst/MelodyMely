<script setup lang="ts">
import { AudioWaveform, Flame, Guitar, Headphones, Music2 } from 'lucide-vue-next'
import HomeElementList from './HomeElementList.vue'
</script>

<template>
  <header class="w-full py-4 bg-purple-800 backdrop-blur-lg text-white">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <RouterLink to="/" class="flex items-center font-bold tracking-wide m-4">
        <AudioWaveform class="w-10 h-10 mr-2 text-pink-500" />
        <p class="text-pink-500 text-2xl">MelodyMely</p>
      </RouterLink>
      <nav class="flex gap-6 items-center justify-center">
        <RouterLink to="/signup" class="hover:text-pink-300 transition">Sign Up</RouterLink>
        <RouterLink to="/login" class="hover:text-pink-300 transition bg-black rounded-xl px-6 py-2"
          >Log in</RouterLink
        >
      </nav>
    </div>
  </header>
  <div class="min-h-screen bg-gradient-to-b from-purple-800 to-black text-white">
    <section class="container mx-auto px-6 pt-20 pb-24 text-center">
      <h2 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Discover the world of music <br />
        with <span class="text-pink-400">MelodyMely</span>
      </h2>

      <p class="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
        Where you find your favorite playlists, new artists, and inspirational melodies every day.
      </p>

      <RouterLink to="/signup">
        <button
          class="px-8 py-3 bg-pink-500 rounded-full text-lg font-semibold hover:bg-pink-600 transition shadow-lg"
        >
          Start Listening
        </button>
      </RouterLink>
    </section>

    <section class="container mx-auto px-6 pb-20">
      <h3 class="text-3xl font-bold mb-8 text-center">Popular Genres</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <HomeElementList status="Pop" content="The trending melodies.">
          <template #icon><Headphones /></template>
        </HomeElementList>

        <HomeElementList status="EDM" content="Powerful, vibrant sound.">
          <template #icon><Flame /></template>
        </HomeElementList>

        <HomeElementList status="Rock" content="Personality, strength, and full of energy.">
          <template #icon><Guitar /></template>
        </HomeElementList>

        <HomeElementList status="Lofi" content="Relaxing music for focus.">
          <template #icon><Music2 /></template>
        </HomeElementList>
      </div>
    </section>
  </div>
</template>
