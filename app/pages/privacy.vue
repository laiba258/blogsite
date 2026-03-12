<script setup>
const privacySections = [
  { 
    title: 'Data Philosophy', 
    content: 'At Vantage, we believe privacy is a fundamental human right. Our data collection is strictly limited to information that enhances your reading experience.' 
  },
  { 
    title: 'Information Collection', 
    content: 'We only process data when you explicitly interact with our services. This includes:',
    bullets: ['Email addresses for Newsletter subscriptions.', 'Authentication tokens for Admin access.', 'Basic analytics to improve content delivery.']
  },
  { 
    title: 'Third-Party Services', 
    content: 'Our infrastructure is built on NuxtHub and Cloudflare. While we do not sell data, these providers may process technical metadata to ensure global delivery and security.' 
  }
]
</script>
<template>
  <UContainer class="py-24 max-w-4xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-16">
      <!-- Left Sidebar: Sticky Header -->
      <aside class="md:col-span-4 h-fit md:sticky md:top-24">
        <h1 class="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
          Privacy <span class="text-primary-500">Legal</span>
        </h1>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Last Updated: March 2026</p>
      </aside>

      <!-- Right Content: The Articles -->
      <div class="md:col-span-8 space-y-16">
        <section v-for="(section, index) in privacySections" :key="index" class="group">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-primary-500 font-black italic text-xl">0{{ index + 1 }}.</span>
            <h2 class="text-xl font-black uppercase ">{{ section.title }}</h2>
          </div>
          <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400 italic leading-relaxed">
            <p>{{ section.content }}</p>
            <ul v-if="section.bullets" class="mt-4 space-y-2 list-none p-0">
              <li v-for="bullet in section.bullets" :key="bullet" class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-primary-500 rounded-full" /> {{ bullet }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </UContainer>
</template>

