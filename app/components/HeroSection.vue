<script setup>
</script>
<template>
  <section class="py-16 flex flex-col items-center relative overflow-hidden">
    
    <!-- 1. Trending Badge (Slide In First) -->
    <div class="mb-6 animate-vantage opacity-0">
      <UBadge
        color="primary"
        variant="soft"
        size="md"
        class="rounded-full px-3 py-1">
        <span class="relative flex h-2 w-2 mr-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"/>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"/>
        </span>
        <span class="font-bold tracking-widest text-[9px] uppercase">Trending Now</span>
      </UBadge>
    </div>

    <!-- 2. Main Heading (Slide In Second) -->
    <h1 class="text-4xl md:text-6xl font-black text-center max-w-3xl tracking-tighter leading-tight mb-6 text-gray-900 dark:text-white uppercase italic animate-vantage delay-1 opacity-0">
      CRAFTING <span class="text-primary-500 not-italic font-light">DIGITAL</span> STORIES WITH VANTAGE.
    </h1>

    <!-- 3. Paragraph (Slide In Third) -->
    <p class="text-gray-500 dark:text-gray-400 text-base md:text-lg text-center max-w-xl mb-8 font-medium animate-vantage delay-2 opacity-0">
      A minimal space for professional blogging. Clean code, elegant design, and smooth transitions.
    </p>

    <!-- 4. Buttons (Slide In Last) -->
    <div class="flex items-center gap-4 animate-vantage delay-3 opacity-0">
      <UButton
        label="Start Reading"
        to="#stories"
        size="md"
        color="primary"
        variant="solid"
        class="rounded-full px-6 py-2 font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-500/10"/>
      
      <UButton
        label="Explore Trends"
        to="/trends"
        variant="ghost"
        color="gray"
        size="md"
        icon="i-heroicons-arrow-up-right"
        class="rounded-full px-6 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"/>
    </div>

    <!-- Background Decoration -->
    <div class="absolute top-10 -z-10 w-64 h-64 bg-primary-100/50 blur-[80px] rounded-full pointer-events-none"/>
    
  </section>
</template>



<style scoped>
/* Custom Keyframes for Smooth Slide-Up */
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Base animation class */
.animate-vantage {
  animation: slideUpFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* Staggered Delays */
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

/* Prevents layout shift before animation starts */
.opacity-0 {
  opacity: 0;
}
</style>