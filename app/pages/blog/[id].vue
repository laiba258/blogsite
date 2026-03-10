<script setup>
const route = useRoute()
const { data: post, pending } = await useFetch(`/api/posts/${route.params.id}`)

// SEO Integration
useSeoMeta({
  title: () => post.value?.metaTitle || post.value?.title || 'Vantage Blog',
  ogTitle: () => post.value?.metaTitle || post.value?.title,
  description: () => post.value?.metaDescription || post.value?.description,
  ogDescription: () => post.value?.metaDescription || post.value?.description,
  ogImage: () => post.value?.image,
  twitterCard: 'summary_large_image',
  keywords: () => post.value?.keywords
})

if (!post.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Story not found' })
}
</script>

<template>
  <UContainer class="py-20 max-w-3xl">
    <div v-if="pending" class="text-center py-20">
      <p class="italic animate-pulse text-gray-400 font-medium">Loading Story...</p>
    </div>

    <article v-else class="animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <UButton 
        to="/archive" 
        variant="ghost" 
        color="gray" 
        icon="i-heroicons-arrow-left" 
        class="mb-10 -ml-4 hover:text-primary-500 uppercase font-black text-[10px] tracking-widest"
      >
        Back to Archive
      </UButton>

      <header class="space-y-6 mb-12">
        <div class="flex items-center gap-4 text-[11px] font-black text-primary-500 uppercase tracking-[0.3em]">
          <span>{{ post.category }}</span>
          <span class="w-1.5 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full"></span>
          <span class="text-gray-400 italic font-medium">{{ post.date }}</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] text-gray-900 dark:text-white">
          {{ post.title }}
        </h1>
        
        <p class="text-xl text-gray-500 dark:text-zinc-400 font-medium italic leading-relaxed">
          {{ post.description }}
        </p>
      </header>

      <div class="aspect-video overflow-hidden rounded-3xl mb-16 bg-gray-100 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-2xl">
        <img :src="post.image" class="w-full h-full object-cover" />
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-black prose-headings:uppercase prose-headings:italic 
                  prose-p:font-medium prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-zinc-400">
        {{ post.content }}
      </div>
      
      <div class="mt-20 border-t border-gray-100 dark:border-zinc-900 pt-10 text-center">
        <p class="text-gray-400 text-xs italic font-medium">Vantage Premium Content &copy; 2026</p>
      </div>
    </article>
  </UContainer>
</template>

<style scoped>
.animate-in {
  animation: fadeSlideUp 1s ease-out forwards;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>