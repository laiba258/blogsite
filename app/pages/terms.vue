<script setup>
const terms = [
  { 
    title: 'Acceptance of Terms', 
    content: 'By accessing Vantage, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using this site.' 
  },
  { 
    title: 'Content License', 
    content: 'All stories and narratives published on Vantage are protected by intellectual property laws. You may read and share links, but reproduction of full articles without written consent is prohibited.'
  },
  { 
    title: 'User Conduct', 
    content: 'When using our platform, you agree not to engage in any activity that disrupts the server integrity (NuxtHub/Cloudflare) or attempt to bypass any security measures.' 
  }
]
</script>
<template>
  <UContainer class="py-24 max-w-4xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-16">
      <!-- Left Sidebar -->
      <aside class="md:col-span-4 h-fit md:sticky md:top-24">
        <h1 class="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
          Terms <span class="text-primary-500">Service</span>
        </h1>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Version 1.0 • March 2026</p>
      </aside>

      <!-- Right Content -->
      <div class="md:col-span-8 space-y-16">
        <section v-for="(section, index) in terms" :key="index" class="group">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-primary-500 font-black italic text-xl">0{{ index + 1 }}.</span>
            <h2 class="text-xl font-black uppercase">{{ section.title }}</h2>
          </div>
          <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400 italic leading-relaxed">
            <p>{{ section.content }}</p>
          </div>
        </section>

        <div class="pt-10">
          <UButton to="/" icon="i-heroicons-arrow-left" label="Back to Stories" variant="soft" color="primary" class="font-black uppercase italic tracking-widest px-6" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

