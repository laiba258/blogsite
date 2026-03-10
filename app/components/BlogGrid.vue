<template>
  <div class="py-12">
    <!-- Section Header (Animated) -->
    <div class="flex items-end justify-between mb-10 border-b border-gray-100 dark:border-zinc-800 pb-6 animate-vantage opacity-0">
      <div>
        <h2 class="text-3xl font-black tracking-tighter uppercase italic">Latest Stories</h2>
        <p class="text-gray-500 text-sm mt-1 font-medium">Exploring the intersection of design and tech.</p>
      </div>
      <UButton 
        variant="ghost" 
        color="gray" 
        label="View All" 
        icon="i-heroicons-arrow-long-right" 
        trailing
        class="hover:text-primary-500 transition-colors"
      />
    </div>

    <!-- The Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Blog Card Loop -->
      <UCard 
        v-for="(post, index) in posts" 
        :key="post.id"
        class="group border-none bg-transparent overflow-hidden animate-vantage opacity-0"
        :style="{ animationDelay: `${(index + 2) * 0.15}s` }"
        :ui="{ 
          base: 'transition-all duration-500 transform hover:-translate-y-3',
          body: { padding: 'px-0 py-4' },
          ring: '', 
          shadow: '' 
        }"
      >
        <!-- Image Container -->
        <div class="relative aspect-16/10 overflow-hidden rounded-2xl mb-5 bg-gray-100 dark:bg-zinc-800 shadow-sm">
          <img 
            :src="post.image" 
            class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
            alt="Blog Image"
          />
          <UBadge 
            v-if="post.category"
            class="absolute top-4 left-4 rounded-full font-bold text-[9px] uppercase tracking-tighter px-3 shadow-sm"
            color="white"
            variant="solid"
          >
            {{ post.category }}
          </UBadge>
        </div>

        <!-- Content -->
        <div class="space-y-3 px-1">
          <div class="flex items-center gap-3 text-[10px] font-bold text-primary-500 uppercase tracking-[0.2em]">
            <span>{{ post.date }}</span>
            <span class="w-1 h-1 bg-gray-300 dark:bg-zinc-700 rounded-full"></span>
            <span>{{ post.readTime }} Read</span>
          </div>
          
          <h3 class="text-xl font-bold leading-snug group-hover:text-primary-500 transition-colors duration-300 decoration-primary-500/30 decoration-2 underline-offset-4 group-hover:underline">
            {{ post.title }}
          </h3>
          
          <p class="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {{ post.description }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'The Future of Nuxt and Web Development',
    description: 'Exploring how Nuxt 4 is changing the game for developers worldwide with its new features.',
    date: 'March 10, 2026',
    readTime: '5 min',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Aesthetic Minimalism in UI Design',
    description: 'Why less is more when it comes to creating high-end digital experiences for users.',
    date: 'March 08, 2026',
    readTime: '3 min',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Mastering Tailwind CSS Transitions',
    description: 'Small details that make a big difference in how your website feels to the touch.',
    date: 'March 05, 2026',
    readTime: '4 min',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop'
  }
]
</script>

<style scoped>
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-vantage {
  animation: slideUpFade 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.opacity-0 {
  opacity: 0;
}
</style>