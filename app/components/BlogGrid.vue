<script setup>
import { ref, onMounted } from 'vue'

// 1. Database se sirf "Latest" posts mangwao (Limited to 3 or 6)
const { data: posts, pending } = await useFetch('/api/posts')

const hasScrolled = ref(false)
const targetSection = ref(null)

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
    
    <div 
      class="flex items-end justify-between mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6 transition-all duration-700"
      :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div>
        <h2 class="text-3xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">Latest Stories</h2>
        <p class="text-gray-500 text-sm mt-1 font-medium italic text-balance">Exploring the intersection of design and tech.</p>
      </div>
      
      <UButton 
        variant="ghost" color="gray" label="View All" 
        icon="i-heroicons-arrow-long-right" trailing to="/archive"
        class="hover:text-primary-500 transition-colors uppercase font-black text-[10px] tracking-widest"
      />
    </div>

    <div v-if="pending" class="text-center py-20 italic animate-pulse text-gray-400">
      Fetching latest stories...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink 
        v-for="(post, index) in posts" 
        :key="post.id"
        :to="`/blog/${post.id}`"
        class="block group transition-all duration-1000 ease-out"
        :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        :style="{ transitionDelay: hasScrolled ? `${index * 150}ms` : '0ms' }"
      >
        <div class="transition-all duration-300 transform group-hover:-translate-y-2">
          <div class="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 bg-gray-100 dark:bg-zinc-800 border border-gray-50 dark:border-zinc-900">
            <img :src="post.image" class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105" />
            <UBadge v-if="post.category" class="absolute top-4 left-4 rounded-full font-black text-[9px] uppercase tracking-widest px-3 shadow-md" color="white" variant="solid">
              {{ post.category }}
            </UBadge>
          </div>

          <div class="space-y-3 px-1">
            <div class="flex items-center gap-3 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">
              <span>{{ post.date }}</span>
              <span class="w-1.5 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full"></span>
              <span>{{ post.readTime }} Read</span>
            </div>
            <h3 class="text-xl font-black leading-snug text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300 uppercase italic tracking-tight">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
              {{ post.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>