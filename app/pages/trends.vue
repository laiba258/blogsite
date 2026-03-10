<script setup>
const trendingPosts = [
  { 
    id: 1, 
    title: 'The Evolution of Minimalist Architecture', 
    category: 'Architecture', 
    readTime: '6 min',
    excerpt: 'How modern structures are embracing the "Less is More" philosophy by prioritizing natural light and raw materials over ornamental clutter.',
    author: 'Laiba Naseer',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000' 
  },
  { 
    id: 2, 
    title: 'Quantum Computing: From Theory to Utility', 
    category: 'Technology', 
    readTime: '8 min',
    excerpt: 'A deep dive into how quantum processing is finally moving out of the lab and into real-world applications for encryption and logistics.',
    author: 'Vantage Tech',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000' 
  },
  { 
    id: 3, 
    title: 'The Rise of Regenerative Urbanism', 
    category: 'Environment', 
    readTime: '5 min',
    excerpt: 'Beyond sustainability, urban planners are now designing cities that actually contribute back to the local ecosystem through bio-filtration.',
    author: 'Editorial Team',
    image: 'https://images.unsplash.com/photo-1518005020480-1cd30491866e?q=80&w=1000' 
  }
]
</script>

<template>
  <UContainer class="py-20 max-w-6xl">
    <!-- Sophisticated Section Header -->
    <header class="mb-20 animate-vantage">
      <div class="flex items-center gap-2 mb-4">
        <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Journal Selection</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">
        Global <span class="text-primary-500">Trends</span> Report
      </h1>
    </header>

    <!-- Trends Feed -->
    <div class="space-y-20">
      <article 
        v-for="(post, index) in trendingPosts" 
        :key="post.id"
        class="group grid grid-cols-1 md:grid-cols-12 gap-10 items-start animate-vantage"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Rank & Meta (Left Column) -->
        <div class="md:col-span-2 space-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <span class="text-xs font-black font-serif italic text-gray-400 block mb-4">№ 0{{ index + 1 }}</span>
          <div class="text-[9px] font-black uppercase tracking-widest text-primary-500">{{ post.category }}</div>
          <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ post.readTime }} Read</div>
        </div>

        <!-- Image (Middle Column) -->
        <div class="md:col-span-5">
          <NuxtLink :to="`/blog/${post.id}`" class="block aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
            <img 
              :src="post.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </NuxtLink>
        </div>

        <!-- Content (Right Column) -->
        <div class="md:col-span-5 space-y-4 pt-2">
          <NuxtLink :to="`/blog/${post.id}`">
            <h2 class="text-2xl font-black tracking-tight uppercase italic leading-snug group-hover:text-primary-500 transition-colors">
              {{ post.title }}
            </h2>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
            {{ post.excerpt }}
          </p>
          <div class="flex items-center gap-2 pt-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">By {{ post.author }}</span>
            <span class="w-1 h-[1px] bg-gray-300"></span>
            <NuxtLink :to="`/blog/${post.id}`" class="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:underline">Read Story</NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </UContainer>
</template>

<style scoped>
.animate-vantage {
  animation: slideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typography fix for smooth reading */
h2 {
  letter-spacing: -0.02em;
}
</style>