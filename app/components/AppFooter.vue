<template>
  <footer class="py-12 border-t border-gray-100 dark:border-zinc-800">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand Section -->
        <div class="md:col-span-2 space-y-6">
          <h2 class="text-2xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">
            Vantage<span class="text-primary-500">.</span>
          </h2>
          <p class="text-gray-500 dark:text-zinc-400 max-w-sm text-sm leading-relaxed font-medium">
            A premium space dedicated to digital storytelling, minimal design, and the future of web technology. Built with Nuxt UI.
          </p>
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-x" color="gray" variant="ghost" class="rounded-full" />
            <UButton icon="i-simple-icons-instagram" color="gray" variant="ghost" class="rounded-full" />
            <UButton icon="i-simple-icons-github" color="gray" variant="ghost" class="rounded-full" />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navigation</h4>
          <ul class="space-y-2">
            <li><UButton label="Articles" variant="link" color="gray" class="px-0 py-0 hover:text-primary-500 font-bold" /></li>
            <li><UButton label="Categories" variant="link" color="gray" class="px-0 py-0 hover:text-primary-500 font-bold" /></li>
            <li><UButton label="About Us" variant="link" color="gray" class="px-0 py-0 hover:text-primary-500 font-bold" /></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-4">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Legal</h4>
          <ul class="space-y-2">
            <li><UButton label="Privacy Policy" variant="link" color="gray" class="px-0 py-0 hover:text-primary-500 font-bold" /></li>
            <li><UButton label="Terms of Service" variant="link" color="gray" class="px-0 py-0 hover:text-primary-500 font-bold" /></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 dark:border-zinc-900 text-[10px] font-black tracking-widest text-gray-400 uppercase">
        <p>© 2026 Vantage Studio. All rights reserved.</p>
        <p class="mt-4 md:mt-0">Handcrafted in Nuxt 3 & Nuxt UI</p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
// Yahan hum social links wagera add kar sakty hain baad mein
</script>

<style scoped>
/* Footer hamesha simple rehta hai, koi heavy scroll animation ki zaroorat nahi */
</style>