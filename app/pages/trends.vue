<script setup>
// Fetch real posts from database
const { data: allPosts } = await useFetch('/api/posts')

// Display top 3 trending posts
const trendingPosts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.slice(0, 3)
})
</script>

<template>
  <UContainer class="py-20 max-w-6xl">
    <!-- Sophisticated Section Header -->
    <header class="mb-20 animate-vantage">
      <div class="flex items-center gap-2 mb-4">
        <span class="w-2 h-2 bg-primary-500 rounded-full"/>
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
        :style="{ animationDelay: `${index * 0.1}s` }">
        <!-- Rank & Meta (Left Column) -->
        <div class="md:col-span-2 space-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <span class="text-xs font-black font-serif italic text-gray-400 block mb-4">№ 0{{ index + 1 }}</span>
          <div class="text-[9px] font-black uppercase tracking-widest text-primary-500">{{ post.category }}</div>
          <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ post.readTime }} Read</div>
        </div>

        <!-- Image (Middle Column) -->
        <div class="md:col-span-5">
          <NuxtLink :to="`/stories/${post.id}`" class="block aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
            <img 
              :src="post.image" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </NuxtLink>
        </div>

        <!-- Content (Right Column) -->
        <div class="md:col-span-5 space-y-4 pt-2">
          <NuxtLink :to="`/stories/${post.id}`">
            <h2 class="text-2xl font-black tracking-tight uppercase italic leading-snug group-hover:text-primary-500 transition-colors">
              {{ post.title }}
            </h2>
          </NuxtLink>
          <p class="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
            {{ post.description }}
          </p>
          <div class="flex items-center gap-2 pt-2">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">By Editorial Team</span>
            <span class="w-1 h-[1px] bg-gray-300"/>
            <NuxtLink :to="`/stories/${post.id}`" class="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:underline">Read Story</NuxtLink>
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