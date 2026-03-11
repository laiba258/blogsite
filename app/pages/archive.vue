<script setup>
// 1. Database se posts mangwao
const { data: allPosts } = await useFetch('/api/posts')

// 2. Filter ke liye reactive variables
const selectedCategory = ref('All')
const categories = ['All', 'Tech', 'Design', 'Tutorial', 'Opinion']

// 3. Filter logic: Agar 'All' select hai toh sab dikhao, warna sirf specific category
const filteredPosts = computed(() => {
  if (!allPosts.value) return []
  if (selectedCategory.value === 'All') return allPosts.value
  
  return allPosts.value.filter(post => 
    post.category.toLowerCase() === selectedCategory.value.toLowerCase()
  )
})
</script>

<template>
  <UContainer class="py-20 max-w-4xl">
    <!-- Header Section -->
    <header class="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
        The <span class="text-primary-500 not-italic">Archive</span>
      </h1>
      <p class="text-gray-500 text-lg md:text-xl font-medium italic max-w-2xl">
        A chronological collection of thoughts, tutorials, and digital experiments.
      </p>
    </header>

    <!-- Category Filter: Active state add kar di hai -->
    <div class="flex flex-wrap gap-4 mb-16 border-b border-gray-100 dark:border-zinc-900 pb-8 overflow-x-auto">
      <button 
        v-for="cat in categories"
:key="cat"
        class="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all"
        :class="selectedCategory === cat 
          ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' 
          : 'border-gray-200 dark:border-zinc-800 hover:border-primary-500 text-gray-500'"
        @click="selectedCategory = cat">
        {{ cat }}
      </button>
    </div>

    <!-- Archive List: Ab filteredPosts use honge -->
    <div class="space-y-2 min-h-[300px]">
      <div v-if="filteredPosts.length > 0">
        <NuxtLink 
          v-for="(post, index) in filteredPosts" 
          :key="post.id"
          :to="`/blog/${post.id}`"
          class="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-gray-50 dark:border-zinc-900 transition-all hover:px-4">
          <div class="flex items-center gap-6">
            <span class="text-gray-300 dark:text-zinc-800 font-black text-2xl italic">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>
            
            <div>
              <div class="flex items-center gap-3 mb-1">
                <span class="text-[9px] font-black text-primary-500 uppercase tracking-widest">{{ post.category }}</span>
                <span class="text-[9px] text-gray-400 font-medium uppercase tracking-widest">{{ post.readTime }}</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-black uppercase italic tracking-tight group-hover:text-primary-500 transition-colors">
                {{ post.title }}
              </h2>
            </div>
          </div>

          <div class="flex items-center gap-4 mt-4 md:mt-0">
            <span class="text-sm font-medium text-gray-400 italic">{{ post.date }}</span>
            <UIcon 
              name="i-heroicons-arrow-up-right" 
              class="w-6 h-6 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
          </div>
        </NuxtLink>
      </div>
      
      <!-- Empty State: Agar us category mein kuch na ho -->
      <div v-else class="py-20 text-center">
        <p class="text-gray-400 italic">No stories found in this category yet.</p>
      </div>
    </div>

    <div class="mt-20 text-center">
      <p class="text-gray-400 text-sm font-medium italic">You've reached the end of the list. More stories coming soon.</p>
    </div>
  </UContainer>
</template>

<style scoped>
.animate-in {
  animation: fadeSlideUp 0.8s ease-out forwards;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>