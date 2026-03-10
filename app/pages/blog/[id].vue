<script setup>
const route = useRoute()
const { data: post, pending } = await useFetch(`/api/posts/${route.params.id}`)

// Reading Progress Logic
const scrollPercent = ref(0)
if (process.client) {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollPercent.value = (winScroll / height) * 100
  })
}

// SEO Integration
useSeoMeta({
  title: () => post.value?.metaTitle || post.value?.title || 'Vantage Blog',
  ogTitle: () => post.value?.metaTitle || post.value?.title,
  description: () => post.value?.metaDescription || post.value?.description,
  ogDescription: () => post.value?.metaDescription || post.value?.description,
  ogImage: () => post.value?.image,
  twitterCard: 'summary_large_image'
})

if (!post.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Story not found' })
}
</script>

<template>
  <div class="relative min-h-screen bg-white dark:bg-zinc-950">
    <!-- 1. Reading Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-primary-500 z-50 transition-all duration-150" 
      :style="{ width: scrollPercent + '%' }"
    ></div>

    <UContainer class="py-16 md:py-24 max-w-3xl">
      <!-- Loading State -->
      <div v-if="pending" class="space-y-8 animate-pulse">
        <div class="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        <div class="h-16 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
        <div class="aspect-video w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
      </div>

      <article v-else class="article-fade-in">
        <!-- Back Button -->
        <UButton 
          to="/" 
          variant="ghost" 
          color="gray" 
          icon="i-heroicons-arrow-left" 
          class="mb-12 -ml-4 group hover:bg-transparent"
        >
          <span class="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-primary-500 transition-colors">
            Back to Stories
          </span>
        </UButton>

        <header class="space-y-8 mb-16 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] font-black text-primary-500 uppercase tracking-[0.3em]">
            <span class="px-3 py-1 bg-primary-500/10 rounded-full italic">{{ post.category }}</span>
            <span class="w-1.5 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full"></span>
            <span class="text-gray-400 italic font-medium">{{ post.readTime || '5 min' }} read</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] text-gray-900 dark:text-white">
            {{ post.title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium italic leading-tight border-l-4 border-primary-500 pl-6 py-2">
            {{ post.description }}
          </p>
        </header>

        <!-- Main Image with Overlay Effect -->
        <div class="relative group aspect-video overflow-hidden rounded-[2.5rem] mb-20 shadow-2xl ring-1 ring-gray-100 dark:ring-zinc-800">
          <img 
            :src="post.image" 
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
        </div>

        <!-- Story Content with Magazine Typography -->
        <div class="content-body prose prose-xl dark:prose-invert max-w-none 
                    prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-gray-700 dark:prose-p:text-zinc-300
                    prose-headings:text-zinc-900 dark:prose-headings:text-white">
          <div class="whitespace-pre-line font-medium drop-cap">
            {{ post.content }}
          </div>
        </div>
        
        <!-- Footer Info -->
        <footer class="mt-24 pt-12 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-4">
             <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-black italic">V</div>
             <div class="text-left">
               <p class="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white px-1">Editorial Team</p>
               <p class="text-[10px] text-zinc-400 uppercase tracking-widest font-bold px-1">Vantage Collective &copy; 2026</p>
             </div>
          </div>
          
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-twitter" variant="ghost" color="gray" />
            <UButton icon="i-simple-icons-instagram" variant="ghost" color="gray" />
          </div>
        </footer>
      </article>
    </UContainer>
  </div>
</template>

<style scoped>
/* Magazine Dropcap Effect */
.drop-cap::first-letter {
  float: left;
  font-size: 5.5rem;
  line-height: 0.7;
  padding-top: 4px;
  padding-right: 12px;
  padding-left: 3px;
  font-weight: 900;
  font-style: italic;
  color: rgb(var(--color-primary-500));
}

.article-fade-in {
  animation: elegantFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes elegantFade {
  from { opacity: 0; transform: translateY(40px) skewY(1deg); }
  to { opacity: 1; transform: translateY(0) skewY(0deg); }
}

/* Smooth selection color */
::selection {
  background: rgb(var(--color-primary-500) / 0.2);
  color: rgb(var(--color-primary-500));
}

/* Custom spacing for whitespace-pre-line */
.content-body {
  font-family: 'Inter', sans-serif; /* Ya jo bhi aapki default font hai */
}
</style>