<script setup>
definePageMeta({ 
  layout: 'admin',
  middleware: 'admin'
})

const { data: globalSeo, refresh } = await useFetch('/api/admin/seo-config')

const settings = ref({
  siteName: 'VANTAGE',
  siteTagline: 'MODERN NARRATIVES',
  description: 'A premium space for modern stories and tech insights.',
  keywords: 'blog, nuxt, d1, cloudflare',
  ogImage: '',
  twitterHandle: '@vantage'
})

const isSaving = ref(false)
const toast = useToast()

const saveGlobalSeo = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/admin/seo-config', { method: 'POST', body: settings.value })
    toast.add({ title: 'System Updated', icon: 'i-heroicons-check-circle', color: 'primary' })
  } catch (e) {
    toast.add({ title: 'Error', description: 'Could not save settings', color: 'red' })
  } finally {
    isSaving.value = false
  }
}

const tabs = [
  { label: 'General Info', icon: 'i-heroicons-cog', slot: 'general' },
  { label: 'Social & Cards', icon: 'i-heroicons-share', slot: 'social' }
]
</script>

<template>
  <div class="space-y-12 pb-24 px-4 sm:px-0">
    <!-- Header -->
    <header class="border-b border-gray-100 dark:border-zinc-800 pb-8">
      <h2 class="text-5xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
        Global <span class="text-blue-500">SEO</span>
      </h2>
      <p class="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Website Identity & Search Config</p>
    </header>

    <div class="bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div class="p-8">
        <UTabs :items="tabs" class="w-full">
          
          <!-- General Tab -->
          <template #general>
            <div class="space-y-8 pt-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 text-blue-500">Site Branding Name:</label>
                  <UInput v-model="settings.siteName" size="xl" class="font-bold uppercase italic" color="blue" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Marketing Tagline:</label>
                  <UInput v-model="settings.siteTagline" size="xl" class="font-medium italic" color="blue" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Main Site Description (Meta):</label>
                <UTextarea v-model="settings.description" :rows="4" />
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Global Keywords:</label>
                <UInput v-model="settings.keywords" placeholder="blog, tech, news..." />
              </div>
            </div>
          </template>

          <!-- Social Tab -->
          <template #social>
            <div class="space-y-8 pt-8">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Twitter/X Username:</label>
                <UInput v-model="settings.twitterHandle" icon="i-heroicons-at-symbol" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">OG Image (1200x630):</label>
                <UInput v-model="settings.ogImage" icon="i-heroicons-photo" placeholder="https://..." />
              </div>
              <!-- Preview Card -->
              <div class="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                 <p class="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-4">Social Preview</p>
                 <div class="max-w-sm bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <div class="h-32 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <UIcon name="i-heroicons-photo" class="w-10 h-10 text-zinc-400" />
                    </div>
                    <div class="p-4">
                      <div class="font-bold text-sm">{{ settings.siteName }}</div>
                      <div class="text-xs text-zinc-500 line-clamp-1">{{ settings.description }}</div>
                    </div>
                 </div>
              </div>
            </div>
          </template>

        </UTabs>

        <div class="mt-12 flex justify-end border-t border-zinc-100 dark:border-zinc-900 pt-8">
          <UButton 
            color="blue" 
            size="xl" 
            class="px-12 font-black uppercase italic tracking-widest shadow-2xl shadow-blue-500/40" 
            :loading="isSaving"
            @click="saveGlobalSeo"
          >
            Update Global Config
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>