<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const colorMode = useColorMode()

// Session check karne ke liye hook
const { loggedIn, user, clear } = useUserSession()

// Dark Mode Toggle Logic
const isDark = computed({
  get () { return colorMode.value === 'dark' },
  set () { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

// Base links jo sab ko dikhen gay
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
  <nav class="sticky top-0 z-50 backdrop-blur dark:bg-zinc-900/80  border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
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
          active-class="text-primary-500">
          {{ link.label }}
        </NuxtLink>

        <!-- Admin Dashboard Button (Sirf Admin ko dikhay ga) -->
        <NuxtLink 
          v-if="loggedIn && user?.role === 'admin'" 
          to="/admin/dashboard"
          class="text-[11px] font-black uppercase tracking-widest px-3 py-1 bg-primary-500 text-white italic rounded shadow-lg hover:bg-primary-600 transition-all">
          Dashboard
        </NuxtLink>

        <!-- Dynamic Login/Logout -->
        <NuxtLink 
          v-if="!loggedIn" 
          to="/login"
          class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white">
          Login
        </NuxtLink>
        <button 
          v-else 
          class="text-[11px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700"
          @click="logout">
          Logout
        </button>

        <!-- Theme Toggle -->
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          @click="isDark = !isDark" />
      </div>

      <!-- Mobile Controls -->
      <div class="md:hidden flex items-center gap-2">
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          @click="isDark = !isDark" />
        <UButton 
          icon="i-heroicons-bars-3-bottom-right" 
          color="gray" 
          variant="ghost" 
          @click="isOpen = true" />
      </div>

      <!-- Mobile Sidebar with USlideover -->
      <USlideover 
        v-model="isOpen" 
        side="right"
        :ui="{
          background: 'bg-white dark:bg-zinc-950',
          overlay: {
            background: 'bg-gray-200/75 dark:bg-gray-800/75'
          }
        }">
        <UCard 
          class="flex flex-col flex-1 h-full bg-white dark:bg-zinc-950"
          :ui="{ 
            body: { base: 'flex-1 flex flex-col', padding: 'p-6 sm:p-6' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-zinc-800',
            background: 'bg-white dark:bg-zinc-950'
          }">
          
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-black uppercase italic tracking-tighter">Menu</h3>
              <UButton 
                color="gray" 
                variant="ghost" 
                icon="i-heroicons-x-mark-20-solid" 
                class="-my-1"
                @click="isOpen = false" />
            </div>
          </template>

          <div class="flex flex-col gap-6 py-4">
            <NuxtLink 
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              active-class="text-primary-500"
              @click="isOpen = false">
              {{ link.label }}
            </NuxtLink>

            <!-- Mobile Admin Link -->
            <NuxtLink 
              v-if="loggedIn && user?.role === 'admin'" 
              to="/admin/dashboard"
              class="text-sm font-bold uppercase tracking-widest text-primary-500 italic hover:text-primary-600 transition-colors"
              @click="isOpen = false">
              Dashboard
            </NuxtLink>

            <div class="border-t border-gray-100 dark:border-zinc-800 pt-6 mt-2">
              <!-- Mobile Login/Logout -->
              <NuxtLink 
                v-if="!loggedIn" 
                to="/login" 
                class="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" 
                @click="isOpen = false">
                Login
              </NuxtLink>
              <button 
                v-else 
                class="text-left text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors" 
                @click="logout">
                Logout
              </button>
            </div>
          </div>

          <template #footer>
            <div class="text-center">
              <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Vantage © 2026</p>
            </div>
          </template>
        </UCard>
      </USlideover>

    </UContainer>
  </nav>
</template>
