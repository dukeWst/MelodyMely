<template>
  <TheHeader v-if="!route.meta.hideLayout" />

  <main class="content-wrapper">
    <RouterView />
  </main>

  <TheFooter v-if="!route.meta.hideLayout" />
</template>

<script setup>
import TheHeader from './layout/TheHeader.vue'
import TheFooter from './layout/TheFooter.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
</style>
