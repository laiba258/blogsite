<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const colorMode = useColorMode()

// Dark Mode Toggle Logic
const isDark = computed({
  get () { return colorMode.value === 'dark' },
  set () { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

const links = [
  { label: 'Trends', to: '/trends' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900">
    <UContainer class="flex items-center justify-between h-16">
      
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-black tracking-tighter uppercase italic">
        Vantage<span class="text-primary-500">.</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink 
          v-for="link in links" :key="link.to" :to="link.to"
          class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          active-class="text-primary-500"
        >
          {{ link.label }}
        </NuxtLink>

        <!-- Theme Toggle -->
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

      <!-- SIDEBAR (Solid Background) -->
      <div v-if="isOpen" class="fixed inset-0 z-[60] md:hidden">
        <!-- Overlay (Dim background only, no blur) -->
        <div class="absolute inset-0 bg-black/40 transition-opacity" @click="isOpen = false"></div>
        
        <!-- Solid Sidebar Box -->
        <div class="absolute right-0 top-0 h-full w-[260px] bg-white dark:bg-zinc-950 p-8 shadow-2xl flex flex-col">
          
          <!-- Close Button -->
          <div class="flex justify-end mb-12">
            <UButton 
              color="gray" 
              variant="ghost" 
              icon="i-heroicons-x-mark" 
              class="rounded-full"
              @click="isOpen = false" 
            />
          </div>

          <!-- Links -->
          <div class="flex flex-col gap-10">
            <NuxtLink 
              v-for="link in links" :key="link.to" :to="link.to"
              @click="isOpen = false"
              class="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400"
              active-class="text-primary-500"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <div class="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-900">
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Vantage © 2026</p>
          </div>
        </div>
      </div>

    </UContainer>
  </nav>
</template>

<style scoped>
.fixed {
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>