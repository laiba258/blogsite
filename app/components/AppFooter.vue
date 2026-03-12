<script setup>
const navigation = [
  { label: 'Articles', to: '#stories' },
  { label: 'Categories', to: '/archive' },
  { label: 'About Us', to: '/about' }
]

const legal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' }
]

const socials = [
  { icon: 'i-simple-icons-x', link: 'https://x.com/yourhandle' },
  { icon: 'i-simple-icons-instagram', link: 'https://instagram.com/yourhandle' },
  { icon: 'i-simple-icons-github', link: 'https://github.com/yourhandle' }
]
</script>

<template>
  <footer class="py-12 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-black transition-colors">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand Section -->
        <div class="md:col-span-2 space-y-6">
          <NuxtLink to="/" class="text-2xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">
            Vantage<span class="text-primary-500">.</span>
          </NuxtLink>
          <p class="text-gray-500 dark:text-zinc-400 max-w-sm text-sm leading-relaxed font-medium italic">
            A premium space dedicated to digital storytelling, minimal design, and the future of web technology. Built with Nuxt UI.
          </p>
          <div class="flex gap-2">
            <UButton 
              v-for="social in socials" 
              :key="social.icon"
              :icon="social.icon" 
              :to="social.link"
              target="_blank"
              color="gray" 
              variant="ghost" 
              class="rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 transition-all" 
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navigation</h4>
          <ul class="space-y-3">
            <li v-for="item in navigation" :key="item.label">
              <UButton 
                :to="item.to" 
                :label="item.label" 
                variant="link" 
                color="gray" 
                class="px-0 py-0 hover:text-primary-500 font-bold uppercase text-xs tracking-tight transition-colors" 
              />
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-6">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Legal</h4>
          <ul class="space-y-3">
            <li v-for="item in legal" :key="item.label">
              <UButton 
                :to="item.to" 
                :label="item.label" 
                variant="link" 
                color="gray" 
                class="px-0 py-0 hover:text-primary-500 font-bold uppercase text-xs tracking-tight transition-colors" 
              />
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 dark:border-zinc-900 text-[10px] font-black tracking-widest text-gray-400 uppercase">
        <p>© 2026 Vantage Studio. All rights reserved.</p>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <p>Handcrafted in Nuxt 3 & Nuxt UI</p>
        </div>
      </div>
    </UContainer>
  </footer>
</template>