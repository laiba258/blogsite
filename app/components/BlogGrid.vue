<script setup>
import { ref, onMounted } from 'vue'

const hasScrolled = ref(false)
const targetSection = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      hasScrolled.value = true
    }
  }, { threshold: 0.1 }) // Jab 10% section nazar aaye tab chalay

  if (targetSection.value) {
    observer.observe(targetSection.value)
  }
})

const posts = [
  { id: 1, title: 'The Future of Nuxt and Web Development', description: 'Exploring how Nuxt 4 is changing the game...', date: 'March 10, 2026', readTime: '5 min', category: 'Tech', image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Aesthetic Minimalism in UI Design', description: 'Why less is more when it comes to creating high-end experiences...', date: 'March 08, 2026', readTime: '3 min', category: 'Design', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Mastering Tailwind CSS Transitions', description: 'Small details that make a big difference...', date: 'March 05, 2026', readTime: '4 min', category: 'Tutorial', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop' }
]
</script>

<template>
  <!-- ref="targetSection" add kiya hai scroll pakadne ke liye -->
  <div id="stories" ref="targetSection" class="py-12 scroll-mt-24">
    
    <!-- Header -->
    <div 
      class="flex items-end justify-between mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6 transition-all duration-700"
      :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div>
        <h2 class="text-3xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">Latest Stories</h2>
        <p class="text-gray-500 text-sm mt-1 font-medium italic">Exploring the intersection of design and tech.</p>
      </div>
      
      <UButton 
        variant="ghost" color="gray" label="View All" 
        icon="i-heroicons-arrow-long-right" trailing to="/archive"
        class="hover:text-primary-500 transition-colors uppercase font-black text-[10px] tracking-widest"
      />
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink 
        v-for="(post, index) in posts" 
        :key="post.id"
        :to="`/blog/${post.id}`"
        class="block group transition-all duration-1000 ease-out"
        :class="hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        :style="{ transitionDelay: hasScrolled ? `${index * 150}ms` : '0ms' }"
      >
        <div class="transition-all duration-300 transform group-hover:-translate-y-2">
          <!-- Image -->
          <div class="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 bg-gray-100 dark:bg-zinc-800">
            <img :src="post.image" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
            <UBadge v-if="post.category" class="absolute top-4 left-4 rounded-full font-black text-[9px] uppercase tracking-widest px-3 shadow-sm" color="white" variant="solid">
              {{ post.category }}
            </UBadge>
          </div>

          <!-- Text -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em]">
              <span>{{ post.date }}</span>
              <span class="w-1.5 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full"></span>
              <span>{{ post.readTime }} Read</span>
            </div>
            <h3 class="text-xl font-black leading-snug text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors uppercase italic tracking-tight">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 font-medium">
              {{ post.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>