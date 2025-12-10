<template>
  <header class="w-full py-4 bg-purple-800 backdrop-blur-lg text-white">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <RouterLink to="/" class="text-3xl font-bold tracking-wide text-pink-300"
        >MelodyMely</RouterLink
      >
      <nav class="flex gap-6 items-center justify-center">
        <RouterLink to="/signup" class="hover:text-pink-300 transition">Sign Up</RouterLink>
        <RouterLink to="/login" class="hover:text-pink-300 transition bg-black rounded-xl px-6 py-2"
          >Log in</RouterLink
        >
      </nav>
    </div>
  </header>
</template>
