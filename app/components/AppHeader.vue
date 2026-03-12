<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const colorMode = useColorMode()

const { loggedIn, user, clear } = useUserSession()

const isDark = computed({
  get () { return colorMode.value === 'dark' },
  set () { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

const links = [
  { label: 'Trends', to: '/trends' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

const logout = async () => {
  await clear()
  useRouter().push('/')
}
</script>

<template>

<nav class="sticky top-0 z-50 backdrop-blur dark:bg-zinc-900/80 dark:border-zinc-800 transition-colors duration-300">

  <!-- HEADER -->
  <UContainer class="flex items-center justify-between h-16">
    
    <!-- Logo -->
    <NuxtLink to="/" class="text-xl font-black tracking-tighter uppercase italic">
      Vantage<span class="text-primary-500">.</span>
    </NuxtLink>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-8">
      <NuxtLink 
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        active-class="text-primary-500"
      >
        {{ link.label }}
      </NuxtLink>

      <NuxtLink 
        v-if="loggedIn && user?.role === 'admin'" 
        to="/admin/dashboard"
        class="text-[11px] font-black uppercase tracking-widest px-3 py-1 bg-primary-500 text-white italic rounded shadow-lg hover:bg-primary-600 transition-all"
      >
        Dashboard
      </NuxtLink>

      <NuxtLink 
        v-if="!loggedIn" 
        to="/login"
        class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white">
        Login
      </NuxtLink>

      <button 
        v-else 
        @click="logout"
        class="text-[11px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700"
      >
        Logout
      </button>

      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="ghost"
        @click="isDark = !isDark"
      />
    </div>

    <!-- Mobile Controls -->
    <div class="md:hidden flex items-center gap-2">
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="ghost"
        @click="isDark = !isDark"
      />

      <UButton 
        icon="i-heroicons-bars-3-bottom-right" 
        color="gray" 
        variant="ghost" 
        @click="isOpen = true" 
      />
    </div>

  </UContainer>

</nav>


<!-- MOBILE SLIDE MENU -->
<div v-if="isOpen" class="fixed inset-0 z-[9999] md:hidden">

  <!-- FULL WHITE BACKGROUND -->
  <div 
    class="absolute inset-0 bg-white dark:bg-zinc-950 z-[9998]"
    @click="isOpen = false"
  ></div>

  <!-- SIDEBAR -->
  <div class="absolute right-0 top-0 h-full w-[260px] bg-white dark:bg-zinc-950 p-8 shadow-2xl flex flex-col z-[9999]">

    <div class="flex justify-end mb-12">
      <UButton 
        color="gray" 
        variant="ghost" 
        icon="i-heroicons-x-mark" 
        class="rounded-full" 
        @click="isOpen = false"
      />
    </div>

    <div class="flex flex-col gap-8">
      <NuxtLink 
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        @click="isOpen = false"
        class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400"
        active-class="text-primary-500"
      >
        {{ link.label }}
      </NuxtLink>

      <NuxtLink 
        v-if="loggedIn && user?.role === 'admin'"
        to="/admin/dashboard"
        @click="isOpen = false"
        class="text-xs font-bold uppercase tracking-[0.2em] text-primary-500 italic"
      >
        Dashboard
      </NuxtLink>

      <NuxtLink 
        v-if="!loggedIn"
        to="/login"
        @click="isOpen = false"
        class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500"
      >
        Login
      </NuxtLink>

      <button
        v-else
        @click="logout"
        class="text-left text-xs font-bold uppercase tracking-[0.2em] text-red-500"
      >
        Logout
      </button>
    </div>

    <div class="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-900">
      <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">
        Vantage © 2026
      </p>
    </div>

  </div>

</div>

</template>