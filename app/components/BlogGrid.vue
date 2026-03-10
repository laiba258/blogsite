<script setup>
import { ref, onMounted } from 'vue'

/**
 * Fetch latest stories from the API.
 * The data is reactive and will update the UI once the promise resolves.
 */
const { data: posts, pending } = await useFetch('/api/posts')

const hasScrolled = ref(false)
const targetSection = ref(null)

/**
 * Initialize Intersection Observer to trigger entrance animations
 * when the component enters the viewport.
 */
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      hasScrolled.value = true
    }
  }, { threshold: 0.1 })

  if (targetSection.value) {
    observer.observe(targetSection.value)
  }
})
</script>

<template>
  <div id="stories" ref="targetSection" class="py-12 scroll-mt-24">
    
    <!-- Section Header: Includes Title and Navigation Link -->
    <div 
      class="flex items-end justify-between mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6 transition-all duration-1000"
      :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div>
        <h2 class="text-3xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">
          Latest Stories
        </h2>
        <p class="text-gray-500 text-sm mt-1 font-medium italic text-balance">
          Exploring the intersection of design and tech.
        </p>
      </div>
      
      <UButton 
        variant="ghost" 
        color="gray" 
        label="View All" 
        icon="i-heroicons-arrow-long-right" 
        trailing 
        to="/archive"
        class="hover:text-primary-500 transition-colors uppercase font-black text-[10px] tracking-widest px-0"
      />
    </div>

    <!-- Loading State: Displayed during API fetch -->
    <div v-if="pending" class="text-center py-24 italic animate-pulse text-gray-400 font-medium tracking-widest text-xs uppercase">
      Synchronizing Database...
    </div>

    <!-- Grid Layout: Dynamic rendering of story cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <NuxtLink 
        v-for="(post, index) in posts" 
        :key="post.id"
        :to="`/stories/${post.id}`"
        class="block group transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        :style="{ transitionDelay: hasScrolled ? `${index * 100}ms` : '0ms' }"
      >
        <div class="space-y-5">
          <!-- Image Container: Aspect Ratio 16:10 -->
          <div class="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-zinc-900 border border-gray-50 dark:border-zinc-800/50 shadow-sm group-hover:shadow-xl transition-all duration-500">
            <img 
              :src="post.image" 
              class="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105" 
              loading="lazy"
            />
            
            <!-- Category Badge: Positioned absolute with glass effect -->
            <div v-if="post.category" class="absolute top-4 left-4">
              <span class="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-900 dark:text-white font-black text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                {{ post.category }}
              </span>
            </div>
          </div>

          <!-- Metadata and Typography -->
          <div class="space-y-3 px-1">
            <div class="flex items-center gap-3 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">
              <span>{{ post.readTime || '5 MIN' }} READ</span>
              <span class="w-1.5 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full"></span>
              <span class="text-zinc-400 italic font-bold">EP. 0{{ index + 1 }}</span>
            </div>
            
            <h3 class="text-2xl font-black leading-none text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300 uppercase italic tracking-tighter">
              {{ post.title }}
            </h3>
            
            <p class="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium italic">
              {{ post.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Standard selection highlight */
::selection {
  background: rgb(var(--color-primary-500) / 0.1);
  color: rgb(var(--color-primary-500));
}
</style>