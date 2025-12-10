<template>
  <TheHeader />

  <main class="content-wrapper">
    <RouterView />
  </main>

  <TheFooter />
</template>

<script setup>
// Import các Component Bố cục
import TheHeader from './layout/TheHeader.vue'
import TheFooter from './layout/TheFooter.vue'
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
</style>
