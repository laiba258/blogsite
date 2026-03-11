<script setup>
const values = [
  {
    title: 'The Vision',
    desc: 'Vantage was born from the idea that digital platforms should be as carefully crafted as a physical gallery. We bridge the gap between complex technology and human-centric aesthetics.',
    icon: 'i-heroicons-eye'
  },
  {
    title: 'The Process',
    desc: 'Our editorial team meticulously selects stories that matter. We focus on the "why" behind the "what," ensuring every piece of content provides a fresh perspective.',
    icon: 'i-heroicons-command-line'
  },
  {
    title: 'The Impact',
    desc: 'Beyond aesthetics, we aim to build a community of forward-thinkers. Our goal is to inspire creators to build a more beautiful, functional, and minimal web.',
    icon: 'i-heroicons-globe-alt'
  }
]
</script>

<template>
  <div class="py-20">
    <!-- Hero Section -->
    <UContainer class="max-w-5xl mb-32">
      <header class="animate-vantage">
        <div class="flex items-center gap-2 mb-6">
          <span class="w-8 h-[1px] bg-primary-500"/>
          <span class="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Our Identity</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[1.1] text-gray-900 dark:text-white mb-10">
          We are the lens <br > through which the <br >
          <span class="text-primary-500">Modern World</span> is seen.
        </h1>
        <p class="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl border-l-2 border-gray-100 dark:border-zinc-800 pl-8">
          Vantage is an independent digital publication dedicated to minimalist design, emerging technologies, and the creative minds shaping our future.
        </p>
      </header>
    </UContainer>

    <!-- Detailed Content Grid -->
    <UContainer class="max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <!-- Professional Image -->
        <div class="rounded-3xl overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-zinc-900 animate-vantage">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105" 
            alt="Studio Space">
        </div>
        
        <!-- Values List -->
        <div class="space-y-12 animate-vantage delay-1">
          <div v-for="value in values" :key="value.title" class="group">
            <div class="flex items-start gap-6">
              <div class="mt-1">
                <UIcon :name="value.icon" class="w-6 h-6 text-primary-500" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-black uppercase italic tracking-tight text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {{ value.title }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {{ value.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats Section -->
      <footer class="pt-20 border-t border-gray-100 dark:border-zinc-800 text-center animate-vantage delay-2">
        <h2 class="text-sm font-black uppercase tracking-[0.6em] text-gray-400 mb-8">Established in 2026</h2>
        <div class="flex justify-center gap-12">
          <div class="text-center">
            <p class="text-3xl font-black tracking-tighter">10K+</p>
            <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Monthly Readers</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-black tracking-tighter">500+</p>
            <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Curated Stories</p>
          </div>
        </div>
      </footer>
    </UContainer>
  </div>
</template>

<style scoped>
.animate-vantage {
  animation: slideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1, h3 {
  letter-spacing: -0.03em;
}
</style>